import "./styles.css";
import { getQuestions } from "./api";
import { useEffect, useState } from "react";
import { Quiz } from "./components/quiz";
import { ButtonGroup, Container, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Owl from "./owl.jpeg";
import { CATEGORIES } from "./api";

export default function App() {
  const [topic, setTopic] = useState("English");
  const [state, setState] = useState({ timeAllowed: 30000, questions: [] });

  async function fetchQuestions() {
    try {
      const { questions } = await getQuestions(topic);
      setState((state) => ({ ...state, questions }));
    } catch(e) {
      console.log('Could not get questions from API');
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [topic]);

  function onChangeTopic(topic) {
    setTopic(topic);
  }
  
  return (
    <div className="App">
      <Container className="d-flex m-4 align-items-center justify-content-center">
        <img src={Owl} width={70} height={60} />
        <h3 className="display-6">Game Of Quest</h3>
      </Container>
      <Container>
        <Container className="mx-2">
          <DropdownButton as={ButtonGroup} title={topic} onSelect={onChangeTopic} id="topic-dropdown">
            <Dropdown.Header>Select a topic</Dropdown.Header>
            {
              CATEGORIES.map((topic, index) => 
                <Dropdown.Item key={index} eventKey={topic}>{topic}</Dropdown.Item> 
              )
            }
          </DropdownButton>
        </Container>
        <Quiz questions={state.questions} />
      </Container>
      
    </div>
  );
}
