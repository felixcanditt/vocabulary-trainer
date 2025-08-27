import { useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { VocabularyItem } from '../App';

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
}> = ({ item, onToggleForm, onHandleClickDelete }) => {
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <li className="staple-item">
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
      >
        <FaEdit size={20} />
      </button>
      <button
        ref={deleteBtnRef}
        onClick={() => onHandleClickDelete(item, deleteBtnRef)}
        className="button-red"
        aria-expanded="false"
        aria-controls="delete-modal"
      >
        <FaTrash size={20} />
      </button>
    </li>
  );
};

export default StapleItem;
