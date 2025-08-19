import { VocabularyItem } from '../App';

const VocabularyStaple: React.FC<{
  stapleTitle: string;
  stapleNumber: number;
  stapleArray: VocabularyItem[];
  onSelectStaple: (selection: number) => void;
}> = (props) => {
  return (
    <>
      <h3>{props.stapleTitle}</h3>
      {props.stapleArray.length > 0 && (
        <button onClick={() => props.onSelectStaple(props.stapleNumber)}>
          Review Staple
        </button>
      )}
      <ul>
        {props.stapleArray.map((item) => (
          <li key={item.id}>
            {item.frontText}, {item.backText}, {item.currentStaple}
          </li>
        ))}
      </ul>
    </>
  );
};

export default VocabularyStaple;
