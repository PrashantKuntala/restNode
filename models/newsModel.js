const mongoose = require('mongoose');

// there are many validations that mongoose handles for you, might want to read the documentation.
// each news item contains few samples, below sample takes only one sample, you might want to read
// the documentation for mongoose and change it to a list
const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sample : {type : mongoose.Schema.Types.ObjectId, ref:'Sample' , required : true},
    sampleCount : {type : Number, default: 1}
});

module.exports = mongoose.model('News',newsSchema);