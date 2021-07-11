import { Field, Form, Formik } from "formik";
import { Container, Button } from "react-bootstrap";
import { Question } from './question';

export function Quiz({ title, questions }) {
  const onSubmit = (answers) => {
    const correctOption = (option) => option.isCorrect;

    // correctOptions is an object which holds question's text as key
    // and correct option as value
    const correctOptions = Object.fromEntries(
      questions.map(({ options }, index) => [
        `question_${index + 1}`,
        options.find(correctOption),
      ])
    );

    // correctOptions[question] will give us the correct option for 'question'
    const isCorrect = (question, answer) => {
      const { text: correctAnswer } = correctOptions[question];
      return answer === correctAnswer;
    };

    const result = Object.entries(answers).reduce(
      (result, [q, answer]) => ({
        ...result,
        [q]: isCorrect(q, answer),
      }),
      {}
    );

    const correctCount = Object.entries(result).filter(
      ([_, isCorrect]) => isCorrect
    ).length;
    const wrongCount = questions.length - correctCount;
    alert(`Correct: ${correctCount}\nWrong: ${wrongCount}`);
  };

  return (
    <Container className="m-2">
      <h3>{title}</h3>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        <Form>
          {questions.map((q, index) => (
            <Field
              key={index + 1}
              id={index + 1}
              name={index + 1}
              question={q}
              component={Question}
            />
          ))}
          <Container className="m-2 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Container>
        </Form>
      </Formik>
    </Container>
  );
}
