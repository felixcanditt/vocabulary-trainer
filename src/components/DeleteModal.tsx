import { useEffect, useRef } from 'react';
import { VocabularyItem } from '../App';

const DeleteModal: React.FC<{
  onCloseModal: () => void;
  itemToBeDeleted: VocabularyItem;
  onHandleYesClick: () => void;
  openerRef: React.RefObject<HTMLButtonElement | null> | null;
}> = ({ onCloseModal, itemToBeDeleted, onHandleYesClick, openerRef }) => {
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  return (
    <div className="modal-wrapper">
      <div
        id="delete-modal"
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteTitle"
      >
        <button
          onClick={onCloseModal}
          className="button-close"
          aria-label="Close modal"
        >
          X
        </button>
        <h3 id="deleteTitle">Delete item</h3>
        <p>Are you sure you want to delete this item?</p>
        <span className="item-text">
          {itemToBeDeleted.frontText} - {itemToBeDeleted.backText}
        </span>
        <div>
          <button
            ref={firstBtnRef}
            onClick={onHandleYesClick}
            className="button-red me-1rem"
          >
            Yes
          </button>
          <button onClick={onCloseModal} className="button-yellow">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
