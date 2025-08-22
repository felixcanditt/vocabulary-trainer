import { useState } from 'react';
import { VocabularyItem } from '../App';

const VocabularyStaple: React.FC<{
  stapleTitle: string;
  stapleNumber: number;
  stapleArray: VocabularyItem[];
  onSelectStaple: (selection: number) => void;
}> = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  function handleClickDetails() {
    setShowDetails((prevState) => !prevState);
  }
  return (
    <div className="staple-box">
      <h3>
        {props.stapleTitle} ({props.stapleArray.length}
        {props.stapleArray.length === 1 ? ' item' : ' items'})
      </h3>
      {props.stapleArray.length > 0 && (
        <>
          <button onClick={() => props.onSelectStaple(props.stapleNumber)}>
            Start Review
          </button>
          <button onClick={handleClickDetails}>
            {showDetails ? 'Hide Items' : 'Show Items'}
          </button>
          {showDetails && (
            <ul>
              {props.stapleArray.map((item) => (
                <li key={item.id}>
                  {item.frontText} - {item.backText}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default VocabularyStaple;
