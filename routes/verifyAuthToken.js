const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/verifyauthtoken', async (req, res) => {
    const { token } = req.body
    if (token != '') {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
                if (err) throw err;
                res.json({
                    status: 1,
                    message: 'Valid Token!!'
                })
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: 'Unknown Error!'
            })
        }
    }
})

module.exports = router