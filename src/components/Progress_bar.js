import './Progress_bar.css';

function ProgressBar({currentCount, maxCount, showPopup}) {
  const percentage = Math.round(100 * currentCount / maxCount);

  return (
    <div className="ProgressBar">
      <p className="progress-count">{`Progress : ${currentCount}/${maxCount} (${percentage}%)`}</p>
      <div className="empty-bar bar">
        <div className="filled-bar bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <a className="details-text" href='#' onClick={showPopup}>View more details</a>
    </div>
  );
}

export default ProgressBar;
