var TClass = require('../models/class');

exports.getAllClasses = function(req, res, next) {
    TClass.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getClassById = function(req, res, next) {
    TClass.findOne({ _id: req.params.class_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()

    })
};

exports.createClass = function(req, res, next){

    let data = req.body || {}
    let newClass = new TClass(data)

    newClass.save(function(err){
        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.json({success:true,message:"Class created successfully", data : newClass})
        next()
    })
}

exports.updateClassById = function(req,res, next){

    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.class_id
        })
    }

    TClass.findOne({ _id: req.params.class_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    TClass.update({ _id: data._id }, data, function(err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.json({success:true,message:"Class successfully updated", data : data})
            next()
        })
    })
}

exports.deleteClassById = function(req,res, next){

    TClass.remove({ _id: req.params.class_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.json({success:true,message:"Class successfully removed"})
        next()
    })

}




