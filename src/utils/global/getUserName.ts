import Dbc from "../util/Dbc";
import {getGroupMemberInfo} from "../../api/request";

interface Options {
    groupId: string;
    userId: string;
    flag?: boolean; // Use nickname
}

/**
 * @function Get Group member's name
 * @param options {Options}
 */
export default async (options: Options):Promise<string | undefined> => {
    const {groupId, userId, flag} = options
    const sqlStr = "select name from robot_name where user_id=? and group_id=?"
    try {
        let dbc = new Dbc();
        const result = await dbc.select(sqlStr,userId,groupId)
        if (result[0]?.['name'].trim() != '') {
            return result[0]['name']
        } else {
            if (flag) {
                try {
                    const response = await getGroupMemberInfo(groupId, userId)
                    if (response.status == 200) {
                        const data = response['data']['data']
                        return data['card'] || data['nickname']
                    } else {
                        return undefined
                    }
                } catch (error) {
                    console.log('getUserName', error);
                    return undefined
                }
            } else {
                return undefined
            }
        }
    } catch (error) {
        console.log('getUserName', error);
    }
}