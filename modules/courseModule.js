const mysql = require("mysql2/promise");
const Course = require("../models/course");


const configDetails = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "private_school"
};



async function getAllCourses() {
	try {
		const conn = await mysql.createConnection(configDetails)
		const [rows, fields] = await conn.query("SELECT * FROM courses");
        rows.forEach(function(row) {
            let course = `ID: ${row.course_id}  Title: ${row.title}  Stream: ${row.stream}  Type: ${row.type}  Start_Date: ${row.start_date.toLocaleDateString()}  End_Date: ${row.end_date.toLocaleDateString()}`;
            console.log(course);
        });
		await conn.end();
	}catch(ex) {
		console.log(`Exception: ${ex.message}`);
		process.exit();
	}
}

// getAllCourses();


async function create(course) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO courses (title, stream, type, start_date, end_date) VALUES (?,?,?,?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                course.title,
                course.stream,
                course.type,
                course.start_date,
                course.end_date
            ]);
            
            console.log(`\n${result.affectedRows} course(s) created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// create(new Course("CB22JSFT", "JavaScript", "Full-time", "2022-02-18", "2022-05-18"));



module.exports.getAllCourses = getAllCourses;
module.exports.create = create;