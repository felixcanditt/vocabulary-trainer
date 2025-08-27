import { useState, useEffect, useRef } from 'react';
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
  itemToBeEdited: VocabularyItem | undefined;
  onEditVocabularyList: (item: VocabularyItem) => void;
  openerRef: React.RefObject<HTMLButtonElement | null> | null;
}> = (props) => {
  const [userInput, setUserInput] = useState<UserInput>(
    props.itemToBeEdited ? props.itemToBeEdited : initialUserInput
  );

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    return () => {
      props.openerRef?.current?.focus();
    };
  }, []);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
    setShowErrorMessage(false);
  }

  function handleFormCancelation() {
    setUserInput(initialUserInput);
    props.onToggleForm();
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (
      userInput.frontText.trim().length === 0 ||
      userInput.backText.trim().length === 0
    ) {
      setShowErrorMessage(true);
      return;
    }

    if (props.itemToBeEdited) {
      const editedItem = {
        ...props.itemToBeEdited,
        frontText: userInput.frontText,
        backText: userInput.backText,
      };
      props.onEditVocabularyList(editedItem);
    } else {
      const newItem = { ...userInput, currentStaple: 1, id: uuidv4() };
      props.onAddToVocabularyList(newItem);
    }

    setUserInput(initialUserInput);
    props.onToggleForm();
  }

  return (
    <div className="modal-wrapper">
      <form
        id="vocabulary-form"
        className="modal"
        onSubmit={handleFormSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
      >
        <button
          type="button"
          className="button-close"
          onClick={handleFormCancelation}
          aria-label="Close modal"
        >
          X
        </button>
        <h3 id="form-title">
          {props.itemToBeEdited ? 'Edit item' : 'Add item'}
        </h3>
        <label htmlFor="front-text">Front Text</label>
        <input
          type="text"
          id="front-text"
          name="frontText"
          onChange={handleUserInput}
          value={userInput.frontText}
          ref={firstInputRef}
        />
        <label htmlFor="back-text">Back Text</label>
        <input
          type="text"
          id="back-text"
          name="backText"
          onChange={handleUserInput}
          value={userInput.backText}
        />
        {showErrorMessage && (
          <p className="error-message" aria-live="assertive">
            Please enter front and back text.
          </p>
        )}
        <button className="button-yellow">Save</button>
        {!props.itemToBeEdited && (
          <p>The new item will be saved in Staple 1.</p>
        )}
      </form>
    </div>
  );
};

export default VocabularyForm;
