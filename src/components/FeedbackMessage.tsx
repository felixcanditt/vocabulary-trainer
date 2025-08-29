import { FeedbackForUser } from '../App';

const FeedbackMessage: React.FC<{
  feedback: FeedbackForUser;
  successText: string;
  errorText: string;
}> = ({ feedback, successText, errorText }) => {
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
