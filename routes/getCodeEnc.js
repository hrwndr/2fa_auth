const express = require('express')
const router = express.Router()
const { getCurrentCode } = require('../db/db')
const jwt = require('jsonwebtoken')


router.post('/verifyusing2fa', async (req, res) => {
    const { uid } = req.body
    if (uid != 0) {
        try {
            const result = await getCurrentCode(uid)
            if (result.length == 0) {
                res.status(400).json({
                    error: 1,
                    message: "Unable to change code!"
                })
            } else {
                const { code } = result[0]
                jwt.sign({ code }, process.env.JWT_SECRET_KEY, (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        status: 1,
                        token
                    })
                })
            }
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