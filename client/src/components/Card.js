import './Card.css';

function Card({ card, toggleCardState }) {
    return (
        <div className={`Card ${card.obtained ? 'obtained-card' : 'unobtained-card'}`} >
            <div className='image-container'>
                <img 
                    alt='dummy card' 
                    src={ require('../EX01BT_HTR-2-015_p1.jpg') } 
                    onClick={() => toggleCardState(card.id)}
                    draggable='false'
                />
            </div>
            <h3 className='card-title'>EX01BT/HTR-2-015</h3>
        </div>
    );
}

export default Card;
