const mysql = require("mysql2/promise");
const Trainer = require("../models/trainer");


const configDetails = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "private_school"
};


async function getAllTrainers() {
	try {
		const conn = await mysql.createConnection(configDetails)
		const [rows, fields] = await conn.query("SELECT * FROM trainers");
        rows.forEach(function(row) {
            let trainer = `ID: ${row.trainer_id}  First_Name: ${row.first_name}  Last_Name: ${row.last_name}  Subject: ${row.subject}`;
            console.log(trainer);
        });
		await conn.end();
	}catch(ex) {
		console.log(`Exception: ${ex.message}`);
		process.exit();
	}
}

// getAllTrainers();



async function create(trainer) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO trainers (first_name, last_name, subject) VALUES (?,?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                trainer.first_name,
                trainer.last_name,
                trainer.subject
            ]);
            
            console.log(`\n${result.affectedRows} trainer(s) created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// create(new Trainer("Elon", "Musk", "JavaScript"));



module.exports.getAllTrainers = getAllTrainers;
module.exports.create = create;