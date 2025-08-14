import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { VocabularyItem } from './VocabularyList';

const initialUserInput = { frontText: '', backText: '' };

const VocabularyForm: React.FC<{
  onAddToVocabularyList: (item: VocabularyItem) => void;
}> = (props) => {
  const [userInput, setUserInput] = useState(initialUserInput);

  function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newItem = { ...userInput, id: uuidv4() };
    props.onAddToVocabularyList(newItem);
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
};

export default VocabularyForm;
