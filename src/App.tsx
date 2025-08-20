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

  useEffect(() => {
    updateLocalStorage('vocabularyTrainerList', vocabularyList);
  }, [vocabularyList]);

  function addToVocabularyList(newItem: VocabularyItem) {
    setVocabularyList((prevList) => [...prevList, newItem]);
  }

  function updateVocabularyList(trainingResults: VocabularyItem[]) {
    const updatedVocabularyList = vocabularyList.map((item) => {
      const updatedItem = trainingResults.find((i) => i.id === item.id);
      return updatedItem ? updatedItem : item;
    });
    setVocabularyList(updatedVocabularyList);
  }

  function selectStaple(selectedStaple: number) {
    setSelectedStapleForReview(selectedStaple);
  }

  return (
    <div className="App">
      <header>
        <h1>Vocabulary Trainer</h1>
      </header>
      <main>
        <VocabularyForm onAddToVocabularyList={addToVocabularyList} />
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
        />
      </main>
    </div>
  );
}

export default App;
