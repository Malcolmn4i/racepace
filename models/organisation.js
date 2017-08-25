'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema

const OrganisationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    }
}, { minimize: false });

OrganisationSchema.plugin(mongooseApiQuery)
OrganisationSchema.plugin(createdModified, { index: true })

const Organisation = mongoose.model('Organisation', OrganisationSchema)
module.exports = Organisation

