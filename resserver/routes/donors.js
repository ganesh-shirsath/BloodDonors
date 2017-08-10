const express = require('express');
const router = express.Router();

const Donor = require('../model/donor');
const ContactModel = require('../model/contact');


//Get donor by id
router.get('/donor',(req, res, next)=>{
    console.log("Req params", req.query)
    Donor.getDonorById(req.query.id, (err, donor) =>{
        if(err) {
            console.log("Error........Get Donor",err);
            res.json({success:false, msg:"Faild to retrive donor."})
        }
        else {
            console.log("Donor found-->",donor);
            res.json({success:true, donor:donor,msg:"Donor successfully found."});
        }
    })
})

//Search Donors
router.get('/search',(req, res, next)=>{
    console.log("Req params............................");
    console.log(req.query);
    console.log("Req params.................................");
    Donor.searchDonors(req.query,(err, donors) =>{
        if(err) {
            console.log("Error.......Search",err)
            res.json({success:false, msg:"Failed to retrive donors."});
        }
        else {
            console.log("Search result...",donors)
            if(donors.length > 0 && req.query.city !== 'undefined') {
                donors = donors.filter(function(doc){
                    return doc.contact.city === req.query.city.trim();
                })
            }
            res.json({success:true, donors:donors,msg:"Donors successfully found."});
        }
    })
});

//Register Donor
router.post('/register', (req, res, next)=>{
    console.log("req.body.username",req.body)

    const contactInstance = new ContactModel({
        city: req.body.city,
        state: req.body.state,
        email:  req.body.email,
        mobile: req.body.mobile
    })

    contactInstance.save((error, contact) =>{
        if(error) {
            console.log("error......",error)
            res.json({success:false, msg:"Failed to save donor contact details"})
        }
        else {
            console.log("Contact......",contact)
            //const queryParam = req.body.q
            let newDonor = new Donor({
                first_name: req.body.fname,
                last_name: req.body.lname,
                occupation: req.body.occupation,
                maratial_status: req.body.mstatus,
                dob: new Date(req.body.dob.formatted),
                blood_group: req.body.bgroup,
                donation_date: new Date(req.body.ddate.formatted),
                isRecentDonor: req.body.isRecentDonor,
                contact: contact._id
            });


            Donor.addDonor(newDonor, (err, donor)=> {
                if(err) {
                    console.log("err......",err)
                    res.json({success:false, msg:"Failed to register user"})
                }
                else {
                    console.log("donor--------->",donor)
                    res.json({success:true, msg:"User register successfully"})
                }
            })
        }
    })

});


module.exports = router;