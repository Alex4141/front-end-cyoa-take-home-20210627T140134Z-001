import { useReducer, useEffect } from 'react';

function commentsReducer(state=[], action){
    switch(action.type){
        case 'APPEND_COMMENT':
            return [action.payload, ...state];
        case 'SET_COMMENT_LIST':
            return [...action.payload];
        default:
            return state;
    }
}

function useComments(){
    const [comments, setComments] = useReducer(commentsReducer, []);

    useEffect(() => {
        const serverEventEndpoint = new EventSource("http://localhost:3001/stream");
        serverEventEndpoint.addEventListener('message', (e) => {
            appendComment(JSON.parse(e.data));
        });
    }, []);

    const appendComment = (comment) => { setComments({type : 'APPEND_COMMENT', payload : comment}) };
    const setCommentList = (comments) => { setComments({type : 'SET_COMMENT_LIST', payload : comments}) };
    return [comments, appendComment, setCommentList];
}

export default useComments;