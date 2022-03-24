const express = require('express')
const router = express.Router()
const { loginUser } = require('../db/db')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email != '' && password != '') {
        try {
            const result = await loginUser(email, password)
            if (result.length == 0) {
                res.status(400).json({
                    error: 1,
                    message: "Invalid Username or Password!"
                })
            } else {
                const { id } = result[0]

                jwt.sign({ id }, process.env.JWT_SECRET_KEY, (err, token) => {
                    if (err) throw err
                    res.status(200).json({
                        status: 1,
                        message: "You are logged in successfuly! 🥳",
                        u: id,
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