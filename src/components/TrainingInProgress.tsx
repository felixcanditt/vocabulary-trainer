import { useState } from 'react';
import { VocabularyItem } from '../App';

const TrainingInProgress: React.FC<{
  currentIndex: number;
  stapleTotal: number;
  currentItem: VocabularyItem;
  onHandleUserRemembered: (item: VocabularyItem, knew: boolean) => void;
}> = ({ currentIndex, stapleTotal, currentItem, onHandleUserRemembered }) => {
  const [showBackText, setShowBackText] = useState(false);

  function revealTranslation() {
    setShowBackText(true);
  }

  function handleKnewClick(item: VocabularyItem, knew: boolean) {
    setShowBackText(false);
    onHandleUserRemembered(item, knew);
  }

  return (
    <>
      <p>
        {currentIndex + 1} / {stapleTotal}
        {stapleTotal === 1 ? ' item' : ' items'}
      </p>
      <p>{currentItem.frontText}</p>
      {!showBackText && (
        <button onClick={revealTranslation}>Show Translation</button>
      )}
      {showBackText && (
        <>
          <p>{currentItem.backText}</p>
          <button onClick={() => handleKnewClick(currentItem, true)}>
            I knew
          </button>
          <button onClick={() => handleKnewClick(currentItem, false)}>
            I didn't know
          </button>
        </>
      )}
    </>
  );
};

export default TrainingInProgress;
