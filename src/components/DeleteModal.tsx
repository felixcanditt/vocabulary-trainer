import { VocabularyItem } from '../App';

const DeleteModal: React.FC<{
  onCloseModal: () => void;
  itemToBeDeleted: VocabularyItem;
  onHandleYesClick: () => void;
}> = ({ onCloseModal, itemToBeDeleted, onHandleYesClick }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <button onClick={onCloseModal} className="close-button">
          X
        </button>
        <p>Are you sure you want to delete this item?</p>
        <span className="item-text">
          {itemToBeDeleted.frontText} - {itemToBeDeleted.backText}
        </span>
        <div>
          <button
            onClick={onHandleYesClick}
            className="modal-button yes-button"
          >
            Yes
          </button>
          <button onClick={onCloseModal} className="modal-button no-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
