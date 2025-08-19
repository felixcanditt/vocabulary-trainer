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
  const [trainingsResults, setTrainingsResults] = useState(
    props.vocabularyList
  );

  const stapleForTraining = props.vocabularyList.filter(
    (item) => item.currentStaple === props.selectedStaple
  );

  function handleFirstButtonClick() {
    setShowBackText(true);
  }

  function handleSecondButtonClick(
    clickedItem: VocabularyItem,
    userRememberedItem: boolean
  ) {
    let newStaple: number;

    if (
      userRememberedItem &&
      (clickedItem.currentStaple === 1 || clickedItem.currentStaple === 2)
    ) {
      newStaple = clickedItem.currentStaple + 1;
    } else {
      newStaple = clickedItem.currentStaple;
    }

    const newList = trainingsResults.map((item) => {
      if (item.id === clickedItem.id) {
        const newItem = {
          ...item,
          currentStaple: newStaple,
        };
        return newItem;
      } else {
        return item;
      }
    });

    if (index === stapleForTraining.length - 1) {
      props.onUpdateVocabularyList(newList);
      props.onSelectStaple(0);
      return;
    }

    setTrainingsResults(newList);
    setIndex((prevIndex) => prevIndex + 1);
    setShowBackText(false);
  }

  return (
    <>
      <h2>training</h2>
      <div style={{ border: '1px solid black' }}>
        <p>{stapleForTraining[index].frontText}</p>
        {!showBackText && (
          <button onClick={handleFirstButtonClick}>Show Translation</button>
        )}
        {showBackText && (
          <>
            <p>{stapleForTraining[index].backText}</p>
            <button
              onClick={() =>
                handleSecondButtonClick(stapleForTraining[index], true)
              }
            >
              I knew
            </button>
            <button
              onClick={() =>
                handleSecondButtonClick(stapleForTraining[index], false)
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
