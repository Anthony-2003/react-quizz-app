interface Props {
  index: number;
  numQuestion: number;
  points: number;
  maxPossiblePoins: number;
  answer: number | null;
}

export default function Progress({
  index,
  numQuestion,
  points,
  maxPossiblePoins,
  answer,
}: Props) {
  return (
    <header className="progress">
      <progress
        max={numQuestion}
        value={index + Number(answer !== null)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>

      <p>
        <strong>{points}</strong>/{maxPossiblePoins}
      </p>
    </header>
  );
}
