import { useState } from 'react';

import './App.css';

import VocabularyForm from './components/VocabularyForm';

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
      </main>
    </div>
  );
}

export default App;
