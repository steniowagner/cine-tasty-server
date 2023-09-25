import { parseOpenTriviaAPIResult } from "./parse-open-trivia-api-response";
import { OpenTriviaResult } from "../../types";

describe("DataSources/OpenTriviaAPI/parse-open-trivia-api-response", () => {
  it("should parse the open-trivivia-api-response correctly", () => {
    const responseItem = {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "hard",
      question:
        "In the &quot;Harry Potter&quot; series, what is Headmaster Dumbledore&#039;s full name?",
      correct_answer: "Albus Percival Wulfric Brian Dumbledore",
      incorrect_answers: [
        "Albus Valum Jetta Mobius Dumbledore",
        "Albus James Lunae Otto Dumbledore",
        "Albus Valencium Horatio Kul Dumbledore",
      ],
    };
    const result = parseOpenTriviaAPIResult([responseItem as OpenTriviaResult]);
    expect(result[0].question).toEqual(
      'In the "Harry Potter" series, what is Headmaster Dumbledore\'s full name?',
    );
    expect(result[0].correctAnswer).toEqual(responseItem.correct_answer);
    expect(result[0].difficulty).toEqual(responseItem.difficulty);
    expect(result[0].category).toEqual(responseItem.category);
    expect(result[0].type).toEqual(responseItem.type);
    expect(result[0].options.length).toEqual(responseItem.incorrect_answers.length + 1);
    expect(
      result[0].options.every((option) =>
        [...responseItem.incorrect_answers, responseItem.correct_answer].includes(option),
      ),
    ).toEqual(true);
  });
});
