const express = require('express');
const app = express();
const gameRoute = express.Router();

// Employee model
let Game = require('../models/game');



gameRoute.route('/').get((req, res) => {
    // Game.find({})
    // .populate('users')
    // .then((dishes) => {
    //     console.log("In Dishes",req.user);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(dishes);
    // }
    // , (err) => next(err))
    // .catch((err) => next(err));
    Game.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
gameRoute.route('/get/:id')
.get((req,res,next) => {
    Game.findById(req.params.id)
    //  .populate('games')
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }
        else {
            err = new Error('Dish ' + req.params.id + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
  gameRoute.route('/create').post((req, res, next) => {
    Game.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
  module.exports = gameRoute;
  