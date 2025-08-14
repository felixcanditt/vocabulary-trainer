interface VocabularyItem {
  frontText: string;
  backText: string;
  id: string;
}

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
