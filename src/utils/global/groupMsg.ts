import {sendGroupMsg} from "../../api/request";
import dateFormat from "../tools/dateFormat";

interface MsgContent {
    groupId: string;
    msg?: string;
    record?: string;
    imgUrl?: string;
}

/**
 * @function Send a message
 * @param {object} msgContent Sent object
 * @param {string} msgContent.groupId Group id
 * @param {string} msgContent.msg Message content
 * @param {string} msgContent.record Music path
 * @param {string} msgContent.imgUrl Image path
 */

export default async (msgContent: MsgContent) => {
    let {groupId, msg, imgUrl, record} = msgContent

    msg = msg || ''
    if (imgUrl) msg = msg + `[CQ:image,file=${imgUrl}]`
    if (record) msg = `[CQ:record,file=${record}]`
    const rMsg = msg
    msg = encodeURI(msg)
    let result
    try {
        result = await sendGroupMsg(groupId, msg)
        console.log(result.status, groupId, rMsg, dateFormat());
    } catch (e) {
        console.log('groupMsg',e,dateFormat())
    }
}