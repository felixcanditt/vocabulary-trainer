import { useState } from 'react';

import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{ vocabularyList: VocabularyItem[] }> = (
  props
) => {
  const [counter, setCounter] = useState(0);

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

  let showNext = true;

  if (
    props.vocabularyList.length === 0 ||
    counter === props.vocabularyList.length
  ) {
    showNext = false;
  }

  function showNextItem() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <>
      <h2>training</h2>
      {showNext && (
        <div onClick={showNextItem} style={{ border: '1px solid black' }}>
          <p>{props.vocabularyList[counter].frontText}</p>
          <p>{props.vocabularyList[counter].backText}</p>
        </div>
      )}
      {!showNext && <div>done</div>}
    </>
  );
};

export default VocabularyTraining;
