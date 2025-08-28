import { useState, useEffect, useRef } from 'react';

import './App.css';

import VocabularyForm from './components/VocabularyForm';
import VocabularyLists from './components/VocabularyLists';
import VocabularyTraining from './components/VocabularyTraining';

import { updateLocalStorage, loadFromLocalStorage } from './lib/localStorage';

export interface VocabularyItem {
  frontText: string;
  backText: string;
  currentStaple: number;
  id: string;
}

export interface EditConfirmation {
  itemId: string;
  wasSuccessful: boolean;
}

function App() {
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>(
    loadFromLocalStorage('vocabularyTrainerList') ?? []
  );
  const [selectedStapleForReview, setSelectedStapleForReview] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [itemToBeEdited, setItemToBeEdited] = useState<VocabularyItem>();
  const [lastOpenerRef, setLastOpenerRef] =
    useState<React.RefObject<HTMLButtonElement | null> | null>(null);
  const [editConfirmation, setEditConfirmation] = useState<EditConfirmation>();

  useEffect(() => {
    updateLocalStorage('vocabularyTrainerList', vocabularyList);
  }, [vocabularyList]);

  const addBtnRef = useRef<HTMLButtonElement>(null);

  function toggleForm(opts?: {
    selectedItem?: VocabularyItem;
    openerRef?: React.RefObject<HTMLButtonElement | null> | null;
  }) {
    if (opts?.selectedItem) {
      setItemToBeEdited(opts.selectedItem);
    } else {
      setItemToBeEdited(undefined);
    }

    if (opts?.openerRef) {
      setLastOpenerRef(opts.openerRef);
    }

    setShowForm((prev) => !prev);
  }

  function addToVocabularyList(newItem: VocabularyItem) {
    setVocabularyList((prevList) => [...prevList, newItem]);
  }

  function selectStaple(
    selectedStaple: number,
    openerRef?: React.RefObject<HTMLButtonElement | null> | null
  ) {
    if (openerRef) {
      setLastOpenerRef(openerRef);
    }

    setSelectedStapleForReview(selectedStaple);
  }

  function updateVocabularyList(trainingResults: VocabularyItem[]) {
    setVocabularyList((prevList) => {
      const updatedIds = trainingResults.map((i) => i.id);
      const untouchedItems = prevList.filter(
        (item) => !updatedIds.includes(item.id)
      );
      const updatedItems = trainingResults.filter((item) =>
        updatedIds.includes(item.id)
      );
      return [...untouchedItems, ...updatedItems];
    });
  }

  function editVocabularyList(editedItem: VocabularyItem) {
    try {
      setVocabularyList((prevList) =>
        prevList.map((item) => (item.id === editedItem.id ? editedItem : item))
      );
      setEditConfirmation({ itemId: editedItem.id, wasSuccessful: true });
    } catch (error) {
      // React state update won't normally throw, but I catch for safety
      console.error(`Editing the item failed: ${(error as Error).message}`);
      setEditConfirmation({ itemId: editedItem.id, wasSuccessful: false });
    }
  }

  function deleteItem(itemToBeDeleted: VocabularyItem) {
    setVocabularyList((prevList) =>
      prevList.filter((item) => item.id !== itemToBeDeleted.id)
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Vocabulary Trainer</h1>
        </header>
        <main>
          <button
            id="add-button"
            ref={addBtnRef}
            onClick={() => toggleForm({ openerRef: addBtnRef })}
            className="button-yellow"
            aria-controls="vocabulary-form"
            aria-expanded={showForm}
          >
            Add new item
          </button>
          {showForm && (
            <VocabularyForm
              onAddToVocabularyList={addToVocabularyList}
              onToggleForm={toggleForm}
              itemToBeEdited={itemToBeEdited}
              onEditVocabularyList={editVocabularyList}
              openerRef={lastOpenerRef}
            />
          )}

          {selectedStapleForReview !== 0 && (
            <VocabularyTraining
              listForTraining={vocabularyList.filter(
                (item) => item.currentStaple === selectedStapleForReview
              )}
              selectedStapleForReview={selectedStapleForReview}
              onUpdateVocabularyList={updateVocabularyList}
              onSelectStaple={selectStaple}
              openerRef={lastOpenerRef}
            />
          )}

          <VocabularyLists
            vocabularyList={vocabularyList}
            onSelectStaple={selectStaple}
            onToggleForm={toggleForm}
            onDeleteItem={deleteItem}
            editConfirmation={editConfirmation}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
