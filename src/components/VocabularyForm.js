export default function VocabularyForm() {
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(1);
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="front-text">Front</label>
      <input type="text" id="front-text"></input>
      <label htmlFor="back-text">Back</label>
      <input type="text" id="back-text"></input>
      <button>save</button>
    </form>
  );
}
