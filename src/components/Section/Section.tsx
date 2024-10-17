import "./Section.css";

function Section() {
  return (
    <>
      <section className="todo-section">
        <div>
          <p className="text-large">Task Done</p>
          <p className="text-small">Keep it up</p>
        </div>

        <div className="c">0/0</div>
      </section>
    </>
  );
}

export default Section;
