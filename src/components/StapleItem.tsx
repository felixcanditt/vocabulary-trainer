import { useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { VocabularyItem, EditConfirmation } from '../App';

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
  editConfirmation: EditConfirmation | undefined;
}> = ({ item, onToggleForm, onHandleClickDelete, editConfirmation }) => {
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

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

      {editConfirmation && editConfirmation.itemId === item.id && (
        <div
          className={`edit-message ${
            editConfirmation.wasSuccessful ? 'success' : 'error'
          }`}
        >
          <p>
            {editConfirmation.wasSuccessful
              ? 'Item has been edited.'
              : 'Editing failed, please try again.'}
          </p>
        </div>
      )}
    </li>
  );
};

export default StapleItem;
