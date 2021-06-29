import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Api } from "../api/index";
import { useLocalStorage } from 'react-use';
import { useState } from 'react';
import './Submission.css';

function Submission() {
    const [name, setName] = useLocalStorage("name", "");
    const [comment, setComment] = useLocalStorage("comment", "");
    const [displayError, setDisplayError] = useState("");

    function submissisonIsValid(){
        return name !== "" && comment !== "";
    } 

    async function sendSubmission(){
        if(!submissisonIsValid()){
            const errorMsg = "Username and comment cannot be blank"; 
            setDisplayError(errorMsg); 
            return; 
        }

        if(displayError){ setDisplayError(""); }
        
        const body = {
            name,
            message : comment
        };

        try {
            await Api.post("createComment", body);
        } catch (err) {
            const errorMsg = "We couldn't submit your comment. Please try again later."
            setDisplayError(errorMsg)
        }
    }

    return <div className="d-flex flex-column align-items-center my-4">
        <div className="w-75">
            <label className="float-left">Username</label>
            <FormControl className="mb-3" aria-label="Username" maxLength="15" value={name} onChange={(e)=>setName(e.target.value)}></FormControl>
        </div>
        
        <div className="w-75">
            <label className="float-left">Comment</label>
            <FormControl as="textarea" className="mb-3 submission_commentTextArea" aria-label="Comment" value={comment} onChange={(e)=>setComment(e.target.value)}></FormControl>
        </div>
        
        <Button className="mw-100" aria-label="Submit Comment" variant="primary" onClick={sendSubmission}>Comment</Button>
        { displayError ? <small className="mt-4 text-muted float-left">{ displayError }</small> : "" }
    </div>;
}

export default Submission;