require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 2223

const app = express()

app.use(cors())
app.use(express.json())

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const genCodeRoute = require('./routes/generateCode')
const genCodeEncRoute = require('./routes/getCodeEnc')
const verifyTokenRoute = require('./routes/verifyAuthToken')



// Routes
app.use('/api', registerRoute)
app.use('/api', loginRoute)
app.use('/api', genCodeRoute)
app.use('/api', genCodeEncRoute)
app.use('/api', verifyTokenRoute)


app.get('/', (req, res) => {
    res.sendFile(path.join('client', 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Auth Server is running on port ${PORT}`))