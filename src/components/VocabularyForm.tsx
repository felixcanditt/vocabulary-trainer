import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { VocabularyItem } from '../App';

interface UserInput {
  frontText: string;
  backText: string;
}

const initialUserInput = { frontText: '', backText: '' };

const VocabularyForm: React.FC<{
  onAddToVocabularyList: (item: VocabularyItem) => void;
  onToggleForm: () => void;
}> = (props) => {
  const [userInput, setUserInput] = useState<UserInput>(initialUserInput);

  function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormCancelation() {
    setUserInput(initialUserInput);
    props.onToggleForm();
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newItem = { ...userInput, currentStaple: 1, id: uuidv4() };
    props.onAddToVocabularyList(newItem);
    setUserInput(initialUserInput);
    props.onToggleForm();
  }

  return (
    <div className="modal-wrapper">
      <form className="modal" onSubmit={handleFormSubmit}>
        <button
          type="button"
          className="close-button"
          onClick={handleFormCancelation}
        >
          X
        </button>
        <label htmlFor="front-text">Front Text</label>
        <input
          type="text"
          id="front-text"
          name="frontText"
          onChange={handleUserInput}
          value={userInput.frontText}
        />
        <label htmlFor="back-text">Back Text</label>
        <input
          type="text"
          id="back-text"
          name="backText"
          onChange={handleUserInput}
          value={userInput.backText}
        />
        <button className="modal-button">Save</button>
        <p>The new item will be saved in Staple 1.</p>
      </form>
    </div>
  );
};

export default VocabularyForm;
