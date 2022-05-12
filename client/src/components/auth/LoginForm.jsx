
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext'

function LoginForm() {
    
    // Context
    const {loginUser} = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const {username, password} = loginForm;

    const onChangeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value})
    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            console.log(loginData)
        } catch (error) {
            console.log(error)
        }
        setLoginForm({username: '', password: ''})
    }
    return ( 
        <>
            <Form className="my-2" onSubmit={login}>
                <Form.Group className="mb-2">
                    <Form.Control type="text" value={username} onChange={onChangeLoginForm} placeholder="Username" name="username" required/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="password" value={password} onChange={onChangeLoginForm} placeholder="Password" name="password" required/>
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
        <p>Don't have account ?
            <Link to="/register"><Button variant='info' size="sm" className="ml-4" type='submit'>Register</Button></Link>
        </p>
    </>);
}

export default LoginForm;