const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('./config/key')

const app = express()

//连接数据库
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//配置
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//passport初始化
app.use(passport.initialize())
//把passport传进去，配置passport
require('./config/passport')(passport)

//引入rotes
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

//开放路径
app.use('/public', express.static(path.join(__dirname, '/public')))

//设置rotes
app.use(users)
app.use(profiles)

const port = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})