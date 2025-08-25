import { useState } from 'react';
import { VocabularyItem } from '../App';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VocabularyStaple: React.FC<{
  stapleTitle: string;
  stapleNumber: number;
  stapleArray: VocabularyItem[];
  onToggleForm: (item: VocabularyItem) => void;
  onSelectStaple: (selection: number) => void;
  onDeleteItem: (item: VocabularyItem) => void;
}> = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<VocabularyItem>();

  function handleClickDetails() {
    setShowDetails((prevState) => !prevState);
  }

  function handleClickDelete(item: VocabularyItem) {
    setShowDeleteModal(true);
    setItemToBeDeleted(item);
  }

  function closeModal() {
    setShowDeleteModal(false);
    setItemToBeDeleted(undefined);
  }

  function handleYesClick() {
    if (itemToBeDeleted) {
      props.onDeleteItem(itemToBeDeleted);
    }
    closeModal();
  }

  return (
    <>
      {showDeleteModal && itemToBeDeleted && (
        <div className="modal-wrapper">
          <div className="modal">
            <button onClick={closeModal} className="close-button">
              X
            </button>
            <p>Are you sure you want to delete this item?</p>
            <span className="item-text">
              {itemToBeDeleted.frontText} - {itemToBeDeleted.backText}
            </span>
            <div>
              <button
                onClick={handleYesClick}
                className="modal-button yes-button"
              >
                Yes
              </button>
              <button onClick={closeModal} className="modal-button no-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="staple-box">
        <h3>
          {props.stapleTitle} ({props.stapleArray.length}
          {props.stapleArray.length === 1 ? ' item' : ' items'})
        </h3>
        {props.stapleArray.length > 0 && (
          <>
            <button
              onClick={() => props.onSelectStaple(props.stapleNumber)}
              className="staple-button"
            >
              Start Review
            </button>
            <button onClick={handleClickDetails} className="staple-button">
              {showDetails ? 'Hide Items' : 'Show Items'}
            </button>

            {showDetails && (
              <ul>
                {props.stapleArray.map((item) => (
                  <li key={item.id} className="staple-item">
                    <span className="item-text">
                      {item.frontText} - {item.backText}
                    </span>

                    <button
                      onClick={() => props.onToggleForm(item)}
                      className="item-button"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleClickDelete(item)}
                      className="item-button delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VocabularyStaple;
