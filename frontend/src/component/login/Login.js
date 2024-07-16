import {React , useState} from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Login.css";
import axios from 'axios';
import Footer from '../../common/Footer';


function Login() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const[user, setUser] = useState([]);
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/v1.0/moviebooking/login", {
           
            loginId: loginId,
            password: password,
            }).then((res) => 
            
            {
             if(res.data.roles.toString() === "ROLE_ADMIN"){
                console.log(res.data);
             //const { token } = res.data.accessToken;
             //console.log(token)
             localStorage.setItem('accessToken', res.data.accessToken);
             localStorage.setItem('loginId', res.data.userName);
             console.log(localStorage)
             navigate('/home');
             }else{
                 console.log(res.data);
            //  //const { token } = res.data.accessToken;
            //  //console.log(token)
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('loginId', res.data.userName);
            console.log(localStorage)
                navigate('/userHome')
             }
          });
}catch(error){
    if(loginId === "" && password === ""){
        alert("Enter UserName And Password");
     }else if(password === ""){
        alert("Enter Password")
     }else if(loginId === ""){
        alert("Enter Username")
     }
     else{
        alert("Username or Password is Incorrect");
     }
}
}

const forgotPasswordPage = async(event) => {
    event.preventDefault();
    if(loginId === ''){
        alert("Please Enter Your LoginID to change Password")
    }else{
        try{
            const response = await axios.get('http://localhost:8080/api/v1.0/moviebooking/users');
            const data = response.data;
            const user = data.flatMap((users) => users.loginId);
            setUser(user.toString())
            console.log(user.toString())
        }catch(error){
            alert(error)
        }
        if(user.includes(loginId)){
            <Link to={`/resetPassword/${loginId}`}></Link>
        }else{
            alert("Your UserName Is Not Registered")
        }
    }
}

    return(
        <main>
            <Container>
                <div className='login-container'> 
                    
               
                <Form className='login-form'>
                <h2>Login Into Account</h2>
                    <Form.Group  controlId='loginId'  >
                        <Form.Label column sm='2'> LoginID/UserName: </Form.Label>
                        
                        <Form.Control
                        type='loginId'
                        placeholder='Enter Username'
                        value={loginId}
                        onChange={(event) => {
                            setLoginId(event.target.value);
                        }}
                        required
                        ></Form.Control>
                        
                    </Form.Group>
                    <Form.Group   controlId='password' >
                        <Form.Label> Password: </Form.Label>
                        
                        <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}></Form.Control>
                        
                    </Form.Group>

                    <div className='button-group'>
                    <Button    type='submit' onClick={login} > Log In</Button>
                    <Button    type='button' onClick={(event) => {
                         navigate("/")
                    }}> Create An Account</Button>
                    <Button type='button' onClick={() => {
                        navigate('/resetPassword')
                    }}>Forgot Password ?</Button>
                    </div>
                </Form>
                </div>
            </Container>
            {/* <Footer/> */}
        </main>
    )
}

export default Login;