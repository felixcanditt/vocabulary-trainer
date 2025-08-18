import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VocabularyForm from './VocabularyForm';
import { VocabularyItem } from '../App';

describe('VocabularyForm', () => {
  test('calls onAddToVocabularyList with correct data', async () => {
    const addMock = jest.fn();

    render(<VocabularyForm onAddToVocabularyList={addMock} />);

    const inputFrontText = screen.getByLabelText(/front/i);
    const inputBackText = screen.getByLabelText(/back/i);
    const buttonElement = screen.getByRole('button', { name: /save/i });

    await userEvent.type(inputFrontText, 'Wurst');
    await userEvent.type(inputBackText, 'Sausage');
    await userEvent.click(buttonElement);

    expect(addMock).toHaveBeenCalledTimes(1);
    expect(addMock).toHaveBeenCalledWith(
      expect.objectContaining<VocabularyItem>({
        frontText: 'Wurst',
        backText: 'Sausage',
        currentStaple: 1,
        id: expect.any(String),
      })
    );
  });
});
