const mysql = require("mysql2/promise");
const Assignment = require("../models/assignment");


const configDetails = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "private_school"
};


async function getAllAssignments() {
	try {
		const conn = await mysql.createConnection(configDetails)
		const [rows, fields] = await conn.query("SELECT * FROM assignments");
        rows.forEach(function(row) {
            let assignment = `ID: ${row.assignment_id}  Title: ${row.title}  Description: ${row.description}  Submission_Date_Time: ${row.subDateTime.toLocaleDateString()}  Oral_Mark: ${row.oral_mark}  Total_Mark: ${row.total_mark}`;
            console.log(assignment);
        });
		await conn.end();
	}catch(ex) {
		console.log(`Exception: ${ex.message}`);
		process.exit();
	}
}

// getAllAssignments();



async function create(assignment) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO assignments (title, description, subDateTime, oral_mark, total_mark) VALUES (?,?,?,?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                assignment.title,
                assignment.description,
                assignment.subDateTime,
                assignment.oral_mark,
                assignment.total_mark
            ]);
            
            console.log(`\n${result.affectedRows} assignment(s) created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// create(new Assignment("Assignment6", "Description of 6th Assignment", "2022-03-30", 30, 60));



module.exports.getAllAssignments = getAllAssignments;
module.exports.create = create;