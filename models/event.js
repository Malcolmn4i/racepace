'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema
var               Class = require('./class')
var 			ObjectId = Schema.ObjectId;

const EventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    },
    startTime: {
        type: String
    },
    organisationId: {
        type: ObjectId,
        require: true
    },
    classes: { type : Array , "default" : [] }
}, { minimize: false });


EventSchema.plugin(mongooseApiQuery)
EventSchema.plugin(createdModified, { index: true })

const Event = mongoose.model('Event', EventSchema)
module.exports = Event