import { useState } from 'react';

import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{
  listForTraining: VocabularyItem[];
  onUpdateVocabularyList: (list: VocabularyItem[]) => void;
}> = (props) => {
  const [trainingStaple, setTrainingStaple] = useState(props.listForTraining);
  const [index, setIndex] = useState(0);
  const [showBackText, setShowBackText] = useState(false);
  const [showResultView, setShowResultView] = useState(false);

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
      setTrainingStaple(updatedTrainingStaple);
      setShowResultView(true);
      return;
    }

    setTrainingStaple(updatedTrainingStaple);
    setIndex((prevIndex) => prevIndex + 1);
    setShowBackText(false);
  }

  function endTraining() {
    props.onUpdateVocabularyList(trainingStaple);
  }

  return (
    <>
      <h2>training</h2>
      <div style={{ border: '1px solid black' }}>
        {!showResultView && (
          <>
            <p>
              {index} / {trainingStaple.length}{' '}
              {trainingStaple.length === 1 ? ' item' : ' items'} reviewed
            </p>
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
          </>
        )}
        {showResultView && <button onClick={endTraining}>done, go back</button>}
      </div>
    </>
  );
};

export default VocabularyTraining;
