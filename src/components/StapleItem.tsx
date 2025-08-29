import { useRef, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { VocabularyItem, FeedbackForUser } from '../App';

const StapleItem: React.FC<{
  item: VocabularyItem;
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
  onHandleClickDelete: (
    item: VocabularyItem,
    openerRef: React.RefObject<HTMLButtonElement | null> | null
  ) => void;
  feedbackForUser: FeedbackForUser | undefined;
  onSetFeedbackForUser: (argument: undefined) => void;
}> = ({
  item,
  onToggleForm,
  onHandleClickDelete,
  feedbackForUser,
  onSetFeedbackForUser,
}) => {
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (feedbackForUser && feedbackForUser.itemId === item.id) {
      const timer = setTimeout(() => {
        onSetFeedbackForUser(undefined);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [feedbackForUser]);

  return (
    <li className="staple-item">
      <div className="item-content">
        <span className="item-text">
          {item.frontText} - {item.backText}
        </span>

        <button
          ref={editBtnRef}
          onClick={() =>
            onToggleForm({ selectedItem: item, openerRef: editBtnRef })
          }
          className="button-yellow me-1rem"
          aria-expanded="false"
          aria-controls="vocabulary-form"
          aria-label={`Edit item: ${item.frontText}`}
        >
          <FaEdit size={20} />
        </button>
        <button
          ref={deleteBtnRef}
          onClick={() => onHandleClickDelete(item, deleteBtnRef)}
          className="button-red"
          aria-expanded="false"
          aria-controls="delete-modal"
          aria-label={`Delete item: ${item.frontText}`}
        >
          <FaTrash size={20} />
        </button>
      </div>

      {feedbackForUser &&
        feedbackForUser.itemId === item.id &&
        feedbackForUser.userAction === 'edit' && (
          <div
            className={`edit-message ${
              feedbackForUser.wasSuccessful ? 'success' : 'error'
            }`}
            role={feedbackForUser.wasSuccessful ? 'status' : 'alert'}
          >
            {feedbackForUser.wasSuccessful
              ? 'Item has been edited.'
              : 'Editing failed, please try again.'}
          </div>
        )}
    </li>
  );
};

export default StapleItem;
