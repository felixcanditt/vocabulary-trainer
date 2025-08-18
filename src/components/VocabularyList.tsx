import { VocabularyItem } from '../App';

const VocabularyList: React.FC<{
  vocabularyList: VocabularyItem[];
  onHandleClickStaple: (staple: number) => void;
}> = (props) => {
  const stapleOne = props.vocabularyList.filter(
    (item) => item.currentStaple === 1
  );
  const stapleTwo = props.vocabularyList.filter(
    (item) => item.currentStaple === 2
  );
  const stapleThree = props.vocabularyList.filter(
    (item) => item.currentStaple === 3
  );

  return (
    <>
      <h2>list</h2>
      <h3>staple 1</h3>
      <button onClick={() => props.onHandleClickStaple(1)}>
        Review Staple
      </button>
      <ul>
        {stapleOne.map((item) => (
          <li key={item.id}>
            {item.frontText}, {item.backText}, {item.currentStaple}
          </li>
        ))}
      </ul>
      <h3>staple 2</h3>
      <button onClick={() => props.onHandleClickStaple(2)}>
        Review Staple
      </button>
      <ul>
        {stapleTwo.map((item) => (
          <li key={item.id}>
            {item.frontText}, {item.backText}, {item.currentStaple}
          </li>
        ))}
      </ul>
      <h3>staple 3</h3>
      <button onClick={() => props.onHandleClickStaple(3)}>
        Review Staple
      </button>
      <ul>
        {stapleThree.map((item) => (
          <li key={item.id}>
            {item.frontText}, {item.backText}, {item.currentStaple}
          </li>
        ))}
      </ul>
    </>
  );
};

export default VocabularyList;
