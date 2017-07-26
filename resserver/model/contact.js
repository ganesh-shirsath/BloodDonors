const mongoose = require('mongoose');

//Contact Schema
const ContactSchema = mongoose.Schema({
    city: {
        type: String
    },
    state: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    }
},
    {collection:'Contacts'}
);

const Contact = module.exports = mongoose.model('Contact',ContactSchema);
