import { gql } from 'apollo-server';

export default gql`
  enum QuestionDifficulty {
    EASY
    MEDIUM
    HARD
    ANY
  }

  enum QuestionType {
    MULTIPLE
    BOOLEAN
    ANY
  }

  enum QuestionCategory {
    MOVIE
    TV
  }

  type Question {
    incorrect_answers: [String!]!
    category: String!
    type: String!
    difficulty: String!
    question: String!
    correct_answer: String!
  }

  input QuizInput {
    difficulty: QuestionDifficulty!
    type: QuestionType!
    category: QuestionCategory!
    number_questions: Int!
  }
`;
