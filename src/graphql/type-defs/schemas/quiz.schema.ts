export default `#graphql
  enum QuizQuestionDifficulty {
    "Only Easy questions"
    EASY
    "Only Medium questions"
    MEDIUM
    "Only Hard questions"
    HARD
    "Difficulty mixed (Easy and Medium and Hard questions)"
    MIXED
  }

  enum QuizQuestionType {
    "Only Mutliple-Choice questions"
    MULTIPLE
    "Only Boolean (True/False) questions"
    BOOLEAN
    "Mixed questions (Multiple-Choice and Boolean)"
    MIXED
  }

  enum QuizQuestionCategory {
    "Only questions related to Movies"
    MOVIE
    "Only questions related to TV-shows"
    TV
    "Questions related to both Movies and TV-shows"
    MIXED
  }

  type QuizQuestion {
    "Available options to be select"
    options: [String!]!
    "Question category - TV, Films, Cinema..."
    category: String!
    "Question type (same as QuizQuestionType)"
    type: String!
    "Question difficulty (same as QuizQuestionDifficulty)"
    difficulty: String!
    "Question description"
    question: String!
    "Question correct answer"
    correctAnswer: String!
  }

  input QuizInput {
    "Difficulty selected"
    difficulty: QuizQuestionDifficulty!
    "Type of the questions"
    type: QuizQuestionType!
    "Category of the questions"
    category: QuizQuestionCategory!
    "Number of questions to be returned"
    numberOfQuestions: Int!
  }
`;
