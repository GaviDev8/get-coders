const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const jobSchema = new Schema(
    {
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        contractorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
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
        availability: {
            type: Boolean,
            default: true,
        },
        currentBider: {
            type: String,
        },
        currentBid: {
            type: Number,
            default: 0
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

const Job = model("Job", jobSchema)

module.exports = Job;