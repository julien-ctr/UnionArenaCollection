import './Banner.css';

function Banner() {
    const title = 'Union Arena Cards';

    return (
        <header className='App-header'>
            <div className='clickable-section'>Collection</div>
            <div className='clickable-section'>Cards List</div>
            <div className='title'>{title}</div>
            <div className='clickable-section'>Information</div>
            <div className='clickable-section'>My account</div>
        </header>
    );
}

export default Banner;
