const { User, Job } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("createdJobs").populate("acceptedJobs");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("createdJobs").populate("acceptedJobs");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("createdJobs").populate("acceptedJobs");
      }
      throw AuthenticationError;
    },
    jobs: async () => {
      return Job.find();
    },
    job: async (parent, { jobId }) => {
      return Job.findOne(
        {
          _id: jobId
        }
      );
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    addJob: async (parent, args, context) => {
      const newJob = await Job.create({ ...args, creatorId: context.user._id });
      await User.findOneAndUpdate(
        {
          _id: context.user._id
        },
        {
          $addToSet: {
            createdJobs:
              newJob._id,
          }
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return newJob;
    },

    joinJob: async (parent, { jobId }, context) => {
      const findJob = await Job.findOneAndUpdate({
        _id: jobId,
      },
        {
          $set: {
            contractorId: context.user._id
          },
        },
        {
          new: true,
        }
      );
      await User.findOneAndUpdate(
        {
          _id: context.user._id
        },
        {
          $addToSet: {
            acceptedJobs:
              findJob._id,
          }
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return findJob;
    },

    removeJob: async (parent, { jobId }, context) => {
      const currentJob = await Job.findOne(
        {
          _id: jobId,
        }
      );
      if (currentJob.creatorId == context.user._id) {
        await Job.deleteOne({ _id: jobId });
        return User.findOneAndUpdate(
          {
            _id: context.user._id
          },
          {
            $pull: {
              createdJobs: jobId
            },
          },
          {
            new: true
          }
        );
      }
      throw AuthenticationError;
    },

    addReview: async (parent, { userId, review, reviewText }) => {
      return User.findOneAndUpdate(
        {
          _id: userId
        },
        {
          $addToSet: {
            ratings: {
              review,
              reviewText
            }
          }
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeReview: async (parent, { userId, reviewId }) => {
      return User.findOneAndUpdate(
        {
          _id: userId
        },
        {
          $pull: {
            ratings: {
              _id: reviewId
            }
          }
        },
        {
          new: true
        }
      );
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;