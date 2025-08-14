import { useState } from 'react';

import './App.css';

import VocabularyForm from './components/VocabularyForm';
import VocabularyList from './components/VocabularyList';

export interface VocabularyItem {
  frontText: string;
  backText: string;
  id: string;
}

function App() {
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>([]);

  function addToVocabularyList(newItem: VocabularyItem) {
    setVocabularyList((prevList) => [...prevList, newItem]);
  }

  return (
    <div className="App">
      <header>
        <h1>Vocabulary Trainer</h1>
      </header>
      <main>
        <VocabularyForm onAddToVocabularyList={addToVocabularyList} />
        <VocabularyList vocabularyList={vocabularyList} />
      </main>
    </div>
  );
}

export default App;
