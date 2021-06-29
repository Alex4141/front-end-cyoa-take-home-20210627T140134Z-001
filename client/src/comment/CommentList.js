import Comment from "./Comment";
import './CommentList.css';

function CommentList(props) {
    const { comments } = props;
    return <div className="commentList">
        <label className="float-left">Comments</label>
        <div className="commentList__div border border-2 d-flex flex-column align-items-center">
            { comments.map((comment) => <Comment key={comment.id} commentData={comment} />)}
        </div>
    </div>
}

export default CommentList;