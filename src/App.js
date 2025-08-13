import { useState } from 'react';

import './App.css';

import VocabularyForm from './components/VocabularyForm';
import VocabularyList from './components/VocabularyList';

function App() {
  const [vocabularyList, addToVocabularyList] = useState([]);

  console.log(vocabularyList);

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
