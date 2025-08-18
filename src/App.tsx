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

  useEffect(() => {
    updateLocalStorage('vocabularyTrainerList', vocabularyList);
  }, [vocabularyList]);

  console.log(vocabularyList);

  function addToVocabularyList(newItem: VocabularyItem) {
    setVocabularyList((prevList) => [...prevList, newItem]);
  }

  function updateVocabularyList(updatedList: VocabularyItem[]) {
    setVocabularyList(updatedList);
  }

  return (
    <div className="App">
      <header>
        <h1>Vocabulary Trainer</h1>
      </header>
      <main>
        <VocabularyForm onAddToVocabularyList={addToVocabularyList} />
        <VocabularyList vocabularyList={vocabularyList} />
        <VocabularyTraining
          vocabularyList={vocabularyList}
          onUpdateVocabularyList={updateVocabularyList}
        />
      </main>
    </div>
  );
}

export default App;
