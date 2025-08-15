import { VocabularyItem } from '../App';

const VocabularyTraining: React.FC<{ vocabularyList: VocabularyItem[] }> = (
  props
) => {
  return (
    <>
      <h2>training</h2>
      <ul>
        {props.vocabularyList.map((item) => (
          <li key={item.id}>
            {item.frontText}, {item.backText}
          </li>
        ))}
      </ul>
    </>
  );
};

export default VocabularyTraining;
