import * as service from '../services/course.service.js'
import {catchAsync} from "../utils/catchAsync.js"
import httpStatus from "http-status"
import ApiError from '../utils/ApiError.js'

export const getSectionList = catchAsync(async (req, res) => {
    const includesCourses = req.query.includesCourses
    const sections = await service.getSectionList(includesCourses === "true")
    res.send(sections)
})

export const getCourseList = (req, res) => {
    const courseList = service.getCourseList()
    res.send(courseList)
}

export const getCourseById = catchAsync(async (req, res) => {
    const course = await service.getCourseById(req.params.id)
    res.send(course)
})

export const getSectionById = catchAsync(async (req, res) => {
    const section = await service.getSectionById(req.params.id)
    res.send(section)
})

export const createSection = catchAsync(async (req, res) => {
    const { index, title, description } = req.body
    await service.createSection({ index, title, description })
    res.status(httpStatus.NO_CONTENT).send()
})

export const createCourse = catchAsync(async (req, res) => {
    const sectionId = req.params.sectionId
    const { title, content } = req.body
    await service.createCourse({ title, content, sectionId})
    res.status(httpStatus.NO_CONTENT).send()
})

export const editCourse = catchAsync(async (req, res) => {
    const courseId = req.params.courseId
    const { title, content, sectionId } = req.body
    await service.editCourseById(courseId, { title, content, sectionId })
    res.status(httpStatus.NO_CONTENT).send()
})

export const editSection = catchAsync(async (req, res) => {
    const sectionId = req.params.sectionId
    const { title, index, description } = req.body
    await service.editSectionById(sectionId, { title, index, description })
    res.status(httpStatus.NO_CONTENT).send()
})

export const deleteCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id
    await service.deleteCourse(courseId)
    res.status(httpStatus.NO_CONTENT).send()
})


export const deleteSection = catchAsync(async (req, res) => {
    const sectionId = req.params.id
    const courses = await service.getCoursesFromSectionId(sectionId)
    if (courses.length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "You can't delete a section with courses within")
    }
    const section = await service.deleteSection(sectionId)
    res.status(httpStatus.NO_CONTENT).send()
})

