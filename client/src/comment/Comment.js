import { parseDate } from '../utils/DateHelpers';
import './Comment.css';

function Comment(props) {
    
    const { commentData : { name, message, created } } = props;

    return <div className="comment border border-2 d-flex flex-column align-items-center my-4 w-75">
        <div className="w-100 px-3 py-1 text-break">
            {message}
        </div>
        <div className="border-top border-2 w-100 px-3 py-1 text-break">
            {name} on { parseDate(created) }
        </div>
    </div>;
}

export default Comment;