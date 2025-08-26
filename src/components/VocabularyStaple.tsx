import { useState } from 'react';
import { VocabularyItem } from '../App';
import StapleItem from './StapleItem';
import DeleteModal from './DeleteModal';

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
        <DeleteModal
          onCloseModal={closeModal}
          itemToBeDeleted={itemToBeDeleted}
          onHandleYesClick={handleYesClick}
        />
      )}

      <div className="staple-box">
        <h3>
          {props.stapleTitle} ({props.stapleArray.length}
          {props.stapleArray.length === 1 ? ' item' : ' items'})
        </h3>

        {props.stapleArray.length > 0 ? (
          <>
            <button
              onClick={() => props.onSelectStaple(props.stapleNumber)}
              className="button-yellow"
            >
              Start Review
            </button>
            <button onClick={handleClickDetails} className="button-yellow">
              {showDetails ? 'Hide Items' : 'Show Items'}
            </button>

            {showDetails && (
              <ul>
                {props.stapleArray.map((item) => (
                  <StapleItem
                    key={item.id}
                    item={item}
                    onToggleForm={props.onToggleForm}
                    onHandleClickDelete={handleClickDelete}
                  />
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>No items yet.</p>
        )}
      </div>
    </>
  );
};

export default VocabularyStaple;
