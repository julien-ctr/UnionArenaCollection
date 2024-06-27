import './Progress_bar.css';

function ProgressBar() {
  return (
    <div className="ProgressBar">
      <p className="progress-count">Progress : X/X (X%)</p>
      <div className="empty-bar bar">
        <div className="filled-bar bar"></div>
      </div>
      <a className="details-text" href='#'>View more details</a>
    </div>
  );
}

export default ProgressBar;
