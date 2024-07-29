import { QuestionType } from "../ts/types";
import {API_KEY} from '../config/apiKey';

export const fetchQuestions = async (): Promise<QuestionType[]> => {
  const response = await fetch("https://api.jsonbin.io/v3/b/6696e1eaacd3cb34a8671b81", {
    method: "GET",
    headers: {
      "X-Master-Key": `${API_KEY}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.record.questions; 
};
