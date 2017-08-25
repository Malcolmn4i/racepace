var Organisation = require('../models/organisation');

// Display list of all Organisations
exports.getAllOrganisations = function(req, res, next) {
    Organisation.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getOrganisationById = function(req, res, next) {
    Organisation.findOne({ _id: req.params.organisation_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()
    })
};

exports.createOrganisation = function(req, res, next){

    let data = req.body || {}
    let newOrgan = new Organisation(data)

    newOrgan.save(function(err){
        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.json({success:true,message:"Organisation created successfully", data : newOrgan})
        next()
    })
}

exports.updateOrganisationById = function(req,res, next){

    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.organisation_id
        })
    }

    Organisation.findOne({ _id: req.params.organisation_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    Organisation.update({ _id: data._id }, data, function(err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.json({success:true,message:"Organisation successfully updated", data : data})
            next()
        })
    })
}

exports.deleteOrganisationById = function(req,res, next){

    Organisation.remove({ _id: req.params.organisation_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.json({success:true,message:"Organisation successfully removed"})
        next()
    })

}
