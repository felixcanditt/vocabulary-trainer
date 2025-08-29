import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'; //

describe('Vocabulary App core flows', () => {
  test('user can add a new vocabulary item', async () => {
    render(<App />);

    // open form
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(addButton);

    // fill form
    const inputFrontText = screen.getByLabelText(/front/i);
    const inputBackText = screen.getByLabelText(/back/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    await userEvent.type(inputFrontText, 'Apfel');
    await userEvent.type(inputBackText, 'Apple');
    await userEvent.click(saveButton);

    // item is not shown until "Show Items" is clicked
    expect(screen.queryByText(/Apfel/i)).not.toBeInTheDocument();

    const showItemsButton = screen.getByRole('button', { name: /show items/i });
    await userEvent.click(showItemsButton);

    expect(screen.getByText(/Apfel - Apple/i)).toBeInTheDocument();
  });

  test('user can edit an existing item', async () => {
    render(<App />);

    // add initial item
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(addButton);
    await userEvent.type(screen.getByLabelText(/front/i), 'Hund');
    await userEvent.type(screen.getByLabelText(/back/i), 'Dog');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    // reveal items
    const showItemsButton = screen.getByRole('button', { name: /show items/i });
    await userEvent.click(showItemsButton);

    // edit
    const editButton = screen.getByLabelText(/edit item: Hund/i);
    await userEvent.click(editButton);

    const frontInput = screen.getByLabelText(/front/i);
    const backInput = screen.getByLabelText(/back/i);

    await userEvent.clear(frontInput);
    await userEvent.type(frontInput, 'Katze');
    await userEvent.clear(backInput);
    await userEvent.type(backInput, 'Cat');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    // check updated
    expect(screen.getByText(/Katze - Cat/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hund - Dog/i)).not.toBeInTheDocument();
  });

  test('user can delete an item', async () => {
    render(<App />);

    // add initial item
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(addButton);
    await userEvent.type(screen.getByLabelText(/front/i), 'Haus');
    await userEvent.type(screen.getByLabelText(/back/i), 'House');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    // reveal items
    const showItemsButton = screen.getByRole('button', { name: /show items/i });
    await userEvent.click(showItemsButton);

    // delete
    const deleteButton = screen.getByLabelText(/delete item: Haus/i);
    await userEvent.click(deleteButton);

    const yesButton = screen.getByRole('button', { name: /yes/i });
    await userEvent.click(yesButton);

    // item should be gone
    expect(screen.queryByText(/Haus - House/i)).not.toBeInTheDocument();
  });
});
