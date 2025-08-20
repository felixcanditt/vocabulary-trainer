import { useState } from 'react';

import { VocabularyItem } from '../App';

import TrainingInProcess from './TrainingInProcess';

function getSummaryText(total: number, staple: number, remembered: number) {
  return `You reviewed ${total} ${
    total === 1 ? 'item' : 'items'
  } from staple ${staple} and remembered ${remembered}.`;
}

function getNextStepText(total: number, staple: number, remembered: number) {
  if (staple < 3) {
    if (remembered === total) {
      return total === 1
        ? `The item moves to staple ${staple + 1}.`
        : `All items move to staple ${staple + 1}.`;
    }
    if (remembered > 0) {
      return remembered === 1
        ? `The item you remembered moves to staple ${
            staple + 1
          }, the rest stay in staple ${staple}.`
        : `The items you remembered move to staple ${
            staple + 1
          }, the rest stay in staple ${staple}.`;
    }
    return total === 1
      ? `The item stays in staple ${staple}.`
      : `All items stay in staple ${staple}.`;
  }

  return total === 1
    ? `The item stays in staple ${staple}.`
    : `All items stay in staple ${staple}.`;
}

const VocabularyTraining: React.FC<{
  listForTraining: VocabularyItem[];
  selectedStapleForReview: number;
  onUpdateVocabularyList: (list: VocabularyItem[]) => void;
  onSelectStaple: (staple: number) => void;
}> = (props) => {
  const [trainingStaple, setTrainingStaple] = useState(props.listForTraining);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rememberedItemsCount, setRememberedItemsCount] = useState(0);
  const [showResultView, setShowResultView] = useState(false);

  function handleUserRemembered(
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

    if (currentIndex === trainingStaple.length - 1) {
      props.onUpdateVocabularyList(updatedTrainingStaple);
      setShowResultView(true);
      return;
    }

    setTrainingStaple(updatedTrainingStaple);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  function closeTrainingView() {
    props.onSelectStaple(0);
  }

  return (
    <>
      <h2>training</h2>
      <div style={{ border: '1px solid black' }}>
        <button onClick={closeTrainingView}>X</button>

        {!showResultView && (
          <TrainingInProcess
            currentIndex={currentIndex}
            stapleTotal={trainingStaple.length}
            currentItem={trainingStaple[currentIndex]}
            onHandleUserRemembered={handleUserRemembered}
          />
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
