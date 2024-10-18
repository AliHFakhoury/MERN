import React, { useState } from 'react';
import { InputContainer, Logo, ButtonWrapper, Button, Alert, Spacer } from '../../components'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    username: '',
    password: '',
};

const Login = () => {
    const [values, setValues] = useState(initialState);
    const tokenInStorage = localStorage.getItem('token')
    const navigate = useNavigate();
    
    const verifyToken = async (tokenInStorage) => {
        try{
            const request = await axios.post('http://localhost:5000/controller/user/verifyToken', {'token': tokenInStorage})
            if(request.status == 200){
                navigate("/companyDashboard")
            }
        } catch(error) {
            // console.log(error)
            console.log("Token unauthorized.")
            localStorage.removeItem('token')
            localStorage.removeItem('users')
        }
    }

    if(tokenInStorage){
        verifyToken(tokenInStorage)
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = values;

        const currentUser = {username, password}

        loginUser(currentUser);
    }

    const loginUser = async (currentUser) => {
        try {
            await axios.post('http://localhost:5000/controller/user/login', currentUser).then( (response) => {
                console.log(response.status)

                if(response.status != 200){
                    console.log("Login failed.")

                    return ;
                }else{
                    const {user, token} = response.data;
                    addUserToLocalStorage({user, token});
                    navigate('/companyDashboard')
                }

            });
        } catch (error){
            console.log(error.response);
        }
    }

    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    return (
        <div className='login-page-wrapper'>
            <div className='login-wrapper'>

                <Logo colour='blue'
                      maxSize='4rem'
                />
                <Spacer size="_07" />
                <h1>Welcome <span>Back</span> to <br/>Orogen Data</h1>
                <Spacer size="_06" />
                
                <InputContainer 
                    labelText='Username'
                    name='username'
                    type='text'
                    value={values.name}
                    handleChange={handleChange}
                    showRequired={false}
                    // required={true}
                />

                <InputContainer 
                    labelText='Password'
                    // labelLinkText='Forgot Password?' V1
                    name='password'
                    type='password'
                    value={values.password}
                    handleChange={handleChange}
                    showRequired={false}
                    required={true}
                    // labelLink={'link'}
                />

                <ButtonWrapper align={'right'}>
                    <Button 
                        buttonStyle={'button primary'}
                        text='Login'
                        onChange={onSubmit}
                    />
                </ButtonWrapper>
                
                {/* { showAlert && <Alert icon='Misuse' />}  */}
                {/* Alert value will be updated from App Contex} */}

            
                <Spacer size="_06" />
                <div>
                    No account? <a className='inline-link' target='_blank' href="https://www.orogentech.ca/sign-up">Sign-up for a free account</a>
                </div>
            </div>    
        </div>
    );
};

export default Login;