import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const userLogin = ev => {
        ev.preventDefault()
        if (error == '' && email !== '' && password !== '') {
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        alert(data.message)
                        localStorage.setItem('token', data.token)
                        clearFields()
                        return navigate(`/dashboard/${data.u}`)
                    }
                }).catch(err => console.log(err))
        }
    }

    const clearFields = () => {
        setEmail('')
        setPassword('')
    }


    return (
        <div className="container">
            <h1 className='mt-5 mb-3 text-center'>SIGN IN</h1>
            <form className="d-flex flex-column justify-items-center align-items-center" onSubmit={userLogin}>
                <div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="ex. john@joe.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-2">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Sign in</button>
                </div>

            </form>
        </div>
    )
}

export default Login