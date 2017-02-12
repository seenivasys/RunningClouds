var mongoose = require('mongoose');

module.exports = mongoose.model('Marathons', {
    name: {
        type: String,
        default: ''
    },
    city:String,
    state:String,
    zipCode:String,
    latitude:Number,
    longitude:Number,
    dateMarathon: Date

});