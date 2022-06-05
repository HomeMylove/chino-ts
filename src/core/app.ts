import {Express, json as ExpressJson, urlencoded} from "express";
import cors from 'cors'
import {Common, Plugin, PluginOptions} from "./core";
import express = require("express");


class Robot {
    private readonly app: Express = express();
    private readonly HELP: object[] = [];

    constructor() {
        this.app.use(cors);
        this.app.use(ExpressJson)
        this.app.use(urlencoded({extended: false}))
        this.app.use((req, res, next) => {
            const body = req['body'];

            req['groupId'] = body['group_id']
            req['rawMsg'] = body['raw_message']
            req['msgId'] = body['message_id']
            req['msgSeq'] = body['message_seq']
            req['msgType'] = body['message_type']
            req['postType'] = body['post_type']
            req['selfId'] = body['self_id']
            req['sender'] = body['sender']
            req['subType'] = body['sub_type']
            req['time'] = body['time']
            req['userId'] = body['user_id']
            req['noticeType'] = body['notice_type']
            req['targetId'] = body['target_id']
            req['senderId'] = body['sender_id']

            req['HELP'] = this.HELP
            res.send('ok')

            if (!req['groupId'])
                return
            if (req['msgType'] || req['noticeType'])
                next()
        })
    }

    /**
     * @method 在 res 上绑定一般函数
     * @param funName {String} 函数名称,在调用时使用
     * @param fun {Function} 函数体
     */
    common(funName: string, fun: Common) {
        this.app.use((req, res, next) => {
            res[funName] = fun;
            next();
        })
    }

    /**
     * @method 绑定插件
     * @param methodName
     * @param options
     */
    method(methodName: Plugin, options?: PluginOptions) {
        if(!options)
            options = {}
        const {permitted,forbidden} = options

        this.app.use(middle(options))

        function middle(options:PluginOptions){
            const {permitted,forbidden} = options

            return (req, res, next) => {
                const {groupId} = req

                if (forbidden?.indexOf(groupId.toString()) !== -1)
                    next()
                else if (permitted?.indexOf(groupId.toString()) === -1)
                    next()
                else
                    methodName.run(req, res, next)
            };
        }

        // 写入帮助
        if(methodName.__help){
            const h = {permitted,forbidden,description:methodName.__help}
            this.HELP.push(h)
        }

    }


    listen(post:number,callback){
        this.app.listen(post,callback)
    }

}

let robot = new Robot();

export default robot;










