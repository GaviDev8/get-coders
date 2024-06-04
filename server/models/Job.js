const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,
        },
        description: {
            type: String,
            required: true,
        },
        payment: {
            type: Number,
            required: true,
        },
        dateLimit: {
            type: Date,
            get: (dateLimit) => dateFormat(dateLimit),
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    }
)

module.exports = jobSchema;