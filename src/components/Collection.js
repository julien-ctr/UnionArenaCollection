import './Collection.css';
import ProgressBar from './Progress_bar';
import Card from './Card';

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

            <section className='rarities'>
              <p>Selected rarities :</p>
              <div className='rarities-container'>
                <ul>
                  <li><input type='checkbox'/>C</li>
                  <li><input type='checkbox'/>AP</li>
                  <li><input type='checkbox'/>U</li>
                  <li><input type='checkbox'/>U★</li>
                  <li><input type='checkbox'/>R</li>
                  <li><input type='checkbox'/>R★</li>
                  <li><input type='checkbox'/>SR</li>
                  <li><input type='checkbox'/>SR★★</li>
                  <li><input type='checkbox'/>SR★</li>
                  <li><input type='checkbox'/>SR★★★</li>
                </ul>
              </div>
            </section>

            <section className='unobtained'>
              <input className='unobtained-button' type='checkbox'/><span>Show unobtained</span>
            </section>
          </aside>
          
          <section className='cards-container'>
            {[...Array(10)].map((card) => (
                  <Card/>
              ))}
          </section>
      </div>
    </div>
  );
}

export default Collection;
