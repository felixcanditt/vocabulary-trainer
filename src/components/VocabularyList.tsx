import { VocabularyItem } from '../App';

const VocabularyList: React.FC<{ vocabularyList: VocabularyItem[] }> = (
  props
) => {
  return (
    <ul>
      {props.vocabularyList.map((item) => (
        <li key={item.id}>
          {item.frontText}, {item.backText}
        </li>
      ))}
    </ul>
  );
};

export default VocabularyList;
