var express = require('express');
var router = express.Router();
var passport = require('passport');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

var User = require('../models/user');
var Game = require('../models/game');
let Coach = require('../models/coach');
const {ObjectId} = require('mongodb');

router.use(bodyParser.json());

/* GET users listing. */
router.route('/').get((req, res) => {

  User.find({})
  .populate('games').exec(function (err, results) {
   if (err) {
     err.status = 404;
     return next(err)
   } else 
   {
     res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
    //   console.log(results);
     res.json(results)
   }
 });
})
router.route('/user-profile').get(authenticate.verifyUser,(req, res, next) => {
  // User.findById(req.user._id, (error, data) => {
  //     if (error) {
  //       console.log("Kuttoh");
  //         return next(error);
         
  //     } else {
  //         res.status(200).json({
  //             msg: data
  //         })
  //     }
  // })
  User.findById(req.user._id)
.populate('games').exec(function (err, results) {
 if (err) {
   err = new Error('User in /Profile ' + req.params.id + ' not found');
   err.status = 404;
   return next(err)
 } else 
 {
   res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
     console.log(results);
   res.json(results)
 }
});
 
})


// Get Single User
// router.route('/user-profile/:id').get(authenticate.verifyUser,(req, res, next) => {
//   User.findById(req.params.id, (error, data) => { 
   
//       if (error) {
//           return next(error);
//       } else {
//           res.status(200).json({
//               msg: data
//           })
//       }
      
//   })
//   .populate('games')
// })

router.route('/user-profile/:id').get((req,res,next) => {
    User.findById(req.params.id)
     .populate('games').exec(function (err, results) {
      if (err) {
        err = new Error('User ' + req.params.id + ' not found');
        err.status = 404;
        return next(err)
      } else 
      {
        res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
         //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
          console.log(results);
          
        res.json(results)
      }
    });
 
})



// Update employee
router.route('/firsttime/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
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
router.route('/priority/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
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

router.post('/signup', (req, res, next) => {

  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 600;
      res.setHeader('Coreqntent-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if(req.body.ranking)
        user.ranking=req.body.ranking;
        if(req.body.admin)
        user.admin=req.body.admin;
        if(req.body.game)
        {
       
          for(let gam of req.body.game)
          {
            
           user.games.push(gam);
          }
          // user.games=req.body.game;
         
        }
        
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          for(let gam of user.games)
          {
           
          // Game.findByIdAndUpdate(
          //   gam._id,
          //   { $push: { users: user._id } },
          //   { new: true, useFindAndModify: false }
          // );
          Game.findById(gam._id)
          .then((data) =>{
            console.log(data);
            data.users.push(user._id);
            data.save();

          })
        
         

          }

          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});
router.post('coach/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.coach._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.post('/coach/signup', (req, res, next) => {

  Coach.register(new Coach({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 600;
      res.setHeader('Coreqntent-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.name)
        coach.name = req.body.name;
    
        
      coach.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
      

          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});
  //check in
  router.post("/user/:id/enter", async (req, res) => {
    // authenticate.verifyUser
    try {
      const data = {
        entry: Date.now()
      };
      const user= await User.findById(req.params.id);
  
      //if the user has an attendance array;
     
      if(user.attendance && user.attendance.length > 0){
      //for a new checkin attendance, the  checkin
      //must be at least 24hrs less than the new checkin time;
          const lastCheckIn = user.attendance[user.attendance.length - 1];
          const lastCheckInTimestamp = lastCheckIn.date.getTime();
            console.log(Date.now(), lastCheckInTimestamp);
          if (Date.now() < (lastCheckInTimestamp + 100)) {
            user.attendance.push(data);
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return ;
              }
              else{
                console.log("In 1st if");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Attendance Successful!'});
              }
             
            });
     
            // res.json(data);
            res.redirect('/users/dashboard')
            
          } else {
            // res.statusCode = 500;

             var err = new Error('You are alreadyin attendance!');
            console.log("Erroewq!!");
            // next(err);
            err.status = 403;
           
       
             res.json({err: err});
            return ;
          
          }
      }else{
          user.attendance.push(data);
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
              res.redirect('/users/dashboard');
              return ;
            }
            else{
            
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: true, status: 'Attendance Successful!'});
            }
           
          });
          
      }
    
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
    }
  });


router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
