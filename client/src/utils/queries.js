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
query User($userId: ID!) {
  user(userId: $userId) {
    _id
    username
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
    acceptedJobs {
      description
      title
      payment
    }
    createdJobs {
      title
      description
      payment
    }
    username
    ratings {
      review
    }
    _id
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
query job($jobId: ID!) {
  job(jobId: $jobId) {
    title
    currentBid
    dateLimit
    createdAt
    creatorId {
      _id
      username
    }
    currentBider
    description
    payment
    availability
    contractorId {
      _id
      username
    }
    _id
  }
}`;
