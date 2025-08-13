import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialUserInput = { frontText: '', backText: '' };

export default function VocabularyForm({ onAddToVocabularyList }) {
  const [userInput, setUserInput] = useState(initialUserInput);

  function handleUserInput(event) {
    setUserInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    onAddToVocabularyList((prevList) => [
      ...prevList,
      { ...userInput, id: uuidv4() },
    ]);
    setUserInput(initialUserInput);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="front-text">Front</label>
      <input
        type="text"
        id="front-text"
        name="frontText"
        onChange={handleUserInput}
        value={userInput.frontText}
      />
      <label htmlFor="back-text">Back</label>
      <input
        type="text"
        id="back-text"
        name="backText"
        onChange={handleUserInput}
        value={userInput.backText}
      />
      <button>save</button>
    </form>
  );
}
