import "./Section.css";

interface SectionProps {
  completedCount: number;
  totalCount: number;
}

function Section({ completedCount, totalCount }: SectionProps) {
  return (
    <>
      <section className="todo-section">
        <div>
          <p className="text-large">Task Done</p>
          <p className="text-small">Keep it up</p>
        </div>

        <div className="c">{`${completedCount}/${totalCount}`}</div>
      </section>
    </>
  );
}

export default Section;
