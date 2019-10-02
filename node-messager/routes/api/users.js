const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/key')

//注册账号
router.post('/api/users/register', (req, res) => {
    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .then(user => {
            if (user) {
                // 邮箱或者昵称已存在
                return res.status(200).json({
                    err_code: 1,
                    message: 'Email or username aleady exists.',
                    result: ''
                })
            } else {
                //密码加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) throw err
                        req.body.password = hash
                        new User(req.body).save()
                            .then(user => {
                                res.status(200).json({
                                    err_code: 0,
                                    message: 'OK',
                                    result: ''
                                })
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})
//登录账号
router.post('/api/users/login', (req, res) => {
    const password = req.body.password
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const rule = {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                avatar: user.avatar,
                                identity: user.identity
                            }
                            //规则，加密名字，过期时间，箭头函数 
                            jwt.sign(rule, keys.key, { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err
                                res.status(200).json({
                                    err_code: 0,
                                    message: 'OK',
                                    result: { token: 'Bearer ' + token }
                                })
                            })
                        } else {
                            return res.status(200).json({
                                err_code: 1,
                                message: 'Email or password is invalid.',
                                result: ''
                            })
                        }
                    })
            } else {
                return res.status(200).json({
                    err_code: 1,
                    message: 'Email or password is invalid.',
                    result: ''
                })
            }
        })
})
//获取当前账号信息
router.get('/api/users/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        err_code: 0,
        message: 'OK',
        result: {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username,
            avatar: req.user.avatar,
            identity: req.user.identity
        }
    })
})
module.exports = router