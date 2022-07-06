import react, { useEffect, useState } from 'react';
import '../auth.css';
import GoogleLoginBtn from '../GoogleLoginLogout/GoogleLogin/GoogleLogin';
import FormInput from '../inputs/RegisterFormInput';
import { Link } from 'react-router-dom';

function App() {
    const [emty, isEmty] = useState(false);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            label: 'Username',
            placeholder: "Ex: Vu Hong Quan",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special characters.",
            regex: /^[A-Za-z0-9]{3,16}$/.test(values.username)
        },
        {
            id: 2,
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: "Ex: email@domain.com",
            errorMessage: 'It should be a valid email address.',
            regex: /\S+@\S+\.\S+/.test(values.email)
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: "Enter password",
            errorMessage: 'Password should be 8-30 characters and include at least 1 letter and 1 number.',
            regex: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(values.password)
        },
        {
            id: 4,
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            placeholder: "Confirm Password",
            errorMessage: "Password don't match",
            regex: values.confirmPassword === values.password,
        }
    ];

    function onChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (values.username === '' || values.email === '' || values.password === '' || values.confirmPassword === '') {
            isEmty(true)
            return
        }
        console.log(values);

    }
    const [childData, setChildData] = useState("");
    console.log(childData);
    return (
        <div className="register">
            <form method="POST" className="form" id="form-1">
                <p className='login-title'>Register</p>
                {inputs.map((input, index) => {
                    return (<FormInput
                        key={input.id}
                        {...input}
                        regex={input.regex}
                        value={values[input.name]}
                        onChange={onChange}
                    />)
                })}
                <button className="form-submit" onClick={(e) => handleSubmit(e)} >Register</button>
                {emty && <p className='form-message'>* Please fill all fields</p>}
                <span className='or-login'>Already have an account?
                    <Link className='link' to='/login'> Login now</Link>
                </span>
                <div className='or'>
                    <span>or</span>
                </div>
                <div className='google-login'>
                    <GoogleLoginBtn
                        passChildData={setChildData}
                    />
                    <div>
                        <p>{childData.email}</p>
                        <p>{childData.name}</p>
                        <p>{childData.googleId}</p>
                    </div>
                    {/* <GoogleLogoutBtn /> */}
                </div>

            </form>

        </div>
    );
}

export default App;
