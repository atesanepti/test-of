
interface TotalScoreProps {
  score: number;
}

const TotalScore: React.FC<TotalScoreProps> = ({ score }) => {
  return (
    <div className="max-w-[200px] text-center">
      <h1 className="text-[100px] leading-[100px]">{score}</h1>
      <p className="text-[24px] font-normal">Total Score</p>
    </div>
  );
};

export default TotalScore;
