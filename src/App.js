import "./styles.css";
import { getQuestions } from "./api";
import { useEffect, useState } from "react";
import { Quiz } from "./components/quiz";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Owl from "./owl.jpeg";

export default function App() {
  const [category, setCategory] = useState("English");
  const [state, setState] = useState({ timeAllowed: 30000, questions: [] });
  async function init() {
    const { questions } = await getQuestions(category);
    setState((state) => ({ ...state, questions }));
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <Container className="d-flex m-4 align-items-center justify-content-center">
        <img src={Owl} width={60} height={50} />
        <h3>Game Of Quest</h3>
      </Container>
      <Container className="d-flex">
        <Quiz questions={state.questions} timeAllowed={60 * 1000} />
      </Container>
      
    </div>
  );
}
