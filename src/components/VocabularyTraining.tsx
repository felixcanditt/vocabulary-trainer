import { useState } from 'react';

import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{
  selectedStaple: number;
  vocabularyList: VocabularyItem[];
  onUpdateVocabularyList: (list: VocabularyItem[]) => void;
  onResetStaple: () => void;
}> = (props) => {
  const [index, setIndex] = useState(0);
  const [showBackText, setShowBackText] = useState(false);

  const stapleForReview = props.vocabularyList.filter(
    (item) => item.currentStaple === props.selectedStaple
  );

  const [trainingsList, setTrainingsList] = useState(props.vocabularyList);

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
      (props.selectedStaple === 1 || props.selectedStaple === 2)
    ) {
      newStaple = props.selectedStaple + 1;
    } else {
      newStaple = props.selectedStaple;
    }

    const newList = trainingsList.map((item) => {
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

    if (index === stapleForReview.length - 1) {
      props.onUpdateVocabularyList(newList);
      props.onResetStaple();
      return;
    }

    setTrainingsList(newList);
    setIndex((prevIndex) => prevIndex + 1);
    setShowBackText(false);
  }

  return (
    <>
      <h2>training</h2>
      <div>
        stapleForReview.length:
        {stapleForReview.length}
      </div>

      <div>index: {index}</div>

      {stapleForReview.length === 0 && <div>nothing to review</div>}

      <div style={{ border: '1px solid black' }}>
        <p>{stapleForReview[index].frontText}</p>
        {!showBackText && (
          <button onClick={handleFirstButtonClick}>Show Translation</button>
        )}
        {showBackText && (
          <>
            <p>{stapleForReview[index].backText}</p>
            <button
              onClick={() =>
                handleSecondButtonClick(stapleForReview[index], true)
              }
            >
              I knew
            </button>
            <button
              onClick={() =>
                handleSecondButtonClick(stapleForReview[index], false)
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
