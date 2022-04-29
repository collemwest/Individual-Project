const mysql = require("mysql2/promise");
const _ = require("lodash");
const StudentPerCourse = require("../models/studentPerCourse");
const TrainerPerCourse = require("../models/trainerPerCourse");
const AssignmentPerStudentPerCourse = require("../models/assignmentPerStudentPerCourse");


const configDetails = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "private_school"
};



// All the students per course
async function printAllStudentsPerCourse() {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = `SELECT * FROM students_Per_Course`;  // view from my database

        const [rows,fields] = await conn.query(sql);
        let rowsGroupedByCourseTitle = _.groupBy(rows, 'title');
        
        _.forEach(rowsGroupedByCourseTitle, function(textRow, key) {
            console.log(key);
            for(let item of textRow) {
                console.log(`\t ${item.first_name} ${item.last_name}`);
            }
        })
        await conn.end();
    } catch (ex) {
        console.log(ex.message);
        process.exit();
    }
};

// printAllStudentsPerCourse();



// All the trainers per course
async function printAllTrainersPerCourse() {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = `SELECT * FROM trainers_Per_Course;`;  // view from my database

        const [rows,fields] = await conn.query(sql);
        let rowsGroupedByCourseTitle = _.groupBy(rows, 'title');
        
        _.forEach(rowsGroupedByCourseTitle, function(textRow, key) {
            console.log(key);
            for(let item of textRow) {
                console.log(`\t ${item.first_name} ${item.last_name}`);
            }
        })
        await conn.end();
    } catch (ex) {
        console.log(ex.message);
        process.exit();
    }
};

// printAllTrainersPerCourse();



// All the assignments per course
async function printAllAssignmentsPerCourse() {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = `SELECT * FROM assignments_Per_Course;`;  // view from my database

        const [rows,fields] = await conn.query(sql);
        let rowsGroupedByCourseTitle = _.groupBy(rows, 'stream');
        
        _.forEach(rowsGroupedByCourseTitle, function(textRow, key) {
            console.log(key);
            for(let item of textRow) {
                console.log(`\t${item.type} ${item.title}`);
            }
        })
        await conn.end();
    } catch (ex) {
        console.log(ex.message);
        process.exit();
    }
};

// printAllAssignmentsPerCourse();



// All the assignments per course per student
async function printAllAssignmentsPerStudentPerCourse() {
    try {
		const conn = await mysql.createConnection(configDetails);
		let sql = `SELECT * FROM assignments_Per_Student_Per_Course;`;  // view from my database
        
        const [rows, fields] = await conn.query(sql);
        let rowsGroupByAssignment = _.groupBy(rows, 'title');
        _.forEach(rowsGroupByAssignment, function(textRow, key) {
            console.log(key);
            let rowsGroupedByCourse = _.groupBy(textRow, 'stream');
            _.forEach(rowsGroupedByCourse, function(textrow1, key1,) {
                console.log(`\t${key1}`);
                for(let item of textrow1) {
                    console.log(`\t\t${item.first_name} ${item.last_name}`);
                }

            });
        });
		await conn.end();
	}catch(ex) {
		console.log(ex.message);
		process.exit();
	}
}

// printAllAssignmentsPerStudentPerCourse();



// All the students that belong to more than one courses
async function printAllStudentsWithMoreThanOneCourse() {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = `SELECT * FROM studentsToMoreThanOneCourse`;  // view from my database
        
        const [rows,fields] = await conn.query(sql);
        let rowsGroupedByStudentId = _.groupBy(rows, 'student_id');
        
        _.forEach(rowsGroupedByStudentId, function(textRow, key) {
            console.log(key);
            for(let item of textRow) {
                console.log(`\t ${item.first_name} ${item.last_name} ${item.Number_Of_Courses}`);
            }
        })
        await conn.end();
    } catch (ex) {
        console.log(ex.message);
        process.exit();
    }
};

// printAllStudentsWithMoreThanOneCourse();



// create studentPerCourse
async function createStudentPerCourse(studentPerCourse) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO studentsPerCourse (student_id, course_id) VALUES (?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                studentPerCourse.student_id,
                studentPerCourse.course_id
            ]);
            
            console.log(`\n${result.affectedRows} studentPerCourse created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// createStudentPerCourse(new StudentPerCourse(40, 5));



// create trainerPerCourse
async function createTrainerPerCourse(trainerPerCourse) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO trainersPerCourse (trainer_id, course_id) VALUES (?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                trainerPerCourse.trainer_id,
                trainerPerCourse.course_id
            ]);
            
            console.log(`\n${result.affectedRows} trainerPerCourse created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// createTrainerPerCourse(new TrainerPerCourse(18, 2));



// create assignmentPerStudentPerCourse
async function createAssignmentPerStudentPerCourse(assignmentPerStudentPerCourse) {
    try {
        const conn = await mysql.createConnection(configDetails)
        let sql = 'INSERT INTO assignmentsPerStudentPerCourse (assignment_id, student_id, course_id) VALUES (?,?,?)';
        const[result, fields] = await conn.execute(sql, 
            [
                assignmentPerStudentPerCourse.assignment_id,
                assignmentPerStudentPerCourse.student_id,
                assignmentPerStudentPerCourse.course_id
            ]);
            
            console.log(`\n${result.affectedRows} assignmentPerStudentPerCourse created`);
            
        await conn.end();
    } catch (ex) {
        console.log(`Exception: ${ex.message}`);
        process.exit();
    }
}

// createAssignmentPerStudentPerCourse(new AssignmentPerStudentPerCourse(1, 40, 2));


module.exports.printAllStudentsPerCourse = printAllStudentsPerCourse;
module.exports.printAllTrainersPerCourse = printAllTrainersPerCourse;
module.exports.printAllAssignmentsPerCourse = printAllAssignmentsPerCourse;
module.exports.printAllAssignmentsPerStudentPerCourse = printAllAssignmentsPerStudentPerCourse;
module.exports.printAllStudentsWithMoreThanOneCourse = printAllStudentsWithMoreThanOneCourse;
module.exports.createStudentPerCourse = createStudentPerCourse;
module.exports.createTrainerPerCourse = createTrainerPerCourse;
module.exports.createAssignmentPerStudentPerCourse = createAssignmentPerStudentPerCourse;