const mongoose = require('mongoose');


const Location = mongoose.model('Location');
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.createLocation = async function(req, res) {
    try {
        const location = await Location.create({
            name: req.body.name,
            address: req.body.address,
            rating: req.body.rating || 0, // Default rating is 0 if not provided
            facilities: req.body.facilities ? req.body.facilities.split(',') : [],
            coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
            openingTimes: [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1 === 'true' // Convert string to boolean
            }],
         });
        res.status(201).json( location); // Send back the created location data
    } catch (err) {
        res.status(400).json(err); // Send error response
    }
};






module.exports.locationsListByDistance = function (req, res) {
    sendJsonResponse(res, 200, { "status": "successeee" });
};

module.exports.locationsReadOne = async function (req, res) {
    // Check if the location ID is provided in the URL parameters
    if (req.params && req.params.locationid) {
        try {
            // Find the location by its ID
            const location = await Location.findById(req.params.locationid);
            
            if (!location) {
                // If no location is found, send a 404 response
                return res.status(404).json({ "message": "Location not found" });
            }
            
            // If a location is found, send it as the response
            res.status(200).json(location);
        } catch (err) {
            // If there's an error during the database query, send a 400 response
            res.status(400).json(err);
        }
    } else {
        // If no location ID is provided, send a 400 response
        res.status(400).json({ "message": "No locationid in request" });
    }
};

module.exports.locationsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "successeee" });
};

module.exports.locationsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "successeee" });
}