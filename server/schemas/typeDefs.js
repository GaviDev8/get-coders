const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isContractor: Boolean
    ratings: [Rating]!
    reviewsCount: Int
    jobs: [Job]
    jobsCount: Int
  }

  type Job {
    _id: ID
    title: String
    description: String
    payment: Int
    dateLimit: String
    createdAt: String
  }
  
  input JobInput {
    title: String
    description: String
    payment: Int
    dateLimit: String
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    becomeContractor(username: String!, changeContractor: Boolean!): User
    addReview(userId: ID!, review: Int!, reviewText: String!): User
    removeReview(userId: ID!, reviewId: ID!): User
    addJob(username: String!, jobData: JobInput): User
    removeJob(userId: ID!, jobId: ID!): User
  }
`;

module.exports = typeDefs;