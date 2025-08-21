import { useState } from 'react';
import { VocabularyItem } from '../App';

const TrainingInProgress: React.FC<{
  currentIndex: number;
  stapleTotal: number;
  currentItem: VocabularyItem;
  onUserReviewedItem: (item: VocabularyItem, knew: boolean) => void;
}> = ({ currentIndex, stapleTotal, currentItem, onUserReviewedItem }) => {
  const [showBackText, setShowBackText] = useState(false);

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
          <button className="modal-button" onClick={revealTranslation}>
            Show Translation
          </button>
        )}
        {showBackText && (
          <>
            <span className="item-text">{currentItem.backText}</span>
            <div>
              <button
                className="modal-button knew-button"
                onClick={() => handleKnewClick(currentItem, true)}
              >
                I knew
              </button>
              <button
                className="modal-button"
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
