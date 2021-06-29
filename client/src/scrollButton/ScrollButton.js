import Button from 'react-bootstrap/Button';
import './ScrollButton.css';

function ScrollButton() {
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return <div className="scrollButton m-4">
        <Button aria-label="Scroll to top" className="btn btn-primary btn-lg scrollButton__btn" onClick={scrollToTop} >^</Button>
    </div>
}

export default ScrollButton;