import { useState, useEffect } from 'react';

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

function App() {
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>(
    loadFromLocalStorage('vocabularyTrainerList') ?? []
  );
  const [selectedStapleForReview, setSelectedStapleForReview] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [itemToBeEdited, setItemToBeEdited] = useState<VocabularyItem>();

  useEffect(() => {
    updateLocalStorage('vocabularyTrainerList', vocabularyList);
  }, [vocabularyList]);

  function toggleForm(selectedItem?: VocabularyItem) {
    if (selectedItem) {
      setItemToBeEdited(selectedItem);
    }
    setShowForm((prev) => !prev);
  }

  function addToVocabularyList(newItem: VocabularyItem) {
    setVocabularyList((prevList) => [...prevList, newItem]);
  }

  function selectStaple(selectedStaple: number) {
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
    setVocabularyList((prevList) =>
      prevList.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
  }

  function deleteItem(itemToBeDeletedId: string) {
    console.log(itemToBeDeletedId);
    setVocabularyList((prevList) =>
      prevList.filter((item) => item.id !== itemToBeDeletedId)
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Vocabulary Trainer</h1>
        </header>
        <main>
          <button onClick={() => toggleForm()}>Add new item</button>
          {showForm && (
            <VocabularyForm
              onAddToVocabularyList={addToVocabularyList}
              onToggleForm={toggleForm}
              itemToBeEdited={itemToBeEdited}
              onEditVocabularyList={editVocabularyList}
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
            />
          )}

          <VocabularyLists
            vocabularyList={vocabularyList}
            onSelectStaple={selectStaple}
            onToggleForm={toggleForm}
            onDeleteItem={deleteItem}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
