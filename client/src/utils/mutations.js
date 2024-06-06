import { gql } from '@apollo/client';

/* ============== USER MUTATIONS ============== */
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
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

// ADD SKILLS, LANGUAGES AND TECHS MUTATIONS

export const ADD_LANGUAGE = gql`
mutation Mutation($language: String!) {
  addLanguage(language: $language) {
  username 
  languages
  }
}`;

export const ADD_SKILL = gql`
mutation Mutation($skill: String!) {
  addSkill(skill: $skill) {
    username
    skills
  }
}`;

export const ADD_TECH = gql`
mutation AddTech($technology: String!) {
  addTech(technology: $technology) {
    username
    techStack
  }
}`;

// REMOVE SKILLS, LANGUAGES AND TECHS MUTATIONS

export const REMOVE_SKILL = gql`
mutation RemoveSkill($skill: String!) {
  removeSkill(skill: $skill) {
    username
    skills
  }
}`;

export const REMOVE_TECH = gql`
mutation RemoveTech($technology: String!) {
  removeTech(technology: $technology) {
    username
    techStack
  }
}`;

export const REMOVE_LANGUAGE = gql`
mutation RemoveLanguage($language: String!) {
  removeLanguage(language: $language) {
    username
    languages
  }
}`;