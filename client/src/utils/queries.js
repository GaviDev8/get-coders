import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($username: String!) {
    user(username: $username) {
      _id
      username
      ratings
    }
  }
`;

export const QUERY_PROFILE = gql`
query Query {
  me {
    _id
    acceptedJobsCount
    createdJobsCount
    email
    languages
    ratings {
      review
      reviewText
    }
    reviewsCount
    skills
    techStack
    username
  }
}`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    email
    username
    acceptedJobs {
      currentBid
      creatorId
      description
      payment
      title
    }
    createdJobs {
      contractorId
      description
      payment
      title
    }
  }
}
`;

export const GET_JOBS = gql`
query Jobs {
  jobs {
    _id
    availability
    contractorId
    createdAt
    creatorId
    currentBid
    currentBider
    dateLimit
    description
    payment
    title
  }
}`;

export const GET_SINGLE_JOB = gql`
query Job($jobId: ID!) {
  job(jobId: $jobId) {
    _id
    availability
    contractorId
    createdAt
    currentBid
    creatorId
    currentBider
    dateLimit
    description
    payment
    title
  }
}`;
