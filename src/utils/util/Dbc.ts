import db from "../../db/createDB";
import dateFormat from "../tools/dateFormat";


// TypeScript Database Connectivity
interface Connection {
    select(sql: string, ...params: string[]): Promise<Array<object>>;

    selectObject(sql: string, obj: object): Promise<Array<object>>;

    update(sql: string, ...params: string[]): Promise<boolean>;

    updateObject(sql: string, obj: object): Promise<boolean>;
}


export default class Dbc implements Connection {
    select(sql: string, ...params: string[]) {
        return new Promise<Array<object>>((resolve, reject) => {
            db.query(sql, [...params], (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || "no results")
                }
                resolve(results)
            })
        })
    }

    selectObject(sql: string, obj: object): Promise<object[]> {
        return new Promise<object[]>((resolve, reject) => {
            db.query(sql, obj, (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || 'no results')
                }
                resolve(results)
            })
        })
    }

    update(sql: string, ...params: string[]) {
        return new Promise<boolean>((resolve, reject) => {
            db.query(sql, [...params], (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || 'no results')
                }
                if (results.affectedRows > 0) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }

    updateObject(sql: string, obj: object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            db.query(sql, obj, (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || 'no results')
                }
                if (results.affectedRows > 0) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
}