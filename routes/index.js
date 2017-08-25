'use strict'

/**
 * Module Dependencies
 */
const _      = require('lodash'),
      errors = require('restify-errors'),
      config     = require('../config/config'),
      User = require('../models/user'),
      UserController = require('../controllers/userController'),
      EventController = require('../controllers/eventController'),
      OrganisationController = require('../controllers/organisationController'),
      ClassController = require('../controllers/classController'),
      HeatController = require('../controllers/heatController'),
      CarController = require('../controllers/carController')

var passport = require('passport')
var Strategy = require('passport-http').BasicStrategy
var users = require('../db')

passport.use(new Strategy(function(username, password, cb) {
	User.findOne({ userName: username }, function(err, user) {
	  if (err) {
	  	log.error(err);
	  	return cb(err); 
	}
      else if (!user) { 
		var map = {
			success : false,
			"msg" 	: "User not found"
		};
      	return cb(null, "No User found"); 
      }
      else{
        user.comparePassword(password, function(err, isMatch){
        	if (isMatch && !err) { return cb(null, user) }
        	else{ 
        			var map = {
        				success : false,
        				"msg" : "User not found"
        			};
        			return cb(null, map)
        		}
        })
      }
	})
}));

server.post("/",function(req, res, next) {
	res.json({success:true, "message": "Hello! The Racebook API is at http://127.0.0.1:8081"})
})

server.get("/secret", passport.authenticate("basic", { session: false }), function(req, res){
	res.json({success: true, message : req.user})
})

//user routes
server.post('/user/createUser', UserController.createUser)
server.get('/user/getAllUsers', UserController.getAllUsers)
server.get('/user/getUser/:user_id',passport.authenticate("basic", { session: false }) , UserController.getUserById)
server.put('/user/updateUser/:user_id',passport.authenticate("basic", { session: false }), UserController.updateUserById)
server.del('/user/removeUser/:user_id',passport.authenticate("basic", { session: false }) ,UserController.deleteUserById)


//Organisations
server.get('/organisation/getAllOrganisations', OrganisationController.getAllOrganisations)
server.get('/organisation/getOrganisation/:organisation_id',OrganisationController.getOrganisationById)
server.post('/organisation/createOrganisation', OrganisationController.createOrganisation)
server.put('/organisation/updateOrganisation/:organisation_id', OrganisationController.updateOrganisationById)
server.del('/organisation/removeOrganisation/:organisation_id',OrganisationController.deleteOrganisationById)


//Classes
server.get('/class/getAllClasses', ClassController.getAllClasses)
server.get('/class/getClass/:class_id', ClassController.getClassById)
server.post('/class/createClass', ClassController.createClass)
server.put('/class/updateClass/:class_id', ClassController.updateClassById)
server.del('/class/removeClass/:class_id' ,ClassController.deleteClassById)


//Heats
server.get('/heat/getAllHeats', HeatController.getAllHeats)
server.get('/heat/getHeat/:heat_id',HeatController.getHeatById)
server.post('/heat/createHeat', HeatController.createHeat)
server.put('/heat/updateHeat/:heat_id', HeatController.updateHeatById)
server.del('/heat/removeHeat/:heat_id',HeatController.deleteHeatById)


//Events
server.get('/event/getAllEvents', EventController.getAllEvents)
server.get('/event/getEvent/:event_id',EventController.getEventById)
server.post('/event/createEvent', EventController.createEvent)
server.put('/event/updateEvent/:event_id', EventController.updateEventById)
server.del('/event/removeEvent/:event_id' ,EventController.deleteEventById)


//Cars
server.get('/car/getAllCars', CarController.getAllCars)
server.get('/car/getCar/:car_id',CarController.getCarById)
server.post('/car/createCar', CarController.createCar)
server.put('/car/updateCar/:car_id', CarController.updateCarById)
server.del('/car/removeCar/:car_id' ,CarController.deleteCarById)



