import {sendPrivateMsg} from "../../api/request";
import dateFormat from "../tools/dateFormat";


interface MsgContent {
    userId: string;
    msg?: string;
    record?: string;
    imgUrl?: string;
}

/**
 * @function Send a message
 * @param {object} msgContent Sent object
 * @param {string} msgContent.userId User Id
 * @param {string} msgContent.msg Message content
 * @param {string} msgContent.record Music path
 * @param {string} msgContent.imgUrl Image path
 */

export default async (msgContent: MsgContent) => {
    let {userId, msg, imgUrl, record} = msgContent

    msg = msg || ''
    if (imgUrl) msg = msg + `[CQ:image,file=${imgUrl}]`
    if (record) msg = `[CQ:record,file=${record}]`
    const rMsg = msg
    msg = encodeURI(msg)
    let result
    try {
        result = await sendPrivateMsg(userId, msg)
        console.log(result.status, userId, rMsg, dateFormat());
    } catch (e) {
        console.log('privateMsg',e,dateFormat())
    }
}