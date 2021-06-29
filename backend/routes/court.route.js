const express = require('express');
const app = express();
const courtRoute = express.Router();

// Employee model
let Court = require('../models/court');

courtRoute.route('/').get((req, res) => {
    Court.find({})
    .populate('game')
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  courtRoute.route('/create').post((req, res, next) => {
    Court.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
  module.exports = courtRoute;
  