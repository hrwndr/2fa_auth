const express = require('express')
const router = express.Router()
const { saveCode } = require('../db/db')

function generateCode() {
    var digits = 'ABCDEFGIJKLMN0123456789OPQRSTUVWXYZ';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 30)];
    }
    return OTP;
}


router.post('/generate', async (req, res) => {
    const generatedCode = generateCode()
    const { uid } = req.body
    if (uid != 0) {
        try {
            const result = await saveCode(uid, generatedCode)
            if (result.length == 0) {
                res.status(400).json({
                    error: 1,
                    message: "Unable to change code!"
                })
            } else {
                res.status(200).json({
                    status: 1,
                    message: "2FA Code updated successfuly! 🥳",
                    code: generatedCode
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