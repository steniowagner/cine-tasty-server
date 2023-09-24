export default `#graphql
enum QuizQuestionDifficulty {
    EASY
    MEDIUM
    HARD
    MIXED
  }

  enum QuizQuestionType {
    MULTIPLE
    BOOLEAN
    MIXED
  }

  enum QuizQuestionCategory {
    MOVIE
    TV
    MIXED
  }

  type QuizQuestion {
    options: [String!]!
    category: String!
    type: String!
    difficulty: String!
    question: String!
    correctAnswer: String!
  }

  input QuizInput {
    difficulty: QuizQuestionDifficulty!
    type: QuizQuestionType!
    category: QuizQuestionCategory!
    numberOfQuestions: Int!
  }
`;
