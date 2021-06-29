const express = require('express');
const app = express();
const scheduleRoute = express.Router();
var ObjectId = require('mongoose').Types.ObjectId; 
// Employee model
let Schedule = require('../models/schedule');
let User = require('../models/user');
let Coach = require('../models/coach');
var authenticate = require('../authenticate');

// var custom;
// var games=[];
//   var coaches=[];
//   var data2; 
// // Add Employee
scheduleRoute.route('/create').post((req, res, next) => {
  
  for(gam of this.games)
  {
   // console.log(games[0])
   console.log("Stoooooop")
   // console.log(gam._id);
    data2= {        
      sessionType:"Practice",
       game : gam._id,
      coach : coaches[0]._id,
      court: gam.courts[0]._id,
      user1: results._id,    
  }
  
  Schedule.create(data2, (error, data) => {
    if (error) {
      return next(error)
    } else 
    {
      console.log(data);
    
    }
  })
  
  } 
});

scheduleRoute.route('/user-profile/:id').get((req,res,next) => {
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
          this.results=results;
          this.games=results.games;
        console.log(this.games);
      res.json(results)
    }
  });

})
scheduleRoute.route('/getcoaches').get((req, res) => {
  Coach.find({})
      .populate('game')
      .then((dishes) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          this.coaches=dishes;
          res.json(dishes);
      }, (err) => next(err))
      .catch((err) => next(err));
})


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

scheduleRoute.route('/create/schedule/:id').post((req, res, next) => {

console.log(req.body.game);
  var resu;
  var games;
  var coaches=[];
  var data2; 
  
    User.findById(req.params.id)
     .populate('games').exec(function (err, results) {
      if (err) {
        console.log("dsr");
        err = new Error('User ' + req.params.id + ' not found');
        err.status = 404;
     
        return next(err)
      } else 
      {
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        console.log("ssss ")
        console.log(results);
        resu=results;
        console.log(resu);
    //  console.log(results);
   // res.json(results)
         games=resu.games;
        console.log(games[0].name);
        Coach.find({})
        .then((coachest) => {
       coaches=coachest;
      //    console.log(coaches);
      // console.log(results.firstname);
  //     for(gam of games)
  // {
   // console.log(games[0])
   console.log("Stoooooop")
   // console.log(gam._id);
   var time=results.timings;
     var stTime=time.slice(0,2);
     var intStart=parseInt(stTime);

     var time2=results.endTime;
     var stTime2=time2.slice(0,2);
     var intEnd=parseInt(stTime2);

     // console.log(gam._id);
     var random=Math.floor(Math.random() * req.body.courts.length);
     var randDate=randomDate(Date.now(), Date.now()+1000000000, intStart, intEnd);
     var randDate2=randomDate(Date.now(), Date.now()+1000000000, intStart, intStart);
    
     console.log("T1"+randDate);
     console.log("T2"+randDate2);

     if(randDate2.getHours()<randDate.getHours())
     {
       randDate2.setHours(randDate.getHours()+1)
       console.log("In if1"+randDate2)
     }
     else if((randDate2.getHours()-randDate.getHours())>3)
     {
       randDate2.setHours(randDate.getHours()+2)
       console.log("In if2"+randDate2)
     }
  

    data2= {        
      sessionType:"Practice",
       game : req.body._id,
      coach : coaches[getRandomIntInclusive(0, 5)]._id,
      court: req.body.courts[random],
      startTime: randDate,
      endTime: randDate2,
      date: randDate, 
      user1: resu._id,    
  }
  
  Schedule.create(data2, (error, data) => {
    if (error) {
      return next(error)
    } else 
    {
      console.log(data);
      res.json({
        user: resu,
        coaches: coachest,
        schedules:data

    });
    
    }
  })
        }, (err) => next(err))
        .catch((err) => next(err));
      }
    });
   

});

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

scheduleRoute.route('/create/match/:id').post((req, res, next) => {

  
    var results;
    var games;
    var coaches=[];
    var data2; 
    var oppo=req.body;

console.log("Matchh")

    console.log(oppo.firstname);
    
      User.findById(req.params.id)
       .populate('games').exec(function (err, results) {
         
        if (err) {
          err = new Error('User ' + req.params.id + ' not found');
          err.status = 404;
          console.log("dsr");
          return next(err)
        } else 
        {
          // res.statusCode = 200;
          // res.setHeader('Content-Type', 'application/json');
          results=results;
      //  console.log(results);
     // res.json(results)
           games=results.games;
       //   console.log(games[0].name);
          Coach.find({})
          .then((coachest) => {
         coaches=coachest;
  
   
    Schedule.create(data2, (error, data) => {
      if (error) {
        return next(error)
      } else 
      {
        console.log(data);
        res.json({
          user: results,
          coaches: coachest,
          schedules:data
  
      });
      
      }
    })
    
          }, (err) => next(err))
          .catch((err) => next(err));
        }
      });
  });

  scheduleRoute.route('/getOpponent/:id').get((req, res) => {

    User.findById(req.params.id)
    .populate('games').exec(function (err, results) {
     if (err) {
       err = new Error('User ' + req.params.id + ' not found');
       err.status = 404;
       return next(err)
     } else 
     {
        

      User.find({ranking:results.rankingOpponent,games:{ $all: [ { "$elemMatch" :  results.games[1] }] }
     })
     .populate("games")
     .exec(function (err, result) {
        //   // callback
          if (err) {
       
          return next(err)
        } else 
        {
         
            console.log(result);
        //  res.json(result)
        }
         });
    



       res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
      //   console.log(results);
       res.json(results)
     }
   });

  })
  


