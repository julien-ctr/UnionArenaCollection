import './Collection.css';
import ProgressBar from './Progress_bar';

function Collection() {
  return (
    <div className='Collection'>
      <div className='container'>
          <aside className='side-section'>
            <ProgressBar />
            
            <section className='extensions'>
                <button className='extensions-button'>Select extensions</button>
                <p>Currently selected :</p>
                <div className='extensions-container'>
                    <ul className='extensions-list'>
                        <li>
                            <p>EX04BT/JJK-3</p>
                        </li>
                        <li>
                            <p>UA01BT/CGS-1</p>
                        </li>
                        <li>
                            <p>UA15BT/HIQ-1</p>
                        </li>
                    </ul>
                </div> 
            </section>
          </aside>
      </div>
    </div>
  );
}

export default Collection;
