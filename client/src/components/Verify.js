import React, { useState } from 'react'

function Verify() {
    const [code, setCode] = useState('')

    const verifyCode = ev => ev.preventDefault()

    return (
        <div className="container">
            <h1 className='mt-5 mb-3 text-center'>2F Varification</h1>
            <form className="d-flex flex-column justify-items-center align-items-center" onSubmit={verifyCode}>
                <div>
                    <div className="form-group">
                        <label htmlFor="code" className="form-label mt-2">Enter Your 2F Code</label>
                        <input type="text" className="form-control" max={6} id="code" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Verify</button>
                </div>

            </form>
        </div>
    )
}

export default Verify