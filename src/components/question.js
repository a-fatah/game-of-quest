import { useField } from 'formik';
import React from 'react';
import { Container, FormCheck } from "react-bootstrap";

export function Question({ id, question, ...props }) {
  const { question: text, options } = question;
  const [field, meta, { setValue }] = useField(`question_${id}`);

  return (
    <Container className="my-3">
      <strong>
        {id}. {text}
      </strong>
      {options.map((option, index) => (
        <FormCheck
          key={index}
          type="radio"
          name={`question_${id}`}
          id={`${id}_option_${index}`}
          label={option.text}
          onChange={() => setValue(option.text)}
          checked={option.text == meta.value}
        />
      ))}
    </Container>
  );
}