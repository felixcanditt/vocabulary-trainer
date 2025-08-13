import { useState } from 'react';

export default function VocabularyForm() {
  const [userInput, setUserInput] = useState({ frontText: '', backText: '' });

  function handleUserInput(event) {
    setUserInput((prevInput) => ({
      ...prevInput,
      frontText: event.target.value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(1);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="front-text">Front</label>
      <input
        type="text"
        id="front-text"
        onChange={handleUserInput}
        value={userInput.frontText}
      ></input>
      <label htmlFor="back-text">Back</label>
      <input type="text" id="back-text"></input>
      <button>save</button>
    </form>
  );
}
