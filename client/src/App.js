import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Api } from "./api/index";

import Submission from './submission/Submission';
import CommentList from './comment/CommentList';
import useComments from './comment/useComments';
import ScrollButton from './scrollButton/ScrollButton';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  
  const [comments, appendComment, setComments ] = useComments();
  const {ref, inView, entry} = useInView({ threshold: 0 });  

  async function fetchComments(){
    try {
      const results = await Api.get("/getComments");
      setComments(results.reverse());
    } catch (err) {}  
  };

  useEffect(() => {
    fetchComments(); 
  }, []);
  
  return (
    <Container>
      <Row>
        <Col ref={ref} lg={6}>
          <Submission appendComment={appendComment} />
        </Col>
        <Col lg={6}>
          <CommentList comments={comments} />
        </Col>
      </Row>
      { (!inView && comments.length) ? <ScrollButton /> : "" }
    </Container>
  );
}

export default App;
