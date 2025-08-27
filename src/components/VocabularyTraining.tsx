import { useState, useEffect, useRef } from 'react';
import { VocabularyItem } from '../App';
import TrainingInProgress from './TrainingInProgress';
import TrainingResults from './TrainingResults';

const VocabularyTraining: React.FC<{
  listForTraining: VocabularyItem[];
  selectedStapleForReview: number;
  onUpdateVocabularyList: (list: VocabularyItem[]) => void;
  onSelectStaple: (staple: number) => void;
  openerRef: React.RefObject<HTMLButtonElement | null> | null;
}> = (props) => {
  const [trainingStaple, setTrainingStaple] = useState(props.listForTraining);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rememberedItemsCount, setRememberedItemsCount] = useState(0);
  const [showResultView, setShowResultView] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      props.openerRef?.current?.focus();
    };
  }, []);

  useEffect(() => {
    if (showResultView) {
      closeBtnRef.current?.focus();
    }
  }, [showResultView]);

  function userReviewedItem(
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
    <div className="modal-wrapper">
      <div className="modal trainings-modal">
        <button
          ref={closeBtnRef}
          className="button-close"
          onClick={closeTrainingView}
        >
          X
        </button>

        {!showResultView && (
          <TrainingInProgress
            currentIndex={currentIndex}
            stapleTotal={trainingStaple.length}
            currentItem={trainingStaple[currentIndex]}
            onUserReviewedItem={userReviewedItem}
          />
        )}

        {showResultView && (
          <TrainingResults
            total={trainingStaple.length}
            staple={props.selectedStapleForReview}
            remembered={rememberedItemsCount}
          />
        )}
      </div>
    </div>
  );
};

export default VocabularyTraining;
