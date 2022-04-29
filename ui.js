const Course = require("./models/course");
const Student = require("./models/student");
const Trainer = require("./models/trainer");
const Assignment = require("./models/assignment");
const StudentPerCourse = require("./models/studentPerCourse");
const TrainerPerCourse = require("./models/trainerPerCourse");
const AssignmentPerStudentPerCourse = require("./models/assignmentPerStudentPerCourse");
const prompt = require('prompt-sync') ();



module.exports.getCourseFromUser = function() {
    const title = prompt("Enter title: ");
    const stream = prompt("Enter stream: ");
    const type = prompt("Enter type: ");
    const start_date = prompt("Enter start_date: ");
    const end_date = prompt("Enter end_date: ");

    return new Course(title, stream, type, start_date, end_date);
};


module.exports.getStudentFromUser = function() {
    const first_name = prompt("Enter first name: ");
    const last_name = prompt("Enter last name: ");
    const dateOfBirth = prompt("Enter date of birth: ");
    const tuition_fees = prompt("Enter tuition fees: ");

    return new Student(first_name, last_name, dateOfBirth, tuition_fees);
};


module.exports.getTrainerFromUser = function() {
    const first_name = prompt("Enter first name: ");
    const last_name = prompt("Enter last name: ");
    const subject = prompt("Enter subject: ");

    return new Trainer(first_name, last_name, subject);
};


module.exports.getAssignmentFromUser = function() {
    const title = prompt("Enter title: ");
    const description = prompt("Enter description: ");
    const subDateTime = prompt("Enter submission date time: ");
    const oral_mark = prompt("Enter oral mark: ");
    const total_mark = prompt("Enter total mark: ");

    return new Assignment(title, description, subDateTime, oral_mark, total_mark);
};


module.exports.getStudentsPerCourseFromUser = function() {
    const student_id = prompt("Enter student ID: ");
    const course_id = prompt("Enter course ID: ");

    return new StudentPerCourse(student_id, course_id);
};


module.exports.getTrainersPerCourseFromUser = function() {
    const trainer_id = prompt("Enter trainer ID: ");
    const course_id = prompt("Enter course ID: ");

    return new TrainerPerCourse(trainer_id, course_id);
};


module.exports.getAssignmentsPerStudentPerCourseFromUser = function() {
    const assignment_id = prompt("Enter assignment ID: ");
    const student_id = prompt("Enter student ID: ");
    const course_id = prompt("Enter course ID: ");

    return new AssignmentPerStudentPerCourse(assignment_id, student_id, course_id);
};