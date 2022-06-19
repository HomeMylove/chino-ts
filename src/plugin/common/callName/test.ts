import rememberName from "./rememberName";
import getRandomEle from "../../../utils/global/getRandomEle";

const req = {
    groupId:1234567,
    userId:987654321,
    rawMsg:'以后叫我欧尼酱'
}

const res = {
    getRandomEle
}

rememberName(req,res)