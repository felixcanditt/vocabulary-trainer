import { useState } from 'react';
import { VocabularyItem } from '../App';

const VocabularyStaple: React.FC<{
  stapleTitle: string;
  stapleNumber: number;
  stapleArray: VocabularyItem[];
  onToggleForm: (item: VocabularyItem) => void;
  onSelectStaple: (selection: number) => void;
  onDeleteItem: (id: string) => void;
}> = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');

  function handleClickDetails() {
    setShowDetails((prevState) => !prevState);
  }

  function handleClickDelete(id: string) {
    setShowDeleteModal(true);
    setItemToBeDeleted(id);
  }

  function handleNoClick() {
    setShowDeleteModal(false);
    setItemToBeDeleted('');
  }

  function handleYesClick() {
    props.onDeleteItem(itemToBeDeleted);
  }

  return (
    <>
      {showDeleteModal && (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      )}
      <div className="staple-box">
        <h3>
          {props.stapleTitle} ({props.stapleArray.length}
          {props.stapleArray.length === 1 ? ' item' : ' items'})
        </h3>
        {props.stapleArray.length > 0 && (
          <>
            <button onClick={() => props.onSelectStaple(props.stapleNumber)}>
              Start Review
            </button>
            <button onClick={handleClickDetails}>
              {showDetails ? 'Hide Items' : 'Show Items'}
            </button>

            {showDetails && (
              <ul>
                {props.stapleArray.map((item) => (
                  <li key={item.id} className="staple-item">
                    <span className="item-text">
                      {item.frontText} - {item.backText}
                    </span>
                    <span
                      onClick={() => props.onToggleForm(item)}
                      className="item-button"
                    >
                      edit
                    </span>
                    <span
                      onClick={() => handleClickDelete(item.id)}
                      className="item-button"
                    >
                      delete
                    </span>
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
