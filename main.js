const courseModule = require("./modules/courseModule");
const studentModule = require("./modules/studentModule");
const trainerModule = require("./modules/trainerModule");
const assignmentModule = require("./modules/assignmentModule");
const filterModule = require("./modules/filterModule");
const ui = require("./ui");
const prompt = require('prompt-sync') ();



console.log("1. Print a list of all the students");
console.log("2. Print a list of all the trainers");
console.log("3. Print a list of all the assignments");
console.log("4. Print a list of all the courses");
console.log("5. Print a list of all the students per course");
console.log("6. Print a list of all the trainers per course");
console.log("7. Print a list of all the assignments per course");
console.log("8. Print a list of all the assignments per course per student");
console.log("9. Print a list of all the students that belong to more than one courses");
console.log("10. Create a student");
console.log("11. Create a trainer");
console.log("12. Create an assignment");
console.log("13. Create a course");
console.log("14. Assign a student to a course");
console.log("15. Assign a trainer to a course");
console.log("16. Assign an assignment to a student per course \n");
let choice = parseInt(prompt("Select a number to choose one of the above options: "));



switch(choice){
    case 1:        
        studentModule.getAllStudents();
        break;
    case 2:
        trainerModule.getAllTrainers();
        break;
    case 3:
        assignmentModule.getAllAssignments();
        break;
    case 4:
        courseModule.getAllCourses();
        break;
    case 5:
        filterModule.printAllStudentsPerCourse();
        break;
    case 6:       
        filterModule.printAllTrainersPerCourse();
        break;
    case 7:  
        filterModule.printAllAssignmentsPerCourse();
        break;
    case 8:       
        filterModule.printAllAssignmentsPerStudentPerCourse();
        break;
    case 9: 
        filterModule.printAllStudentsWithMoreThanOneCourse();
        break;
    case 10:       
        const student = ui.getStudentFromUser();
        studentModule.create(student);
        break;
    case 11:       
        const trainer = ui.getTrainerFromUser();
        trainerModule.create(trainer);
        break;
    case 12:       
        const assignment = ui.getAssignmentFromUser();
        assignmentModule.create(assignment);
        break;
    case 13:       
        const course = ui.getCourseFromUser();
        courseModule.create(course);
        break;
    case 14:       
        const studentPerCourse = ui.getStudentsPerCourseFromUser();
        filterModule.createStudentPerCourse(studentPerCourse);
        break;
    case 15:       
        const trainerPerCourse = ui.getTrainersPerCourseFromUser();
        filterModule.createTrainerPerCourse(trainerPerCourse);
        break;
    case 16:       
        const assignmentPerStudentPerCourse = ui.getAssignmentsPerStudentPerCourseFromUser();
        filterModule.createAssignmentPerStudentPerCourse(assignmentPerStudentPerCourse);
        break;
    default:
        throw new Error('Wrong Inputs');
}