import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";

import { Field, Form, Formik } from "formik";
import { Container, Button } from "react-bootstrap";
import { Question } from './question';

function Quiz({ title, questions }, ref) {

  const formRef = useRef();

  const onSubmit = (questions) => {

    const formik = formRef.current;
    const answers = formik.values;

    try {
      const correctOption = (option) => option.isCorrect;
      const correctOptions = Object.fromEntries(
        questions.map(({ options }, index) => [
          `question_${index + 1}`, // correctOptions is an object which holds question's text as key
          options.find(correctOption), // and correct option as value
        ])
      );

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

      formik.resetForm({});
      formik.setStatus({ success: true });
    }
    catch (error) {
      formik.setStatus({ success: false });
      formik.setSubmitting(false);
      formik.setErrors({ submit: error.message });
    }
  };

  useImperativeHandle(ref, () => ({
    submitOnTimeHandler(questions) {
      onSubmit(questions);
    },
    resetForm() {
      formRef.current.resetForm();
    }
  }), []);

  return (
    <Container className="m-2">
      <h3 className="fs-3 d-flex justify-content-center">{title} Quiz</h3>
      <Formik
        initialValues={{}}
        onSubmit={() => onSubmit(questions)}
        innerRef={formRef}
      >
        <Form>
          <Container className="border p-3 shadow rounded">
            {questions.map((q, index) => (
              <Field
                key={index + 1}
                id={index + 1}
                name={index + 1}
                question={q}
                component={Question}
              />
            ))}
          </Container>
          <Container className="my-3 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Container>
        </Form>
      </Formik>
    </Container>
  );
};

export default forwardRef(Quiz);