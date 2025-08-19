import { useState } from 'react';

import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{
  selectedStaple: number;
  vocabularyList: VocabularyItem[];
  onUpdateVocabularyList: (list: VocabularyItem[]) => void;
  onSelectStaple: (staple: number) => void;
}> = (props) => {
  const [index, setIndex] = useState(0);
  const [showBackText, setShowBackText] = useState(false);

  const [trainingStaple, setTrainingStaple] = useState(() =>
    props.vocabularyList.filter(
      (item) => item.currentStaple === props.selectedStaple
    )
  );

  function handleFirstButtonClick() {
    setShowBackText(true);
  }

  function handleSecondButtonClick(
    clickedItem: VocabularyItem,
    userRememberedItem: boolean
  ) {
    const updatedTrainingStaple = trainingStaple.map((item) => {
      if (
        item.id === clickedItem.id &&
        userRememberedItem &&
        item.currentStaple < 3
      ) {
        return { ...item, currentStaple: item.currentStaple + 1 };
      } else {
        return item;
      }
    });

    if (index === trainingStaple.length - 1) {
      const updatedVocabularyList = props.vocabularyList.map((item) => {
        const updatedItem = updatedTrainingStaple.find((i) => i.id === item.id);
        return updatedItem ? updatedItem : item;
      });
      props.onUpdateVocabularyList(updatedVocabularyList);
      props.onSelectStaple(0);
      return;
    }

    setTrainingStaple(updatedTrainingStaple);
    setIndex((prevIndex) => prevIndex + 1);
    setShowBackText(false);
  }

  return (
    <>
      <h2>training</h2>
      <div style={{ border: '1px solid black' }}>
        <p>{trainingStaple[index].frontText}</p>
        {!showBackText && (
          <button onClick={handleFirstButtonClick}>Show Translation</button>
        )}
        {showBackText && (
          <>
            <p>{trainingStaple[index].backText}</p>
            <button
              onClick={() =>
                handleSecondButtonClick(trainingStaple[index], true)
              }
            >
              I knew
            </button>
            <button
              onClick={() =>
                handleSecondButtonClick(trainingStaple[index], false)
              }
            >
              I didn't know
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default VocabularyTraining;
