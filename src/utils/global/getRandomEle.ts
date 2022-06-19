/**
 * @function Returns a random array element
 * @param arr {Array}
 * @returns
 */
export default <T>(arr: Array<T>): T => {
    let num = arr.length
    num = Math.floor(Math.random() * num)
    return arr[num]
}