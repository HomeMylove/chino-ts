import axios from "axios";

/**
 * @function Send a private message
 * @param userId {string}
 * @param msg {string}
 * @returns
 */
export const sendPrivateMsg = (userId: string, msg: string) => axios({
    url: `http://127.0.0.1:5700/send_private_msg?user_id=${userId}&message=${msg}&auto_escape=false`,
    method: 'get'
})


/**
 * @function Send a group message
 * @param groupId {string}
 * @param msg {string}
 */
export const sendGroupMsg = (groupId:string, msg:string) => axios({
    url: `http://127.0.0.1:5700/send_group_msg?group_id=${groupId}&message=${msg}&auto_escape=false`,
    method: 'get'
})

/**
 * @function Get member's info
 * @param groupId {string}
 * @param userId {string}
 */
export const getGroupMemberInfo = (groupId:string, userId:string) => axios({
    url: `http://127.0.0.1:5700/get_group_member_info?group_id=${groupId}&user_id=${userId}`,
    method: 'get'
})


/**
 * @function Get random wallpaper api 1
 * @param keyword {string}  keywords ['美女', '汽车', '二次元', '背景', '动漫']
 * @returns
 */
export const getRandomPaper = (keyword:string) => axios({
    url: `https://api.uomg.com/api/rand.img1?sort=${keyword}&format=json`,
    method: 'get'
})

/**
 * @function Get random wallpaper api 2
 * @returns
 */
export const getRandomPaper2 = () => axios({url: 'https://www.dmoe.cc/random.php?return=json', method: 'get'})

/**
 * @function Get a piece of diary
 * @returns
 */
export const getTGDiary = () => axios({url: 'https://api.ixiaowai.cn/tgrj/index.php', method: 'get'})


/**
 * @function Get random reply
 * @param keyWord {string}
 * @returns
 */
export const reqAutoChat = (keyWord:string) => axios({
    url: `http://api.qingyunke.com/api.php?key=free&appid=0&msg=${keyWord}`,
    method: 'get'
})

/**
 * @function Get random reply
 * @param msg {string}
 * @param id {string}
 * @returns
 */
export const reqRuyiAi = (msg:string, id:string) => axios({
    url: 'http://api.ruyi.ai/v1/message',
    method: 'post',
    data: {
        "q": msg,
        "app_key": "79ed362f-1b08-42c3-bb78-15b4195ee8c4",
        "user_id": id
    },
    headers: {
        'Content-Type': 'application/json'
    },
})


/**
 * @function Get image info
 * @param file {string}
 * @returns {size:string,filename:string,url:string}
 */
export const getImage = (file:string) => axios({url: `http://127.0.0.1:5700/get_image?file=${file}`, method: 'get'})

