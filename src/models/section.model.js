import mongoose from 'mongoose'
import { toJSON } from './plugins/index.js'
import {tokenTypes} from "../config/tokens.js";

const sectionSchema = mongoose.Schema(
    {
        index: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
          type: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

sectionSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'sectionId',
    justOne: false
});

sectionSchema.plugin(toJSON);

const Section = mongoose.model('Section', sectionSchema);

export default Section
