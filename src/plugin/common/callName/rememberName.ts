import config from "../../../config";
import reply from "./reply";
import Dbc from "../../../utils/util/Dbc";
import dateFormat from "../../../utils/tools/dateFormat";

/**
 * @function Remember a name
 * @param req
 * @param res
 * @returns
 */
export default async (req, res) => {
    const {rawMsg, groupId, userId} = req
    let name = rawMsg.replace(`以后叫我`, '').trim()
    if (name.length >= 20) {
        return res.groupMsg({
            groupId,
            msg: res.getRandomEle(reply['longName'])
        })
    }


    const BANNED_WORD = ['爸', '爹', '爷', '祖宗']
    if (name === '主人' && userId != config.SUPERUSER) {
        return res.groupMsg({
            groupId,
            msg: `抱歉,${config.robotName}只有一个主人,你再这么说我可要生气了`,
            imgUrl: 'chino/okoru.jpg'
        })
    } else if (BANNED_WORD.find(item => rawMsg.indexOf(item) !== -1)) {
        return res.groupMsg({
            groupId,
            msg: `请不要欺负${config.robotName},不然${config.robotName}会把你加入黑名单哦`,
            imgUrl: 'chino/okoru.jpg'
        })
    }

    // normally
    const user = {
        user_id: userId,
        group_id: groupId,
    }

    try {
        const dbc = new Dbc();
        const results = await dbc.selectObject("select name from robot_name", user)
        console.log(results,'11111')
        let sqlStr
        let result
        if (results.length > 0) {
            sqlStr = "update robot_name set name=? where group_id=? and user_id=?"
            result = await dbc.update(sqlStr, name, groupId, userId);
        } else {
            sqlStr = "insert into robot_name set ?"
            result = await dbc.updateObject(sqlStr, {
                ...user, name
            })
        }
        console.log(result,22222222222)
        if (result) {
            if (name === '主人') {
                return res.groupMsg({
                    groupId,
                    msg: '好的主人,我...我记住了啦'
                })
            }
            if (name.length <= 3) {
                name = [...name].join('~') + '~'
            }
            const msg = res.getRandomEle(reply['remembered']).replace(/\$name/g, name)
            return res.groupMsg({
                groupId,
                msg
            })
        }
    } catch (e) {
        console.log(dateFormat(), 'remember name', e)
    }
}