import { useState } from 'react';

import './App.css';

import VocabularyForm from './components/VocabularyForm';
import VocabularyList from './components/VocabularyList';

function App() {
  const [vocabularyList, setVocabularyList] = useState([]);

  function addToVocabularyList(newItem) {
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
