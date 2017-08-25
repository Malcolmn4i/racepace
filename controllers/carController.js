var TCar = require('../models/car');
var TUser = require('../models/user');

exports.getAllCars = function(req, res, next) {
    TCar.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getCarById = function(req, res, next) {
    TCar.findOne({ _id: req.params.car_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()
    })
};

exports.createCar = function(req, res, next){

    let data = req.body || {}
    let temp = new TCar(data)

    TUser.findOne({ _id: data.userId }, function(err, user) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }
        temp.user = user

        temp.save(function(err){
            if (err) {
                log.error(err)
                return next(new errors.InternalError(err.message))
                next()
            }

            res.json({success:true,message:"Class created successfully", data : temp})
            next()
        })        
    })
}

exports.updateCarById = function(req,res, next){

    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.car_id
        })
    }

    TCar.findOne({ _id: req.params.car_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    TCar.update({ _id: data._id }, data, function(err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.json({success:true,message:"Car successfully updated", data : data})
            next()
        })
    })
}

exports.deleteCarById = function(req,res, next){

    TCar.remove({ _id: req.params.car_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.json({success:true,message:"Car successfully removed"})
        next()
    })

}



