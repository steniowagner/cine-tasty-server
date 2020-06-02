import { gql } from 'apollo-server';

export default gql`
  enum QuestionDifficulty {
    EASY
    MEDIUM
    HARD
    MIXED
  }

  enum QuestionType {
    MULTIPLE
    BOOLEAN
    MIXED
  }

  enum QuestionCategory {
    MOVIE
    TV
    MIXED
  }

  type Question {
    options: [String!]!
    category: String!
    type: String!
    difficulty: String!
    question: String!
    correctAnswer: String!
  }

  input QuizInput {
    difficulty: QuestionDifficulty!
    type: QuestionType!
    category: QuestionCategory!
    numberOfQuestions: Int!
  }
`;
