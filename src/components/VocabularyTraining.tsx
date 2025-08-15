import { useState } from 'react';

import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{ vocabularyList: VocabularyItem[] }> = (
  props
) => {
  const [index, setIndex] = useState(0);

  // const myArray = [
  //   {
  //     backText: 'cheese',
  //     frontText: 'käse',
  //     id: '32c95dbb-df46-4b04-b32c-9244f673d692',
  //   },
  //   {
  //     backText: 'brot',
  //     frontText: 'bread',
  //     id: '32c95dbb-df46-4b04-b32c-9244f673d699',
  //   },
  //   {
  //     backText: 'honig',
  //     frontText: 'honey',
  //     id: '32c95dbb-df46-4b04-b32c-9244f673d698',
  //   },
  // ];

  let hasItemForReview: boolean;

  if (
    props.vocabularyList.length === 0 ||
    index === props.vocabularyList.length
  ) {
    hasItemForReview = false;
  } else {
    hasItemForReview = true;
  }

  function showNextItem() {
    setIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <>
      <h2>training</h2>
      {hasItemForReview && (
        <div onClick={showNextItem} style={{ border: '1px solid black' }}>
          <p>{props.vocabularyList[index].frontText}</p>
          <p>{props.vocabularyList[index].backText}</p>
        </div>
      )}
      {!hasItemForReview && <div>done</div>}
    </>
  );
};

export default VocabularyTraining;
