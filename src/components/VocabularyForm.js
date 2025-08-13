import { useState } from 'react';

export default function VocabularyForm({ onAddToVocabularyList }) {
  const [userInput, setUserInput] = useState({ frontText: '', backText: '' });
  console.log(userInput);

  function handleUserInput(event) {
    setUserInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    onAddToVocabularyList((prevList) => [...prevList, userInput]);
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
      ></input>
      <label htmlFor="back-text">Back</label>
      <input
        type="text"
        id="back-text"
        name="backText"
        onChange={handleUserInput}
        value={userInput.backText}
      ></input>
      <button>save</button>
    </form>
  );
}
