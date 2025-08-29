import { useState, useRef } from 'react';
import { VocabularyItem, FeedbackForUser } from '../App';
import StapleItem from './StapleItem';
import DeleteModal from './DeleteModal';

const VocabularyStaple: React.FC<{
  stapleTitle: string;
  stapleNumber: number;
  stapleArray: VocabularyItem[];
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
  onSelectStaple: (
    selection: number,
    openerRef: React.RefObject<HTMLButtonElement | null> | null | undefined
  ) => void;
  onDeleteItem: (item: VocabularyItem) => void;
  feedbackForUser: FeedbackForUser | undefined;
  onSetFeedbackForUser: (argument: undefined) => void;
}> = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<VocabularyItem>();
  const [deleteOpenerRef, setDeleteOpenerRef] =
    useState<React.RefObject<HTMLButtonElement | null> | null>(null);

  const startBtnRef = useRef<HTMLButtonElement>(null);

  function handleClickDetails() {
    setShowDetails((prevState) => !prevState);
  }

  function handleClickDelete(
    item: VocabularyItem,
    openerRef: React.RefObject<HTMLButtonElement | null> | null
  ) {
    setShowDeleteModal(true);
    setItemToBeDeleted(item);
    setDeleteOpenerRef(openerRef);
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

  function getDeletionFeedback() {
    if (
      props.feedbackForUser &&
      props.feedbackForUser.userAction === 'delete' &&
      props.feedbackForUser.stapleBeforeDeletion === props.stapleNumber
    ) {
      return (
        <div
          className={`feedback-for-user ${
            props.feedbackForUser.wasSuccessful ? 'success' : 'error'
          }`}
          role={props.feedbackForUser.wasSuccessful ? 'status' : 'alert'}
        >
          {props.feedbackForUser.wasSuccessful
            ? 'Item has been deleted.'
            : 'Deleting failed, please try again.'}
        </div>
      );
    }
  }

  return (
    <>
      {showDeleteModal && itemToBeDeleted && (
        <DeleteModal
          onCloseModal={closeModal}
          itemToBeDeleted={itemToBeDeleted}
          onHandleYesClick={handleYesClick}
          openerRef={deleteOpenerRef}
        />
      )}

      <div className="staple-box">
        <h3 id={`staple-${props.stapleNumber}-title`}>
          {props.stapleTitle} ({props.stapleArray.length}
          {props.stapleArray.length === 1 ? ' item' : ' items'})
        </h3>

        {props.stapleArray.length > 0 ? (
          <>
            <div className="start-show-buttons">
              <button
                ref={startBtnRef}
                onClick={() =>
                  props.onSelectStaple(props.stapleNumber, startBtnRef)
                }
                className="button-yellow me-1rem"
                aria-expanded="false"
                aria-controls="trainings-modal"
              >
                Start Review
              </button>
              <button
                onClick={handleClickDetails}
                className="button-yellow"
                aria-expanded={showDetails}
                aria-controls="vocabulary-list"
              >
                {showDetails ? 'Hide Items' : 'Show Items'}
              </button>
            </div>

            {showDetails && (
              <div
                role="region"
                aria-labelledby={`staple-${props.stapleNumber}-title`}
              >
                {getDeletionFeedback()}

                <ul id={`staple-${props.stapleNumber}-list`}>
                  {props.stapleArray.map((item) => (
                    <StapleItem
                      key={item.id}
                      item={item}
                      onToggleForm={props.onToggleForm}
                      onHandleClickDelete={handleClickDelete}
                      feedbackForUser={props.feedbackForUser}
                      onSetFeedbackForUser={props.onSetFeedbackForUser}
                    />
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <p>No items yet.</p>
            {getDeletionFeedback()}
          </>
        )}
      </div>
    </>
  );
};

export default VocabularyStaple;
