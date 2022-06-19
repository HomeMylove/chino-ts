import config from "../../config";

const nickNames = [config.robotName, ...config.robotNicknames]

/**
 * @function Gets the start name of the statement
 * @param rawMsg {string} Raw message
 * @returns name The best name
 */
export default (rawMsg:string):string => {
    let name = ''
    for (let i = 0; i < nickNames.length; i++) {
        let item = nickNames[i] // Every name in the config
        if (rawMsg.toLowerCase().indexOf(item) == 0 && item.length >= name.length) {
            name = item
        }
    }
    return name
}