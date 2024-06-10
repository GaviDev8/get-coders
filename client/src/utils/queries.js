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

export const QUERY_PROFILE = gql `
{
  me {
    _id
    username
    acceptedJobsCount
    createdJobsCount
    languages
    techStack
    skills
  }
}`;
