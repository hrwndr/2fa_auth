import React from 'react'
import { Link } from 'react-router-dom'

function Match() {
    return (
        <div className="container">
            <div className="text-center my-5">
                <h3>404! Not Found</h3>
                <Link to="/">Back Home</Link>
            </div>
        </div>
    )
}

export default Match