scheduleRoute.route('/').get((req, res) => {
    Schedule.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      custom=data[0];
     
    }
  })
  .populate({ path: 'user1', model: User })
  .populate({ path: 'user2', model: User })
    .populate("game")
    .populate("court")
 
  .exec(function (err, results) {
    // callback
    res.json(results)
});
})

// Get single employee
scheduleRoute.route('/readSession/:id').get((req, res) => {

  Schedule.find({user1:ObjectId(req.params.id),sessionType:"Practice",permit:true}).populate("game").populate("court").populate("coach")
  .populate({ path: 'user1', model: User })
 .exec(function (err, results) {
      if (err) {
      return next(err)
    } else 
    {
     console.log("In readSession............")
       // console.log(custom);
      res.json(results)
    }
     });
})

scheduleRoute.route('/admin/permission').get((req, res) => {

  Schedule.find({permit:false}).populate("game").populate("court").populate("coach")
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

scheduleRoute.route('/admin/permission/game').get((req, res) => {

  Schedule.find({permit:false,sessionType:"Game"}).populate("game").populate("court").populate("coach")
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

scheduleRoute.route('/readMatch/:id').get((req, res) => {

  Schedule.find({user1:ObjectId(req.params.id),sessionType:"Game",permit:true}).populate("game")  .populate("court").populate("coach")
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

scheduleRoute.route('/update/completed/:id').put((req, res, next) => {
  var res1;
  var res2;
  
  Schedule.findById(req.params.id)
  .then((schedule) => {
      if (schedule != null) {
          if (req.body.completed) {
            schedule.completed = req.body.completed;
          }
        console.log(req.body.completed);
          schedule.save()
          console.log("In completed...")
          res1=schedule;



           
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            
            schedule: res1
           
    
        });
         // res.json(schedule);  


        
      }
      else if (schedule == null) {
          err = new Error('schedule  not found');
          err.status = 404;
          return next(err);
      }
  
  }, (err) => next(err))
  .catch((err) => next(err));


 console.log("outside")
  

})

scheduleRoute.route('/admin/update/permit/:id').put((req, res, next) => {
  var res1;
  var res2;
  
  Schedule.findById(req.params.id)
  .then((schedule) => {
      if (schedule != null) {
          if (req.body.permit) {
            schedule.permit = req.body.permit;
          }
        console.log(req.body.completed);
          schedule.save()
        
          res1=schedule;



           
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            
            schedule: res1
           
    
        });
         // res.json(schedule);  


        
      }
      else if (schedule == null) {
          err = new Error('schedule  not found');
          err.status = 404;
          return next(err);
      }
  
  }, (err) => next(err))
  .catch((err) => next(err));


 console.log("outside")
  

})

scheduleRoute.route('/admin/update/permit/game/:id').put((req, res, next) => {
  var res1;
  var res2;
  
  Schedule.findByIdAndUpdate(req.params.id, { $set: req.body})
  .then(function(schedule){
    Schedule.updateOne({user1:schedule.user2,user2:schedule.user1,game:schedule.game,coach:schedule.coach,court:schedule.court}, {
      $set: req.body
    })
      .then(function(data){
  //      console.log("ddlllllllll")
        console.log(req.body)
        console.log("In Permit Game")
        res.json({
            
          data: schedule,
          data:data
  
      });
         //some success response
       }).catch(function(err){
        err.status = 404;
                 return next(err);
         // rollback the previous update
         // respond with the err
       });     
  })
  .catch(function(err){
    err.status = 404;
    return next(err);
    // respond with the err           
  });
})

scheduleRoute.route('/delete/games/:id').delete((req, res, next) => {
  var res1;
  var res2;
  Schedule.findByIdAndRemove(req.params.id, (error, schedule) => {
    //console.log(schedule);
    if (error) {
      console.log("Error")
      return next(error);
    } else {
       Schedule.deleteOne({user1:schedule.user2,user2:schedule.user1,game:schedule.game,coach:schedule.coach,court:schedule.court}, (error, data))
    .then(function(data){

      res.json({
          
        data: schedule,
        data:data,
      

    });

       //some success response
     }).catch(function(err){
       console.log("In errotij")
      err.status = 404;
               return next(err);
       // rollback the previous update
       // respond with the err
     });     

      console.log("sss"+req.params.id)
      res.status(200).json({
        msg: data
      })
    }
  })
 
  Schedule.findById(req.params.id, (error, data))
  .then(function(schedule){
    
    Schedule.deleteOne({user1:schedule.user2,user2:schedule.user1,game:schedule.game,coach:schedule.coach,court:schedule.court}, (error, data))
      .then(function(data2){

        Schedule.deleteOne({user1:schedule.user1,user2:schedule.user2,game:schedule.game,coach:schedule.coach,court:schedule.court}, (error, data))
        .then(function(data){
  
          res.json({
              
            data: schedule,
            data:data2,
            data: data
    
        });
  
           //some success response
         }).catch(function(err){
           console.log("In errotij")
          err.status = 404;
                   return next(err);
           // rollback the previous update
           // respond with the err
         });     


       

         //some success response
       }).catch(function(err){
         console.log("In errotij")
        err.status = 404;
                 return next(err);
         // rollback the previous update
         // respond with the err
       });  
     
  })
  .catch(function(err){
    err.status = 404;
    console.log("Come on")
    return next(err);
    // respond with the err           
  });
})



scheduleRoute.route('/update/winner/:id').put((req, res, next) => {
  var res1;
  var res2;
  
  Schedule.findByIdAndUpdate(req.params.id, { $set: req.body})
  .then(function(schedule){
    Schedule.updateOne({user1:schedule.user2,user2:schedule.user1,game:schedule.game,coach:schedule.coach,court:schedule.court}, {
      $set: req.body
    })
      .then(function(data){
  //      console.log("ddlllllllll")
        console.log(req.body)
        res.json({
            
          data: schedule,
          data:data
  
      });
         //some success response
       }).catch(function(err){
        err.status = 404;
                 return next(err);
         // rollback the previous update
         // respond with the err
       });     
  })
  .catch(function(err){
    err.status = 404;
    return next(err);
    // respond with the err           
  });
})

scheduleRoute.route('/get/ranking/:id').get((req, res, next) => {
 var wins;
 var matchesplayed;
 var totalmatches;
 var sessionsAttended;
 var totalSessions;
 console.log("In Rankingffffffffff");
                
//No of wins
 Schedule.countDocuments({ user1: req.params.id,result: req.params.id }, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    wins=result;
    console.log("matches wins "+ wins);
    //TotalNoofMatches playef
    Schedule.countDocuments({ user1: req.params.id,result: {$ne: null} }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        matchesplayed=result;
        console.log("matches played "+ matchesplayed);
//total matches
        Schedule.countDocuments({ user1: req.params.id,sessionType:"Game",permit:true }, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            totalmatches=result;
            console.log("totalmatches "+ totalmatches);
            Schedule.countDocuments({ user1: req.params.id,sessionType:"Practice",completed:true,permit:true }, function(err, result) {
              if (err) {
                console.log(err);
              } else {
                sessionsAttended=result;
                console.log("sessionsAttended "+ sessionsAttended);
                Schedule.countDocuments({ user1: req.params.id,sessionType:"Practice",permit:true}, function(err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    totalSessions=result;
                    console.log("totalSessions "+ totalSessions);

                    var res1=(wins/matchesplayed)*10;
                    if(Number.isNaN(res1))
                    {
                      res1=1;
                    }
                    console.log("res1"+ res1);
                    var res2=(matchesplayed/totalmatches)*10;
                    if(Number.isNaN(res2))
                    {
                      res2=1;
                    }
                    console.log("res2"+ res2);
                    var res3=(sessionsAttended/totalSessions)*10;
                    if(Number.isNaN(res3))
                    {
                      res3=1;
                    }
                    
                    console.log("res3"+ res3);

                    var tot=(res1+res2+res3)/3;
                    tot=tot.toFixed(1);
                    console.log("tot"+ tot);

                    if(Number.isNaN(tot))
                    {
                      tot=1;
                      res.json("Ranking: "+ tot);
                    }

                    if(tot==0){
                      tot=1;
                      res.json("Ranking: "+ tot);
                    }
                    else
                    {
                      res.json("Ranking: "+ tot)
                    }
                   
                console.log("In Ranking");
                
                  
                  }
                });    
            
            
              
              }
            });    
        
        
          
          }
        });    
    
        
      }
    });    


   // res.json("Number of documents in the collection: " + result);
  }
});
// Schedule.aggregate([
//   { "$facet": {
//     "Total": [
//       { "$match" : { "ReleaseDate": { "$exists": true }}},
//       { "$count": "Total" },
//     ],
//     "Released": [
//       { "$match" : {"ReleaseDate": { "$exists": true, "$nin": [""] }}},
//       { "$count": "Released" }
//     ],
//     "Unreleased": [
//       { "$match" : {"ReleaseDate": { "$exists": true, "$in": [""] }}},
//       { "$count": "Unreleased" }
//     ]
//   }},
//   { "$project": {
//     "Total": { "$arrayElemAt": ["$Total.Total", 0] },
//     "Released": { "$arrayElemAt": ["$Released.Released", 0] },
//     "Unreleased": { "$arrayElemAt": ["$Unreleased.Unreleased", 0] }
//   }}
// ])


})






// Delete employee
scheduleRoute.route('/delete/:id').delete((req, res, next) => {
    Schedule.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("sss"+req.params.id)
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = scheduleRoute;