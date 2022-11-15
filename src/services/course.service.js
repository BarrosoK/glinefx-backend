import httpStatus from 'http-status'
import ApiError from '../utils/ApiError.js'
import Section from '../models/section.model.js'
import Course from '../models/course.model.js'
import Token from '../models/token.model.js'
import { tokenTypes } from '../config/tokens.js'

const sections = [
    { id: 0, title: 'title' },
    { id: 1, title: 'title' },
    { id: 2, title: 'title' },
    { id: 3, title: 'title' },
]

const courses = [
    { id: 0, section: 0, title: 'title', content: 'content' },
    { id: 1, title: 'title', content: 'content' },
    { id: 2, title: 'title', content: 'content' },
    { id: 3, title: 'title', content: 'content' },
]

export const getSectionList = async (includesCourses = false, fieldsToSelect = ['title']) => {
    const query = Section
        .find({})
    if (includesCourses) {
        query.populate({
            path: 'courses',
            select: fieldsToSelect,
        })
    }
    return query
}

export const getCourseList = () => {
    return courses.map(c => ({ id: c.id, title: c.title }))
}

export const getCourseById = (id) => {
    const course = Course.findOne({ _id: id })
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'course not found')
    }
    return course
}

export const getSectionById = (id) => {
    const section = Section.findOne({ _id: id })
    if (!section) {
        throw new ApiError(httpStatus.NOT_FOUND, 'section not found')
    }
    return section
}

export const editCourseById = async (id, edit) => {
    return Course.updateOne({ _id: id }, { $set: edit })
}

export const editSectionById = async (id, edit) => {
    return Section.updateOne({ _id: id }, { $set: edit })
}

export const createSection = async (section) => {
    try {
        return await Section.create(section)
    } catch (e) {
        switch (e.code) {
            case 11000:
                throw new ApiError(httpStatus.BAD_REQUEST, 'Index already used')
            default:
                throw new ApiError(httpStatus.BAD_REQUEST, 'Unknown error')
        }
    }
}

export const createCourse = async (course) => {
    return await Course.create(course)
}

export const deleteCourse = async (id) => {
    const course = await Course.findOne({ _id: id })
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await course.remove()
}

export const deleteSection = async (id) => {
    const section = await Section.findOne({ _id: id })
    if (!section) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await section.remove()
}

export const getCoursesFromSectionId = async (id) => {
    const courses = await Course.find({ sectionId: id })
    if (!courses) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    return courses
}
