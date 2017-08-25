'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema
var 			ObjectId = Schema.ObjectId
var               TUser = require('./user')

const CarSchema = new mongoose.Schema({
    classId: {
        type: ObjectId
    },
    carNumber: {
        type: String
    },
    user: {
        type: TUser
    }
}, { minimize: false });


CarSchema.plugin(mongooseApiQuery)
CarSchema.plugin(createdModified, { index: true })

const Car = mongoose.model('Car', CarSchema)
module.exports = Car