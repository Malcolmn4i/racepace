'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema
var             ObjectId = Schema.ObjectId
var             TCar = require('./car')

//Mongoose will create _id automatically

//UserType 0:driver 1:Spectator 2:Admin
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require:true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: Number
    },
    number: {
        type: String
    },
    championshipPoints: {
        type: Number
    },
    currentEvent: {
        type : ObjectId
    },
    organisationId: {
        type: ObjectId
    },
    cars: { type : Array , "default" : [] },
}, { minimize: false });


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
})
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

UserSchema.plugin(mongooseApiQuery)
UserSchema.plugin(createdModified, { index: true })


const User = mongoose.model('User', UserSchema)
module.exports = User

