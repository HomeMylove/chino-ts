import db from "./createDB";


db.query("select * from robot_name",[],(err,result)=>{
    if(err)return console.log(err)
    console.log(result)
})
