'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema

const ClassSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
    	type : String
    }
}, { minimize: false });

ClassSchema.plugin(mongooseApiQuery)
ClassSchema.plugin(createdModified, { index: true })

const Class = mongoose.model('Class', ClassSchema)
module.exports = Class