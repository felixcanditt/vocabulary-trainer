import { useState } from 'react';

import { VocabularyItem } from '../App';

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
      props.onUpdateVocabularyList(trainingStaple);
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
              You reviewed staple {props.selectedStapleForReview} with{' '}
              {trainingStaple.length}{' '}
              {trainingStaple.length === 1 ? 'item' : 'items'} and remembered{' '}
              {rememberedItemsCount}{' '}
              {rememberedItemsCount === 1 ? 'item' : 'items'} correctly.
            </p>
            {props.selectedStapleForReview < 3 &&
              rememberedItemsCount === trainingStaple.length && (
                <p>
                  {rememberedItemsCount === 1 ? 'The item' : 'All items'}
                  will move to staple {props.selectedStapleForReview + 1}.
                </p>
              )}
            {props.selectedStapleForReview < 3 &&
              rememberedItemsCount > 0 &&
              rememberedItemsCount < trainingStaple.length && (
                <p>
                  The {rememberedItemsCount === 1 ? 'item' : 'items'} you knew
                  will move to staple {props.selectedStapleForReview + 1}. The{' '}
                  {trainingStaple.length - rememberedItemsCount === 1
                    ? 'one'
                    : 'ones'}
                  you didn't know will stay in staple{' '}
                  {props.selectedStapleForReview}.
                </p>
              )}
            {((props.selectedStapleForReview < 3 &&
              rememberedItemsCount === 0) ||
              props.selectedStapleForReview === 3) && (
              <p>
                {trainingStaple.length === 1 ? 'The item' : 'All items'} will
                stay in staple {props.selectedStapleForReview}.
              </p>
            )}
            <button onClick={closeTrainingView}>Go back to home</button>
          </>
        )}
      </div>
    </>
  );
};

export default VocabularyTraining;
