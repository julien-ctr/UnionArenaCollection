import React, {useState} from 'react';
import './Collection.css';
import ProgressBar from './Progress_bar';
import Card from './Card';
import Popup from './Popup';

function Collection() {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const showPopup = () => {
    setPopupVisibility(true);
  };

  const hidePopup = () => {
    setPopupVisibility(false);
  };

  const [cards, setCards] = useState([
    { id: 1, name: 'Card 1', obtained: false },
    { id: 2, name: 'Card 2', obtained: false },
    { id: 3, name: 'Card 3', obtained: false },
    { id: 4, name: 'Card 4', obtained: false },
    { id: 5, name: 'Card 5', obtained: false },
    { id: 6, name: 'Card 6', obtained: false },
    { id: 7, name: 'Card 7', obtained: false },
    { id: 8, name: 'Card 8', obtained: false },
    { id: 9, name: 'Card 9', obtained: false },
  ]);

  const obtainedCardsCount = cards.reduce(
    (acc, card) => acc + (card.obtained ? 1 : 0),
    0,
  );

  const allCardsCount = cards.length;

  const toggleCardState = (id) => {
    setCards(cards.map(card => {
      if (card.id === id){
        return { ...card, obtained: !card.obtained }
      } else {
        return card
      }
    }));
  };

  return (
    <div className='Collection'>
      <div className='container'>
          <aside className='side-section'>
            <ProgressBar 
              currentCount={obtainedCardsCount}
              maxCount={allCardsCount}
              showPopup={showPopup}
            />
            
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
            {cards.map((card) => (
                  <Card 
                    key={card.id} 
                    card={card} 
                    toggleCardState={toggleCardState} 
                  />
              ))}
          </section>
      </div>
      {isPopupVisible && <Popup closePopup={hidePopup}/>}
    </div>
  );
}

export default Collection;
