const express = require('express')
const router = express.Router()
const axios = require('axios')
const { createUser } = require('../db/db')

router.post('/register', (req, res) => {
    const { email, password } = req.body
    if (email != '' && password != '') {

        axios.post(`${process.env.MAIN_SERVER_URL}/api/checkUser`, { email }).then(resp => {
            console.log(resp.data)
            if (resp.data.match == 1) {
                try {
                    createUser(email, password)
                    res.status(200).json({
                        status: 1,
                        message: "You are registered successfuly! 🥳"
                    })
                } catch (err) {
                    console.log(err)
                    res.status(400).json({
                        error: 1,
                        message: 'Something went wrong!'
                    })
                }
            } else {
                res.status(404).json({
                    error: 1,
                    message: "You are not registered on the main app."
                })
            }
        })
    }
})

module.exports = router