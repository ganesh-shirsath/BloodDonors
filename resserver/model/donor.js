const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Donor Schema
const DonorSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    occupation: {
        type: String
    },
    maratial_status: {
        type: String
    },
    dob: {
        type: Date
    },
    blood_group: {
      type: String
    },
    donation_date: {
      type: Date
    },
    isRecentDonor: {
      type: Boolean
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    }
},
    {collection:'Donors'}
);

const Donor = module.exports = mongoose.model('Donor',DonorSchema);

module.exports.getDonorById = function(id, callback) {
    Donor.findById(id, callback);
}

module.exports.getDonorByName = function(donorname, callback) {
    const query = {first_name: donorname}
    Donor.findOne(query, callback);
}

module.exports.addDonor = function(newDonor, callback) {
    newDonor.save(callback);
}

module.exports.searchDonors = function(queryParams, callback) {
    var populate = [{path: 'contact' }];
    var query = {};
    if(queryParams && queryParams.bloodGroup && queryParams.bloodGroup !== 'undefined') {
        console.log("Blood group......:"+queryParams.bloodGroup)
        query['blood_group'] = queryParams.bloodGroup.trim();
    }

    if(queryParams && queryParams.city &&  queryParams.city !== 'undefined') {
        console.log("City...////////////////////////////////////////////////...:query.............................")
        //(queryParams && queryParams.city) ? query['contact.city'] = queryParams.city.trim() : query['contact.city'] = undefined;
        //donorsResult = donorsResult.find({"contact.city":queryParams.city.trim()});
        //query["contact.city"] = queryParams.city.trim();
    }

        (queryParams && (queryParams.isRecentDonor == 'true' || queryParams.isRecentDonor == 'false')) ?
        query['isRecentDonor'] = JSON.parse(queryParams.isRecentDonor) :
        query['isRecentDonor'] = false;

    console.log("------------------------")
    console.log(query)
    console.log("------------------------")

    var donorsResult = Donor.find(query).populate(populate);
    donorsResult.skip(Number(queryParams.donorSkip)).limit(Number(queryParams.donorLimit));
    donorsResult.exec(callback);
}



