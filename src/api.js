export const SINGLE_CHOICE = "single_choice";
export const MULTI_CHOICE = "multi_choice";

const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

export async function getQuestions(category) {
  console.log("api url", REACT_APP_API_URL);
  return fetch(`${REACT_APP_API_URL}?category=${category}`, {
    headers: {
      "X-Api-Key": REACT_APP_API_KEY,
    },
  }).then((res) => res.json());
}
