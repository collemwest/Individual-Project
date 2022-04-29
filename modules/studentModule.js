const mysql = require("mysql2/promise");
const Student = require("../models/student");


const configDetails = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "private_school"
};


async function getAllStudents() {
	try {
		const conn = await mysql.createConnection(configDetails)
		const [rows, fields] = await conn.query("SELECT * FROM students");
        rows.forEach(function(row) {
            let student = `ID: ${row.student_id}  First_Name: ${row.first_name}  Last_Name: ${row.last_name}  Date_Of_Birth: ${row.dateOfBirth.toLocaleDateString()}  Tuition_Fees: ${row.tuition_fees}`;
            console.log(student);
        });
		await conn.end();
	}catch(ex) {
		console.log(`Exception: ${ex.message}`);
		process.exit();
	}
}

// getAllStudents();



async function create(student) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO students (first_name, last_name, dateOfBirth, tuition_fees) VALUES (?,?,?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                student.first_name,
                student.last_name,
                student.dateOfBirth,
                student.tuition_fees
            ]);
            
            console.log(`\n${result.affectedRows} student(s) created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// create(new Student("Fotis", "Dimopoulos", "1982-11-19", 2500));



module.exports.getAllStudents = getAllStudents;
module.exports.create = create;