import { useState } from 'react';

import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{ vocabularyList: VocabularyItem[] }> = (
  props
) => {
  const [index, setIndex] = useState(0);
  const [showBackText, setShowBackText] = useState(false);

  let hasItemForReview: boolean;

  if (
    props.vocabularyList.length === 0 ||
    index === props.vocabularyList.length
  ) {
    hasItemForReview = false;
  } else {
    hasItemForReview = true;
  }

  function handleFirstButtonClick() {
    setShowBackText(true);
  }

  function handleSecondButtonClick(userRememberedItem: boolean) {
    if (userRememberedItem) {
    }

    setIndex((prevIndex) => prevIndex + 1);
    setShowBackText(false);
  }

  return (
    <>
      <h2>training</h2>
      {hasItemForReview && (
        <div style={{ border: '1px solid black' }}>
          <p>{props.vocabularyList[index].frontText}</p>
          {!showBackText && (
            <button onClick={handleFirstButtonClick}>Show Translation</button>
          )}
          {showBackText && (
            <>
              <p>{props.vocabularyList[index].backText}</p>
              <button onClick={() => handleSecondButtonClick(true)}>
                I knew
              </button>
              <button onClick={() => handleSecondButtonClick(false)}>
                I didn't know
              </button>
            </>
          )}
        </div>
      )}
      {!hasItemForReview && <div>done</div>}
    </>
  );
};

export default VocabularyTraining;
