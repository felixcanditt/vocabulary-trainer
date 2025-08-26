import { VocabularyItem } from '../App';

const DeleteModal: React.FC<{
  onCloseModal: () => void;
  itemToBeDeleted: VocabularyItem;
  onHandleYesClick: () => void;
}> = ({ onCloseModal, itemToBeDeleted, onHandleYesClick }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <button onClick={onCloseModal} className="button-red">
          X
        </button>
        <p>Are you sure you want to delete this item?</p>
        <span className="item-text">
          {itemToBeDeleted.frontText} - {itemToBeDeleted.backText}
        </span>
        <div>
          <button onClick={onHandleYesClick} className="button-yellow">
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
