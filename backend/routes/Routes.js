const express=require('express')
const router=express.Router();

const {addCourse,deleteCourse,updateCourse,buyCourse,getAllCourses}=require('../controllers/Course');
const {signUp,logIn,logOut}=require('../controllers/Authentication');
const {showAllStudents,showAllTeachers,deleteUser}=require('../controllers/User')
const { authMiddleware, isAdmin, isStudent, isTeacher } = require('../middleware/Auth')
const {updateMarks,addMarks}=require('../controllers/Marks')

router.post('/signup',signUp);

router.post('/login',logIn);

router.post('/logout',logOut)




router.get('/showallstudents',[authMiddleware,isAdmin],showAllStudents);

router.get('/showallteachers',[authMiddleware,isAdmin],showAllTeachers);

router.delete('/deleteuser/:id',[authMiddleware,isAdmin],deleteUser);


// ----------course
router.post('/addcourse',[authMiddleware,isTeacher],addCourse)
router.delete('/deletecourse/:id',[authMiddleware,isTeacher],deleteCourse)
router.post('/updatecourse/:id',[authMiddleware,isTeacher],updateCourse)
router.post('/buycourse',[authMiddleware,isStudent],buyCourse);
router.get('/showallcourses',getAllCourses);

// -------------marks

router.post('/addmarks',addMarks)

module.exports=router