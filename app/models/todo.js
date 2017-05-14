var mongoose = require('mongoose');

module.exports = mongoose.model('Marathons', {
    name: {
        type: String,
        default: 'Half Marathon'
    },
    city:String,
    state:String,
    zipCode:String,
    latitude:Number,
    longitude:Number,
    dateMarathon: Date

});