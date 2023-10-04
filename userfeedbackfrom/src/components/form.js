import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import SpeechRecognitionComponent from './speechrecognition';

function FeedbackForm() {
    const [displayform, setDisplay] = useState(true)
    const [em_value, setEmValue] = useState('')
    const [nm_value, setNmValue] = useState('')
    const [feed_value, setFeedValue] = useState('')

    const [error_msg, setErrorMsg] = useState('Please enter the value for the above field');


    const validateForm = ()=>{
        setErrorMsg('Please enter the value for the above field');

        [...document.getElementsByClassName('alert-danger')].forEach(element => {
            element.style.display = "none";
        });
        if(nm_value===''){
            document.getElementById('name_er').style.display = "block";
        }
        else if(em_value===''){
            document.getElementById('email_er').style.display = "block";
        }
        else if(!em_value.includes('.com')||(!em_value.includes('@'))){
            document.getElementById('email_er').style.display = "block";
            setErrorMsg('Invalid Email')
        }
        else if(feed_value===''){
            document.getElementById('feedback_er').style.display = "block";
        }
        else return true;
    };
    
    const formSubmit = (e) =>{
        e.preventDefault();

        if (validateForm())
        {
            var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
            var new_id = 0;
            if(existingEntries == null) existingEntries = [];
            else{
                let lastentry = existingEntries.slice(-1)[0]
                new_id = parseInt(lastentry["id"]) + 1;
            }
            var entry = {
                "id": new_id, 
                "email": em_value,
                "name": nm_value,
                "feedback": feed_value
            };
            // Save allEntries back to local storage
            existingEntries.push(entry);
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
            setDisplay(false)
        }
        
    };
    
    return (
        <Container>
            {displayform ? 
            (<Card>
                <Card.Header>
                    <cite title="Source Title">We are committed to providing you with the best
                        product experience possible, so we welcome your comments.
                    </cite>
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    Please fill out this questionnaire. 
                    </blockquote>
                    
                </Card.Body>
                <Container className='padding30px'>
                    <Form>
                        <Row>
                            <Col>
                                
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="E.g. jon snow" value={nm_value} onChange={e => setNmValue(e.target.value)} />
                                    
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="E.g. abc@gmail.com" value={em_value} onChange={e => setEmValue(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col><SpeechRecognitionComponent/></Col>
                        </Row> */}
                        
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Please enter your valuable feedback, so we can serve you much more better next time</Form.Label>
                                    <Form.Control type="email" placeholder="E.g. It is good" value={feed_value} onChange={e => setFeedValue(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className='btn_purp' onClick={e=>formSubmit(e)}>Submit Review</Button>
                    </Form>
                </Container>
            </Card>
            ):(
                <Card bg='light' text='dark'>
                    <Card.Body>
                        <div  className='padding30px'>
                            <div class="circle">
                            <div class="checkmark"></div>
                            </div>
                        </div>
                        <Card.Text>
                            Thank you for providing the feedback
                        </Card.Text>
                        <Form.Text muted>
                            We will work towards improving your experience
                        </Form.Text>
                        <div className='padding30px'>
                            <Button className='btn_purp' onClick={()=>window.location.href='/submissions'}>Close</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
            
        </Container>
    );
}

export default FeedbackForm;