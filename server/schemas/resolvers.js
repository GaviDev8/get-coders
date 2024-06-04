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
    },  

    Mutation: {
    addUser: async (parent, {args}) => {
      if(!args.email){
        const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
      }
      return false;
    },

    addJob: async (parent, { username, jobData }) => {
      return User.findOneAndUpdate(
        {
          username: username
        },
        {
          $push: {
            jobs: jobData
          }
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeJob: async (parent, { userId, jobId }) => {
      return User.findOneAndUpdate(
        {
          _id: userId 
        },   
        {
          $pull: {
          jobs: {
            _id: jobId
          }
        },
        },
        {
          new: true
        }
      );
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

    becomeContractor: async ( parent, { username , changeContractor} ) => {
      const user = await User.findOneAndUpdate(
        { 
          username: username
        },
        {
         $set: { 
          isContractor: changeContractor 
        } 
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