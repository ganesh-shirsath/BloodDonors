const express = require('express');
const router = express.Router();

const BloodRequest = require('../model/blood-request');
const CommentModel = require('../model/comment');

// Post blood request
router.post('/blood-request',(req, res, next) =>{
    console.log("req.body............................")
    console.log(req.body)
    console.log("req.body............................")

    if(req.body.comment) {
        const commentInstance = new CommentModel({
            text:  req.body.comment
        })

        commentInstance.save((error, comment) =>{
            if(error) {
                console.log("error......",error)
                res.json({success:false, msg:"Failed to save comment."})
            }
            else {
                let commentArray = [];
                commentArray.push(comment._id)
                let newBloodReq = new BloodRequest({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    city: req.body.city,
                    state: req.body.state,
                    req_group: req.body.requireBlood,
                    comments: commentArray
                });

                BloodRequest.createBloodRequest(newBloodReq, (err, newBoodReq)=> {
                    if(err) {
                        console.log("err......",err)
                        res.json({success:false, msg:"Failed to register blood request"})
                    }
                    else {
                        console.log("newBoodReq--------->",newBoodReq)
                        res.json({success:true, msg:"Blood request register successfully"})
                    }
                })
            }
        })
    }
    else {
        let newBloodReq = new BloodRequest({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
            state: req.body.state,
            req_group: req.body.requireBlood,
            comments: []
        });

        BloodRequest.createBloodRequest(newBloodReq, (err, newBoodReq)=> {
            if(err) {
                console.log("err......",err)
                res.json({success:false, msg:"Failed to register blood request"})
            }
            else {
                console.log("newBoodReq--------->",newBoodReq)
                res.json({success:true, msg:"Blood request register successfully"})
            }
        })
    }
});

// Add Comment request
router.post('/comment/add',(req, res, next) =>{
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    if(req.body.comment === undefined || req.body.comment ==='') {
        res.json({success:false, msg:"Could not svae the empty comment"})
    }
    else {
        BloodRequest.getBloodRequestById(req.body.bloodReqId, (err, bloodReq) =>{
            console.log("bloodReq")
            console.log(bloodReq)
            console.log("bloodReq")
            if(err) {
                res.json({success:false, msg:"Blood request not found"});
            }
            else {
                const commentInstance = new CommentModel({
                    text:  req.body.comment
                })

                commentInstance.save((err, comment)=> {
                    if(err) {
                        res.json({success:false, msg:"Error while save comment."});
                    }
                    else {
                        BloodRequest.addComment(bloodReq._id,comment._id, (err, newComment)=> {
                            if(err) {
                                res.json({success:false, msg:"Blood request not updated with comment id."});
                            }
                            else {
                                res.json({success:true, msg:"Comment added to blood request successfully"})
                            }
                        })
                    }
                });
            }
        })
    }
});

// Get Blood Requests
router.get('/blood-requests', (req, res, next) => {
    BloodRequest.getBloodRequests((err, bloodRequests) => {
        if(err) {
            res.json({success: false, msg:"Blood request not found."});
        }
        else {
            res.json({success:true, bloodReq:bloodRequests, msg:"Retrived blood requests successfully."})
        }
    })
})

module.exports = router;