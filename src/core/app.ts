import {Express, json as ExpressJson, urlencoded} from "express";
import cors from 'cors'
import {Plugin, PluginOptions} from "./core";
import express = require("express");
import config from '../config'
import LinkedList from "../utils/util/LinkedList";


class Robot {
    private readonly app: Express = express();
    private readonly HELP: Array<{ permitted: Array<string> | undefined, forbidden: Array<string> | undefined, description: Array<Array<string>> }> = [];

    constructor() {
        this.app.use(cors);
        this.app.use(ExpressJson)
        this.app.use(urlencoded({extended: false}))
        this.app.use((req, res, next) => {
            const body = req['body'];

            // Map the keys on body to req and rename them
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
            if (!req['groupId']) return
            if (req['msgType'] || req['noticeType']) next()
        })
    }

    /**
     * The function body should be a valid middleware
     * @method Bind common functions to res
     * @param funName {string} The function name
     * @param fun {Object} The function body
     */
    common(funName: string, fun: Object) {
        this.app.use((req, res, next) => {
            res[funName] = fun;
            next();
        })
    }


    /**
     * @method Installing a plug-in
     * @param {Plugin} methodName The plug-in name
     * @param {{permitted: Array<string>, forbidden: Array<string>, time: Number}|{}} options Options
     * @param {Array<string>} options.permitted  Groups that are permitted to pass
     * @param {Array<string>} options.forbidden  Groups that are forbidden to pass
     * @param {Number} options.time Number of replies in one minute
     */
    method(methodName: Plugin, options?: PluginOptions) {
        if (!options) options = {}
        const {permitted, forbidden} = options
        this.app.use(middle(options))

        function middle(options: PluginOptions) {
            const banPlugin: LinkedList<string> = new LinkedList<string>()
            const {permitted, forbidden} = options
            return (req, res, next) => {
                const {groupId, userId, rawMsg} = req
                if (userId.toString() === config.SUPERUSER) {
                    if (rawMsg === "关闭" + methodName.__name) {
                            banPlugin.add(groupId.toString())
                    }
                    if (rawMsg === '开启' + methodName.__name) {
                            banPlugin.del(groupId.toString())
                    }
                }
                if(banPlugin.has(groupId.toString())){
                    return next()
                }
                if (forbidden?.indexOf(groupId.toString()) !== -1)
                    return next()
                else if (permitted?.indexOf(groupId.toString()) === -1)
                    return next()
                else
                    methodName.run(req, res, next)
            };
        }

        // Write help
        if (methodName.__help) {
            const help = {permitted, forbidden, description: methodName.__help}
            this.HELP.push(help)
        }
    }

    // Listen
    listen(post: number, callback) {
        this.app.listen(post, callback)
    }

}

let robot = new Robot();
export default robot;










