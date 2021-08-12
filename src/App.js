import React, { useEffect, useState, useRef } from "react";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { getQuestions } from "./api";
import { CATEGORIES } from "./api";
import Owl from "./owl.jpeg";

import { Button, ButtonGroup, Container, Dropdown, DropdownButton } from "react-bootstrap";
import Timer from "react-compound-timer/build";
import Quiz from "./components/quiz";

export default function App() {
  const [topic, setTopic] = useState("English");
  const [state, setState] = useState({ timeAllowed: 30000, questions: [] });
  const [timeColor, setTimeColor] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const initialTime = 15 * 1000;

  const quizRef = useRef();

  async function fetchQuestions() {
    try {
      const { questions } = await getQuestions(topic);
      setState((state) => ({ ...state, questions }));
    } catch (e) {
      console.log('Could not get questions from API');
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [topic]);

  useEffect(() => {
    if (timeUp) {
      quizRef.current.submitOnTimeHandler(state.questions);
    }
  }, [timeUp]);

  function onChangeTopic(topic) {
    setTopic(topic);
    quizRef.current.resetForm();
    setTimeUp(false);
    //reset timer to initial value
  }

  return (
    <div className="App">
      <Container className="d-flex m-4 align-items-center justify-content-center">
        <img src={Owl} width={70} height={60} />
        <h3 className="display-6">Game Of Quest</h3>
      </Container>
      <Container>
        <Container className="mx-3 d-flex">
          <Container className="d-flex align-items-center justify-content-start">
            <DropdownButton as={ButtonGroup} title={topic} onSelect={onChangeTopic} id="topic-dropdown">
              <Dropdown.Header>Select a topic</Dropdown.Header>
              {
                CATEGORIES.map((topic, index) =>
                  <Dropdown.Item key={index} eventKey={topic}>{topic}</Dropdown.Item>
                )
              }
            </DropdownButton>
          </Container>

          <Container className="d-flex align-items-center justify-content-end">
            <Timer
              className=""
              initialTime={initialTime}
              lastUnit="m"
              direction="backward"
              startImmediately={true}
              onStart={() => { setTimeUp(false); setTimeColor("green") }}
              checkpoints={[
                {
                  time: initialTime - 2000,
                  callback: () => setTimeColor("yellow"),
                },
                {
                  time: initialTime - 3000,
                  callback: () => setTimeColor("red"),
                },
                {
                  time: initialTime - initialTime,
                  callback: () => setTimeUp(true),
                }
              ]}
            >
              {() => (
                <React.Fragment>
                  <span className="fs-3 mx-3" style={{ color: timeColor }}>
                    <Timer.Minutes />:
                    <Timer.Seconds />
                  </span>
                </React.Fragment>
              )}
            </Timer>
          </Container>
        </Container>
        <Quiz title={topic} questions={state.questions} ref={quizRef} />
      </Container>
    </div >
  );
}
