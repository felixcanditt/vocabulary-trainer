import { useEffect } from 'react';
import { FeedbackForUser } from '../App';

const FeedbackMessage: React.FC<{
  feedback: FeedbackForUser;
  resetFeedback: (argument: undefined) => void;
}> = ({ feedback, resetFeedback }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetFeedback(undefined);
    }, 3000);

    return () => clearTimeout(timer);
  }, [feedback]);

  let successText = '';
  let errorText = '';
  if (feedback.userAction === 'add') {
    successText = 'Item has been added to Staple 1.';
    errorText = 'Adding new item failed, please try again.';
  } else if (feedback.userAction === 'edit') {
    successText = 'Item has been edited.';
    errorText = 'Editing failed, please try again.';
  } else if (feedback.userAction === 'delete') {
    successText = 'Item has been deleted.';
    errorText = 'Deleting failed, please try again.';
  }

  return (
    <div
      className={`feedback-for-user ${
        feedback.wasSuccessful ? 'success' : 'error'
      }`}
      role={feedback.wasSuccessful ? 'status' : 'alert'}
    >
      {feedback.wasSuccessful ? successText : errorText}
    </div>
  );
};

export default FeedbackMessage;
