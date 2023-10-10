import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function StickyHeader() {
  return (
    <>
      <Navbar style={{background: "linear-gradient(270deg,gold,blue,green)", animation: "2s infinite alternate linear"}} sticky="top">
          <div class="container" style={{marginLeft: "28%"}}>
            <a ><img
              src="https://cdn.pixabay.com/photo/2017/09/06/17/57/feedback-2722425_1280.jpg" width="600" height="50" /></a>
          </div>
      </Navbar>
      <br />
    </>
  );
}

export default StickyHeader;
