import mysql from 'mysql'
import config from "../config";

const db = mysql.createConnection(config.database);
export default db






