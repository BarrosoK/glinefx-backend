import express from 'express'
import * as controller from '../controllers/course.controller.js'
import * as validator from '../validators/courses.validator.js'
import validate from "../middlewares/validate.js";
import auth from "../middlewares/auth.js";

const router = express.Router()

router.get('/sections', controller.getCourseList)
router.get('/:section', controller.getCourseList)
router.get('/:section/:id', controller.getCourseById)

router.post('/:id', auth(), validate(validator.postComment), controller.commentCourse)
router.post('/:id', auth(), validate(validator.postComment), controller.commentCourse)

// router.post('/', auth('manageCourses'), validate(validator.postComment), controller.commentCourse)

export default router
