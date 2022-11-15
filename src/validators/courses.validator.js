import Joi from 'joi'


export const deleteSection = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export const deleteCourse = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export const postSection = {
    body: Joi.object().keys({
        index: Joi.number().required(),
        description: Joi.string().optional().allow(""),
        title: Joi.string().required()
    })
}

export const putSection = {
    params: Joi.object().keys({
        sectionId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().optional().allow(""),
        index: Joi.number().required(),
    })
}

export const putCourse = {
    params: Joi.object().keys({
        courseId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        sectionId: Joi.string().required(),
    })
}

export const postCourse = {
    params: Joi.object().keys({
        sectionId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required()
    })
}
