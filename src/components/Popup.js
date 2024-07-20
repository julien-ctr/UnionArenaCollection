import React, {useState} from 'react';
import './Popup.css';

function Popup({closePopup}) {
    return (
      <div className='Popup'>
        <svg viewBox="0 0 10 10" width="1.75em" height="1.75em" stroke="black" strokeWidth="2" className='close-button' onClick={closePopup}>
          <line x1="1" y1="1" x2="9" y2="9" />
          <line x1="9" y1="1" x2="1" y2="9" />
        </svg>
      </div>
    );
  }
  
  export default Popup;
  