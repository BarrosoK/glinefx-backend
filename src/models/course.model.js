import mongoose from 'mongoose'
import { toJSON } from './plugins/index.js'
import {tokenTypes} from "../config/tokens.js";

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        sectionId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Section',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

courseSchema.plugin(toJSON);

const Course = mongoose.model('Course', courseSchema);

export default Course
