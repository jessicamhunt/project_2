var db = require("../models");

var path = require("path");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Job.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/home", function (req, res){
    res.render("homeView");
  })


  app.get("/view", function (req, res) {
    res.render("selectView");
  });

  app.get("/view/manager", function (req, res) {
    var supervisorArray = [];
    var jobsiteArray = [];
    var jobsArray = [];
    var customerArray = [];
    var managerObject = {
      supervisors: supervisorArray,
      jobsites: jobsiteArray,
      jobs: jobsArray,
      customers: customerArray
    }

    db.Supervisor.findAll({}).then(function (data) {
      for (e = 0; e < data.length; e++) {
        (supervisorArray).push(data[e].dataValues);
      }
      db.Jobsite.findAll({}).then(function (data2) {
        for (v = 0; v < data2.length; v++) {
          (jobsiteArray).push(data2[v].dataValues);
        }
        db.Job.findAll({}).then(function (data3) {
          for (a = 0; a < data3.length; a++) {
            (jobsArray).push(data3[a].dataValues);
          }
          db.Customer.findAll({}).then(function(data4){
            for (n = 0; n < data4.length; n++) {
              (customerArray).push(data4[n].dataValues);
            }
          })
        })
        setTimeout(function(){
        res.render("managerView", managerObject)
      }, 1000)
      })
    })


    setTimeout(function () {
      console.log("data loaded!")
    }, 2000)

    // db.Jobsite.findall({})


  });

  app.get("/view/foreman", function (req, res) {
    db.Job.findAll({}).then(function (data) {
      // console.log(data[0].dataValues);
      var projectArray = [];
      for (i = 0; i < data.length; i++) {
        (projectArray).push(data[i].dataValues);
      }
      // console.log(dataArray)
      var hbsObject = {
        projects: projectArray
      };

      res.render("foremanView", hbsObject)
    });
  });


  app.get("/view/customer", function(req, res){

    res.render("customerView");

  });


  // // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};