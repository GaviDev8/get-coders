const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  ratings: [Rating]
  createdJobs: [Job]
  acceptedJobs: [Job]
  acceptedJobsCount: Int
  createdJobsCount: Int
  reviewsCount: Int
  languages: [String]
  techStack: [String]
  skills: [String]
}

  type Job {
    _id: ID
    creatorId: User
    contractorId: User
    title: String
    description: String
    payment: Int
    availability: Boolean
    currentBider: String
    currentBid: Int
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
    user(userId: ID!): User
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
    addLanguage(language: String!): User
    addSkill(skill: String!): User
    addTech(technology: String!): User
    closeJob(jobId: ID!): Job
    doBid(jobId: ID!, bidValue: Int!): Job
    removeLanguage(language: String!): User
    removeSkill(skill: String!): User
    removeTech(technology: String!): User
    finishJob(jobId: ID!): Job
  }
`;

module.exports = typeDefs;