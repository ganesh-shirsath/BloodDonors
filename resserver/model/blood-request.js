const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Blood request schema
const BloodReqSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    req_group: {
        type: String
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {collection:'BloodRequests'}
);

const BloodRequest = module.exports = mongoose.model('BloodRequest',BloodReqSchema);

module.exports.createBloodRequest = function(newBloodReq, callback) {
    newBloodReq.save(callback);
}

module.exports.getBloodRequestById = function(id, callback) {
    BloodRequest.findById(id, callback);
}

module.exports.addComment = function(bloodReqId, commentId, callback) {
    BloodRequest.update({"_id":bloodReqId},{"$addToSet":{comments:commentId}}, callback);
}

module.exports.getBloodRequests = function(callback) {
    BloodRequest.find({},callback);
}