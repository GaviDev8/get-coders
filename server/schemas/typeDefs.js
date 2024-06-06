const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  ratings: [Rating]
  createdJobs: [Job]
  acceptedJobs: [Job]
  acceptedJobsCount: Int
  createdJobsCount: Int
  reviewsCount: Int
}

  type Job {
    _id: ID
    creatorId: String
    contractorId: String
    title: String
    description: String
    payment: Int
    dateLimit: String
    createdAt: String
  }
  
  type Rating{
    _id: ID
    review: Int
    reviewText: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    jobs: [Job]
    job( jobId: ID! ): Job
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(userId: ID!, review: Int!, reviewText: String!): User
    removeReview(userId: ID!, reviewId: ID!): User
    addJob(title: String!, description: String!, payment: Int!, dateLimit: String!): Job
    joinJob(jobId: ID!): Job
    removeJob(jobId: ID!): User
  }
`;

module.exports = typeDefs;