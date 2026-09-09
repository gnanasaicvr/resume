function ScoreBadge({ score }) {

  let className = "score-low";

  if (score >= 80) {
    className = "score-high";
  } else if (score >= 60) {
    className = "score-medium";
  }

  return (
    <span className={`score-badge ${className}`}>
      {score}%
    </span>
  );
}

export default ScoreBadge;