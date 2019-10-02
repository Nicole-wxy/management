const express = require('express')
const passport = require('passport')
const router = express.Router()

const Profile = require('../../models/Profile')

//添加资金数据
router.post('/api/profiles/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    new Profile({
        type: req.body.type,
        describe: req.body.describe,
        income: req.body.income,
        expend: req.body.expend,
        cash: req.body.cash,
        remark: req.body.remark
    }).save().then(profile => {
        res.status(200).json({
            err_code: 0,
            message: 'OK',
            result: {
                profile: profile
            }
        })
    })
})
//获取所有资金数据
router.get('/api/profiles/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then(profile => {
        if (!profile) {
            return res.status(200).json({
                err_code: 1,
                message: 'Not found.',
                result: ''
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'OK',
            result: {
                profiles: profile
            }
        })
    })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                message: err,
                result: ''
            })
        })
})
//获取单个资金数据
router.get('/api/profiles/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({
        _id: req.params.id
    }).then(profile => {
        if (!profile) {
            return res.status(200).json({
                err_code: 1,
                message: 'Not found.',
                result: ''
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'OK',
            result: {
                profile: profile
            }
        })
    })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                message: err,
                result: ''
            })
        })
})
//编辑资金数据
router.post('/api/profiles/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findByIdAndUpdate({
        _id: req.params.id
    }, req.body, { new: true }).then(profile => {
        res.status(200).json({
            err_code: 0,
            message: 'OK',
            result: {
                profile: profile
            }
        })
    })
})
//删除资金数据
router.delete('/api/profiles/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findByIdAndDelete({
        _id: req.params.id
    }).then(profile => {
        profile.save().then(profile => {
            res.status(200).json({
                err_code: 0,
                message: 'OK',
                result: {
                    profile: profile
                }
            })
        })
    })
        .catch(err => {
            res.status(200).json({
                err_code: 1,
                message: 'Delete failed.',
                result: ''
            })
        })
})
module.exports = router