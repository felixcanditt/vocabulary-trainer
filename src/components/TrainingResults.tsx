function singularOrPlural(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function getSummaryText(total: number, staple: number, remembered: number) {
  return `You reviewed ${total} ${singularOrPlural(
    total,
    'item',
    'items'
  )} from Staple ${staple} and remembered ${remembered}.`;
}

function getNextStepText(total: number, staple: number, remembered: number) {
  const allMove = `${singularOrPlural(
    total,
    'The item moves',
    'All items move'
  )} to Staple ${staple + 1}.`;

  const allStay = `${singularOrPlural(
    total,
    'The item stays',
    'All items stay'
  )} in Staple ${staple}.`;

  if (staple === 3) return allStay;

  if (remembered === total) return allMove;

  if (remembered > 0) {
    return `${singularOrPlural(
      remembered,
      'The item you remembered moves',
      'The items you remembered move'
    )} to Staple ${staple + 1}, the rest stay in Staple ${staple}.`;
  }

  return allStay;
}

const TrainingResults: React.FC<{
  total: number;
  staple: number;
  remembered: number;
}> = ({ total, staple, remembered }) => {
  return (
    <div aria-live="polite">
      <p>{getSummaryText(total, staple, remembered)}</p>
      <p>{getNextStepText(total, staple, remembered)}</p>
    </div>
  );
};

export default TrainingResults;
