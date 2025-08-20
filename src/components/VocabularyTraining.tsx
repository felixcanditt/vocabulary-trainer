import { useState } from 'react';

import { VocabularyItem } from '../App';

function getSummaryText(total: number, staple: number, remembered: number) {
  return `You reviewed staple ${staple} with ${total} ${
    total === 1 ? 'item' : 'items'
  } and remembered ${remembered} ${
    remembered === 1 ? 'item' : 'items'
  } correctly.`;
}

function getNextStepText(total: number, staple: number, remembered: number) {
  if (staple < 3) {
    if (remembered === total) {
      return `${
        remembered === 1 ? 'The item' : 'All items'
      } will move to staple ${staple + 1}.`;
    }
    if (remembered > 0) {
      return `The ${
        remembered === 1 ? 'item' : 'items'
      } you knew will move to staple ${staple + 1}. The ${
        total - remembered === 1 ? 'one' : 'ones'
      } you didn't know will stay in staple ${staple}.`;
    }
    return `${
      total === 1 ? 'The item' : 'All items'
    } will stay in staple ${staple}.`;
  }

  return `${
    total === 1 ? 'The item' : 'All items'
  } will stay in staple ${staple}.`;
}

const VocabularyTraining: React.FC<{
  listForTraining: VocabularyItem[];
  selectedStapleForReview: number;
  onUpdateVocabularyList: (list: VocabularyItem[]) => void;
  onSelectStaple: (staple: number) => void;
}> = (props) => {
  const [trainingStaple, setTrainingStaple] = useState(props.listForTraining);
  const [index, setIndex] = useState(0);
  const [showBackText, setShowBackText] = useState(false);
  const [rememberedItemsCount, setRememberedItemsCount] = useState(0);
  const [showResultView, setShowResultView] = useState(false);

  function handleFirstButtonClick() {
    setShowBackText(true);
  }

  function handleSecondButtonClick(
    clickedItem: VocabularyItem,
    userRememberedItem: boolean
  ) {
    if (userRememberedItem) {
      setRememberedItemsCount((prevCount) => prevCount + 1);
    }
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
      props.onUpdateVocabularyList(updatedTrainingStaple);
      setShowResultView(true);
      return;
    }

    setTrainingStaple(updatedTrainingStaple);
    setIndex((prevIndex) => prevIndex + 1);
    setShowBackText(false);
  }

  function closeTrainingView() {
    props.onSelectStaple(0);
  }

  return (
    <>
      <h2>training</h2>
      <div style={{ border: '1px solid black' }}>
        {!showResultView && (
          <>
            <button onClick={closeTrainingView}>X</button>
            <p>
              {index + 1} / {trainingStaple.length}
              {trainingStaple.length === 1 ? ' item' : ' items'}
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

        {showResultView && (
          <>
            <p>
              {getSummaryText(
                trainingStaple.length,
                props.selectedStapleForReview,
                rememberedItemsCount
              )}
            </p>
            <p>
              {getNextStepText(
                trainingStaple.length,
                props.selectedStapleForReview,
                rememberedItemsCount
              )}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default VocabularyTraining;
