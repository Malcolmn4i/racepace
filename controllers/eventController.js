var Event = require('../models/event');
var TClass = require('../models/class');

// Display list of all Events
exports.getAllEvents = function(req, res, next) {
    Event.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

// Display Event by id
exports.getEventById = function(req, res, next) {
	Event.findOne({ _id: req.params.event_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()
    })
}

exports.createEvent = function(req, res, next){

    let data = req.body || {}
    let event = new Event(data)

    TClass.find({}, function(err, docs) {
        if (!err){ 
            event.classes = docs

            event.save(function(err) {
                if (err) {
                    log.error(err)
                    return next(new errors.InternalError(err.message))
                    next()
                }

                res.json({success:true,message:"Event created successfully", data : event})
                next()
            })
        } else {throw err;}
    })
}

exports.updateEventById = function(req,res, next){

    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.event_id
        })
    }

    Event.findOne({ _id: req.params.event_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    Event.update({ _id: data._id }, data, function(err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.json({success:true,message:"Event successfully updated", data : data})
            next()
        })
    })
}

exports.deleteEventById = function(req,res, next){

    Event.remove({ _id: req.params.event_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.json({success:true,message:"Event successfully removed"})
        next()
    })

}





