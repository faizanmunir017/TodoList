interface SectionProps {
  completedCount: number;
  totalCount: number;
}

function Section({ completedCount, totalCount }: SectionProps) {
  return (
    <>
      <section className="border-[1px] border-solid border-customBorder justify-around self-center w-full  p-[12px] rounded-[11px] flex items-center ">
        <div>
          <p className="text-[32px]">Task Done</p>
          <p className="text-2xl">Keep it up</p>
        </div>

        <div className="bg-[#88ab33] w-[150px] h-[150px] rounded-full text-[48px] flex items-center justify-center text-center">{`${completedCount}/${totalCount}`}</div>
      </section>
    </>
  );
}

export default Section;
