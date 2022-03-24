import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


function Dashboard() {
    const [code, setCode] = useState('')
    const [msg, setMsg] = useState({
        type: '',
        msg: '',
        view: 'none'
    })

    let { uid } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        generateNewCode()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => generateNewCode(), 1000 * 100)
        return () => clearInterval(intervalId)
    }, [])

    const verifyAuthToken = () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            const token = localStorage.getItem('token')
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/verifyauthtoken`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    token
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        navigate('/login')
                    }
                }).catch(err => navigate('/login'))
        }
    }

    const generateNewCode = () => {
        console.log('generating new code..')
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setCode(data.code)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container text-center">
            <h1 className='my-5'>2FA Verification Code</h1>
            <div className="d-flex flex-column justify-items-center align-items-center">
                <h2>{code}</h2>
                <p className="my-3">⏱️ This code will change automatically after 100 secs and won't be valid after that.</p>
                <button className="btn btn-danger">Log Out</button>
            </div>
        </div>
    )
}

export default Dashboard