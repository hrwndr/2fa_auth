import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="container text-center">
            <h1 className='my-5'>Generate 2FA Code</h1>
            <div className="d-flex flex-column justify-items-center align-items-center">
                <Link to="/login" className="btn btn-primary btn-lg">SIGN IN</Link>
                <span className="fw-bold my-3">OR</span>
                <Link to="/register" className="btn btn-success btn-lg">REGISTER</Link>
            </div>
        </div>
    )
}

export default Home