const express = require('express')
const config = require('config')
const serverInit = require('./config/serverInit')

const app = express()

app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/users'))
app.use('/api/activities', require('./routes/activities'))

serverInit()

const PORT = config.get('port') || 5000
app.listen(PORT, () => console.log(`App has been started on PORT ${PORT}`))