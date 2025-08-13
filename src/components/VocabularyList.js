export default function VocabularyList({ vocabularyList }) {
  return (
    <ul>
      {vocabularyList.map((item) => (
        <li key={item.id}>
          {item.frontText}, {item.backText}
        </li>
      ))}
    </ul>
  );
}
