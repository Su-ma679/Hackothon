function ScoreBreakdown({ breakdown }) {
  return (
    <div className="score-breakdown">
      {breakdown.map((item) => (
        <div className="score-row" key={item.label}>
          <div className="score-row-top">
            <span>{item.label}</span>
            <strong>{item.score}%</strong>
          </div>

          <div className="score-bar">
            <div
              className="score-fill"
              style={{ width: `${item.score}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScoreBreakdown;