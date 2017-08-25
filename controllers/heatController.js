var Heat = require('../models/heat');

exports.getAllHeats = function(req, res, next) {
    Heat.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getHeatById = function(req, res, next) {
    Heat.findOne({ _id: req.params.heat_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()

    })
};

exports.createHeat = function(req, res, next){

    let data = req.body || {}
    let temp = new Heat(data)

    temp.save(function(err){
        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.json({success:true,message:"Heat created successfully", data : temp})
        next()
    })
}

exports.updateHeatById = function(req,res, next){

    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.heat_id
        })
    }

    Heat.findOne({ _id: req.params.heat_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    Heat.update({ _id: data._id }, data, function(err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.json({success:true,message:"Heat successfully updated", data : data})
            next()
        })
    })
}

exports.deleteHeatById = function(req,res, next){

    Heat.remove({ _id: req.params.heat_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.json({success:true,message:"Heat successfully removed"})
        next()
    })

}

