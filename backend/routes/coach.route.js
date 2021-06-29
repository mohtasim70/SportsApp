const express = require('express');
const app = express();
const coachRoute = express.Router();
var ObjectId = require('mongoose').Types.ObjectId; 

// Employee model
let Coach = require('../models/coach');
let Schedule = require('../models/schedule');
let User = require('../models/user');

coachRoute.route('/').get((req, res) => {
    Coach.find({})
        .populate('game')
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
})
coachRoute.route('/update/:id').put((req, res, next) => {
  Coach.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
coachRoute.route('/create').post((req, res, next) => {
    Coach.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
coachRoute.route('/read/:id').get((req, res) => {
    Coach.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  coachRoute.route('/delete/:id').delete((req, res, next) => {
    Coach.findOneAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  coachRoute.route('/read').get((req, res) => {
    Coach.findOne({name:req.body.username}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
coachRoute.route('/readSession/:id').get((req, res) => {

    Schedule.find({coach:ObjectId(req.params.id),sessionType:"Practice"}).populate("game")  .populate("court").populate("coach")
    .populate({ path: 'user1', model: User })
   .exec(function (err, results) {
      //   // callback
        if (err) {
     
        return next(err)
      } else 
      {
       console.log(results);
        res.json(results)
      }
       });
  })
  coachRoute.route('/readMatch/:id').get((req, res) => {

    Schedule.find({coach:ObjectId(req.params.id),sessionType:"Game"}).populate("game")  .populate("court").populate("coach")
    .populate({ path: 'user1', model: User }).populate({ path: 'user2', model: User }).populate({ path: 'result', model: User })
   .exec(function (err, results) {
      //   // callback
        if (err) {
     
        return next(err)
      } else 
      {
       console.log(results);
        res.json(results)
      }
       });
  })

  coachRoute.route('/add/ranking/:id').put((req, res, next) => {
    Schedule.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    })
  })








module.exports = coachRoute;