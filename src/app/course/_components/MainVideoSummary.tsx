import type { Chapter, Unit } from "@prisma/client";

interface Props {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
}

const MainVideoSummary = ({ chapter, unitIndex, chapterIndex }: Props) => {
  return (
    <div className="mt-16 flex-[2]">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="Chapter Video"
        className="mt-4 aspect-video max-h-[24rem] w-full"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
