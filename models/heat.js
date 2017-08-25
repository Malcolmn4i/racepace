'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema

const HeatSchema = new mongoose.Schema({
    name: {
        type: String
    },
    driverInfo: new mongoose.Schema({ 
    	pullArray: {
    		type : Number
    	}, 
    	result: new mongoose.Schema({
    		position: {
    			type:String
    		},
    		points:{
    			type: String
    		}
    	})
    })
}, { minimize: false });

HeatSchema.plugin(mongooseApiQuery)
HeatSchema.plugin(createdModified, { index: true })

const Heat = mongoose.model('Heat', HeatSchema)
module.exports = Heat