const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isContractor: Boolean
    ratings: [Rating]!
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
    becomeContractor(username: String!, isContactor: Boolean): User
    addReview(userId: ID!, review: Int!, reviewText: String!): User
    removeReview(userId: ID!, reviewId: ID!): User
  }
`;

module.exports = typeDefs;