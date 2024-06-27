import './Banner.css';
import { Link } from "react-router-dom";

function Banner() {
    const title = 'Union Arena Cards';

    return (
        <header className='App-header'>
            <nav>
                <div className='clickable-section'><Link to="/collection">Collection</Link></div>
                <div className='clickable-section'><Link to="/cards_list">Cards List</Link></div>
                <div className='title'>{title}</div>
                <div className='clickable-section'><Link to="/information">Information</Link></div>
                <div className='clickable-section'><Link to="/account">My account</Link></div>
            </nav>
        </header>
    );
}

export default Banner;
