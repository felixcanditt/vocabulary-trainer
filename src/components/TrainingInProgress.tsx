import { useState, useRef, useEffect } from 'react';
import { VocabularyItem } from '../App';

const TrainingInProgress: React.FC<{
  currentIndex: number;
  stapleTotal: number;
  currentItem: VocabularyItem;
  onUserReviewedItem: (item: VocabularyItem, knew: boolean) => void;
}> = ({ currentIndex, stapleTotal, currentItem, onUserReviewedItem }) => {
  const [showBackText, setShowBackText] = useState(false);

  const knewBtnRef = useRef<HTMLButtonElement>(null);
  const showTranslationBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showBackText) {
      knewBtnRef.current?.focus();
    } else {
      showTranslationBtnRef.current?.focus();
    }
  }, [showBackText]);

  function revealTranslation() {
    setShowBackText(true);
  }

  function handleKnewClick(item: VocabularyItem, knew: boolean) {
    setShowBackText(false);
    onUserReviewedItem(item, knew);
  }

  return (
    <div className="training-in-progress">
      <div className="item-wrapper">
        <span className="item-text">{currentItem.frontText}</span>
        {!showBackText && (
          <button
            ref={showTranslationBtnRef}
            className="button-yellow"
            onClick={revealTranslation}
          >
            Show Translation
          </button>
        )}
        {showBackText && (
          <>
            <span className="item-text">{currentItem.backText}</span>
            <div>
              <button
                ref={knewBtnRef}
                className="button-yellow me-1rem"
                onClick={() => handleKnewClick(currentItem, true)}
              >
                I knew
              </button>
              <button
                className="button-yellow"
                onClick={() => handleKnewClick(currentItem, false)}
              >
                I didn't know
              </button>
            </div>
          </>
        )}
      </div>

      <span className="counter">
        {currentIndex + 1}/{stapleTotal}
        {stapleTotal === 1 ? ' item' : ' items'}
      </span>
    </div>
  );
};

export default TrainingInProgress;
