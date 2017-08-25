
'use strict'

/**
 * Module Dependencies
 */
var     Config        = require('./config/config'),
        config = new Config();
var     restify       = require('restify')
var     bunyan        = require('bunyan')
var     winston       = require('winston')
var     bunyanWinston = require('bunyan-winston-adapter')
var     mongoose      = require('mongoose')
var     passport      = require('passport')
var     passportJWT   = require("passport-jwt")
var     jwt           = require('jwt-simple')
var 	express		  = require('express')
var 	passport      = require('passport')
var 	Strategy 	  = require('passport-http').BasicStrategy
var 	db 		      = require('./db')

var cron = require('node-schedule');

/**
 * Logging
 */
global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString()
            },
            json: true
        }),
    ]
})

/**
 * Initialize Server
 */
global.server = restify.createServer({
    name    : config.name,
    version : config.version,
    log     : bunyanWinston.createAdapter(log),
})

/**
 * Middleware
 */
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
    log.error(err.stack)
    res.send(err)
});

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

    mongoose.connection.on('error', function(err) {
        log.error('Mongoose default connection error: ' + err)
        process.exit(1)
    })

    mongoose.connection.on('open', function(err) {

        if (err) {
            log.error('Mongoose default connection error: ' + err)
            process.exit(1)
        }


        log.info(
            '%s v%s ready to accept connections on port %s in %s environment.',
            server.name,
            config.version,
            config.port,
            config.env
        )

        require('./routes')

    })

    global.db = mongoose.connect(config.db.uri)

})


