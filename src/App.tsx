import { useState, useEffect } from 'react';

import './App.css';

import VocabularyForm from './components/VocabularyForm';
import VocabularyList from './components/VocabularyList';
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
  const [selectedStaple, setSelectedStaple] = useState(0);

  useEffect(() => {
    updateLocalStorage('vocabularyTrainerList', vocabularyList);
  }, [vocabularyList]);

  function addToVocabularyList(newItem: VocabularyItem) {
    setVocabularyList((prevList) => [...prevList, newItem]);
  }

  function updateVocabularyList(updatedList: VocabularyItem[]) {
    setVocabularyList(updatedList);
  }

  function handleClickStaple(selectedStaple: number) {
    setSelectedStaple(selectedStaple);
  }

  function resetStaple() {
    setSelectedStaple(0);
  }

  return (
    <div className="App">
      <header>
        <h1>Vocabulary Trainer</h1>
      </header>
      <main>
        <VocabularyForm onAddToVocabularyList={addToVocabularyList} />
        {selectedStaple}
        {selectedStaple !== 0 && (
          <VocabularyTraining
            selectedStaple={selectedStaple}
            vocabularyList={vocabularyList}
            onUpdateVocabularyList={updateVocabularyList}
            onResetStaple={resetStaple}
          />
        )}
        <VocabularyList
          vocabularyList={vocabularyList}
          onHandleClickStaple={handleClickStaple}
        />
      </main>
    </div>
  );
}

export default App;
