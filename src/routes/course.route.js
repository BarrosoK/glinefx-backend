import express from 'express'
import * as controller from '../controllers/course.controller.js'
import * as validator from '../validators/courses.validator.js'
import validate from "../middlewares/validate.js";
import auth from "../middlewares/auth.js";
import { deleteCourse } from '../validators/courses.validator.js'

const router = express.Router()

router.get('/sections', controller.getSectionList)
router.get('/list/:section', controller.getCourseList)
router.get('/:id', controller.getCourseById)
router.get('/section/:id', controller.getSectionById)

router.post('/section', auth(), validate(validator.postSection), controller.createSection)
router.post('/:sectionId', auth(), validate(validator.postCourse), controller.createCourse)

router.put('/:courseId', auth(), validate(validator.putCourse), controller.editCourse)
router.put('/section/:sectionId', auth(), validate(validator.putSection), controller.editSection)

router.delete('/section/:id', auth(), validate(validator.deleteSection), controller.deleteSection)
router.delete('/:id', auth(), validate(validator.deleteCourse), controller.deleteCourse)

// router.post('/', auth('manageCourses'), validate(validator.postComment), controller.commentCourse)

export default router
