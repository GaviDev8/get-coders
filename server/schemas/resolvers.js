const { User, Job } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find();
        },  
        user: async (parent, { username }) => {
          return User.findOne({ username });
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id });
          }
          throw AuthenticationError;
        },
        // jobs: async () => {
        //   return Job.find().sort({ createdAt: -1 });
        // },
    
        // job: async (parent, { jobId }) => {
        //   return Job.findOne({ _id: jobId });
        // },
    },  

    Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // addJob: async (parent, { jobData }, context) => {
    //   return User.findOneAndUpdate(
    //     {
    //       _id: context.userId
    //     },
    //     {
    //       $push: {
    //         jobs: jobData
    //       }
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
    // },

    // removeJob: async (parent, { jobId }, context ) => {
    //   return User.findOneAndUpdate(
    //     {
    //       _id: context.userId
    //     },
    //     {
    //       $pull: {
    //           jobs: jobId 
    //       }
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
    // },

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

    becomeContractor: async ( parent, { userId  } ) => {
      const user = await User.findOneAndUpdate(
        { 
          _id: userId
        },
        {
          $set: { isContractor: true },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return user;
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