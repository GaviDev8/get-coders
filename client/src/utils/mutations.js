import { gql } from '@apollo/client';

/* ============== USER MUTATIONS ============== */
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      isContractor
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const BECOME_CONTRACTOR = gql`
  mutation becomeContractor($username: String!, $changeContractor: Boolean!) {
    becomeContractor(username: $username, changeContractor: $changeContractor) {
      user {
        _id
        username
        changeContractor
      }
    }
  }
`;

/* ============== REVIEW MUTATIONS ============== */
export const ADD_REVIEW = gql`
  mutation addReview($userId: ID!, $review: Int!, $reviewText: String!) {
    addReview(userID: $userID, review: $review, reviewText: $reviewText) {
      user {
        _id
      }
      ratings {
        review
        reviewText
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($userId: ID!, $reviewId: ID!) {
    removeReview(userID: $userID, reviewId: $reviewId) {
      user {
        _id
      }
      ratings {
        _id
      }
    }
  }
`;

/* ============== JOB MUTATIONS ============== */
export const ADD_JOB = gql`
  mutation addJob($username: String!, $jobData: JobInput) {
    addJob(username: $username, jobData: $jobData) {
      user {
        username
      }
      jobs {
        jobData
      }
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation removeJob($userId: ID!, $jobId: ID!) {
    removeJob(userId: $userId, jobId: $jobId) {
      user {
        _id
      }
      jobs {
        _id
      }
    }
  }
`;