import robot from "./core/app";



// Global Functions
import global from "./utils/global";
robot.common('groupMsg',global.groupMsg)
robot.common('privateMsg',global.privateMsg)
robot.common('getNickName',global.getNickName)
robot.common('getRandomEle',global.getRandomEle)
robot.common('getUseName',global.getUserName)





robot.listen(5701,()=>{
    console.log('Server is running at 127.0.0.1')
})