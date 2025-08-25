import VocabularyStaple from './VocabularyStaple';

import { VocabularyItem } from '../App';

const VocabularyList: React.FC<{
  vocabularyList: VocabularyItem[];
  onSelectStaple: (staple: number) => void;
  onToggleForm: (item: VocabularyItem) => void;
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
      <h2>My vocabulary</h2>

      <div className="staples-container">
        <VocabularyStaple
          stapleTitle="Staple 1"
          stapleNumber={1}
          stapleArray={stapleOne}
          onSelectStaple={props.onSelectStaple}
          onToggleForm={props.onToggleForm}
        />

        <VocabularyStaple
          stapleTitle="Staple 2"
          stapleNumber={2}
          stapleArray={stapleTwo}
          onSelectStaple={props.onSelectStaple}
          onToggleForm={props.onToggleForm}
        />

        <VocabularyStaple
          stapleTitle="Staple 3"
          stapleNumber={3}
          stapleArray={stapleThree}
          onSelectStaple={props.onSelectStaple}
          onToggleForm={props.onToggleForm}
        />
      </div>
    </>
  );
};

export default VocabularyList;
