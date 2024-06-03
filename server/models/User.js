const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const jobSchema = require("./Job");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  isContractor: {
    type: Boolean,
    default: false,
  },
  ratings: [
    {
      review: {
        type: Number,
        required: true,
        default: 5,
        min: 1,
        max: 5,
      },
      reviewText: {
        type: String,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    }
  ],
  jobs: [jobSchema]
},
{
  toJSON: {
    virtuals: true,
  },
}
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('jobsCount').get(function () {
  return this.jobs.length;
});

userSchema.virtual('reviewsCount').get(function () {
  return this.ratings.length;
});

const User = model('User', userSchema);

module.exports = User;
