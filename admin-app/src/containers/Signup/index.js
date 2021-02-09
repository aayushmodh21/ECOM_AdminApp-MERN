import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../actions'

/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName, lastName, email, password
    }

    dispatch(signup(user));
  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }
  if(user.loading){
    return <p>Loading...!</p>
  }


  return (
    <Layout>
      <Container>

      <p className="text-center">{ user.message }</p>
      
        <Row style={{marginTop: '150px'}}>
          <Col md={{span: 6, offset: 3}}>

            <Form onSubmit={userSignup}>

              <Row>
                <Col md={6}>
                  <Input 
                    label= "First Name"
                    placeholder= "Enter First Name"
                    value= {firstName}
                    type= "text"
                    onChange= {(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input 
                    label= "Last Name"
                    placeholder= "Enter Last Name"
                    value= {lastName}
                    type= "text"
                    onChange= {(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input 
                label= "Email"
                placeholder= "Enter Email"
                value= {email}
                type= "email"
                onChange= {(e) => setEmail(e.target.value)}
                errormessage="We'll never share your email with anyone else."
              />

              <Input 
                label= "Password"
                placeholder= "Enter Password"
                value= {password}
                type= "password"
                onChange= {(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>

            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>
  )

}

export default Signup