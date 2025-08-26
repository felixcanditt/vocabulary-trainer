import { FaEdit, FaTrash } from 'react-icons/fa';
import { VocabularyItem } from '../App';

const StapleItem: React.FC<{
  item: VocabularyItem;
  onToggleForm: (item: VocabularyItem) => void;
  onHandleClickDelete: (item: VocabularyItem) => void;
}> = ({ item, onToggleForm, onHandleClickDelete }) => {
  return (
    <li className="staple-item">
      <span className="item-text">
        {item.frontText} - {item.backText}
      </span>

      <button onClick={() => onToggleForm(item)} className="button-yellow">
        <FaEdit size={16} />
      </button>
      <button onClick={() => onHandleClickDelete(item)} className="button-red">
        <FaTrash size={16} />
      </button>
    </li>
  );
};

export default StapleItem;
