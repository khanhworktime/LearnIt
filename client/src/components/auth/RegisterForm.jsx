
import {Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext'

function RegisterForm() {
     const {registerUser} = useContext(AuthContext);
     const [registerForm, setRegisterForm] = useState({
         username: "",
         password: "",
         rePassword: ""
     })

     const {username, password, rePassword} = registerForm;

     const formChange = (e) => {
         setRegisterForm({...registerForm, [e.target.name]: e.target.value})
     }

     const register = async (e) => {
        e.preventDefault();

        if(password === rePassword) {
            try {
                const registerData = await registerUser(registerForm);
                console.log(registerData)
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    return ( 
        <>
            <Form className="my-2" onSubmit={register}>
                <Form.Group className="mb-2">
                    <Form.Control type="text" value={username} onChange={formChange} placeholder="Username" name="username" required/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="password" value={password} onChange={formChange} placeholder="Password" name="password" required/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="password" value={rePassword} onChange={formChange} placeholder="Re-enter password" name="rePassword" required/>
                </Form.Group>
                <Button variant='success' type='submit'>Register</Button>
            </Form>
        <p>Already have an account?
            <Link to="/login"><Button variant='info' size="sm" className="ml-2" type='submit'>Login</Button></Link>
        </p>
    </>);
}

export default RegisterForm;