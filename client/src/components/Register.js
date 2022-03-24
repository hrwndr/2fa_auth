import React, { useEffect, useState } from 'react'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpass, setCpass] = useState('')
    const [cpassError, setCpassError] = useState('')

    useEffect(() => {
        if (cpass !== password) {
            setCpassError('Passwords do not match!')
        } else {
            setCpassError('')
        }
    }, [cpass])

    const registerUser = ev => {
        ev.preventDefault()
        if (cpassError == '' && email != '' && password != '') {
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
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
                        clearFields()
                    }
                }).catch(err => console.log(err))
        }
    }

    const clearFields = () => {
        setEmail('')
        setCpass('')
        setPassword('')
        setCpassError('')
    }

    return (
        <div className="container">
            <h1 className='mt-5 mb-3 text-center'>REGISTER</h1>
            <form className="d-flex flex-column justify-items-center align-items-center" onSubmit={registerUser}>
                <div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label mt-2">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="ex. john@doe.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-2">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword" className="form-label mt-2">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" value={cpass} onChange={e => setCpass(e.target.value)} placeholder="Confirm Password" required />
                        <small className="text-danger fw-bold">{cpassError}</small>
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Register</button>
                </div>

            </form>
        </div>
    )
}

export default Register