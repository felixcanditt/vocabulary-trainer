import VocabularyStaple from './VocabularyStaple';

import { VocabularyItem, FeedbackForUser } from '../App';

const VocabularyList: React.FC<{
  vocabularyList: VocabularyItem[];
  onSelectStaple: (staple: number) => void;
  onToggleForm: (
    opts:
      | {
          selectedItem: VocabularyItem | undefined;
          openerRef:
            | React.RefObject<HTMLButtonElement | null>
            | null
            | undefined;
        }
      | undefined
  ) => void;
  onDeleteItem: (item: VocabularyItem) => void;
  feedbackForUser: FeedbackForUser | undefined;
  onSetFeedbackForUser: (argument: undefined) => void;
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
          onDeleteItem={props.onDeleteItem}
          feedbackForUser={props.feedbackForUser}
          onSetFeedbackForUser={props.onSetFeedbackForUser}
        />

        <VocabularyStaple
          stapleTitle="Staple 2"
          stapleNumber={2}
          stapleArray={stapleTwo}
          onSelectStaple={props.onSelectStaple}
          onToggleForm={props.onToggleForm}
          onDeleteItem={props.onDeleteItem}
          feedbackForUser={props.feedbackForUser}
          onSetFeedbackForUser={props.onSetFeedbackForUser}
        />

        <VocabularyStaple
          stapleTitle="Staple 3"
          stapleNumber={3}
          stapleArray={stapleThree}
          onSelectStaple={props.onSelectStaple}
          onToggleForm={props.onToggleForm}
          onDeleteItem={props.onDeleteItem}
          feedbackForUser={props.feedbackForUser}
          onSetFeedbackForUser={props.onSetFeedbackForUser}
        />
      </div>
    </>
  );
};

export default VocabularyList;
