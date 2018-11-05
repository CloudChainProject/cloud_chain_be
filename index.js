const cluster = require('cluster');

if (cluster.isMaster) {

  const numWorkers = require('os').cpus().length;

  for(let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });

} else {
  const express     = require('express');
  const path        = require('path');
  const bodyParser  = require('body-parser');
  const mongoose    = require('mongoose');
  const dotenv      = require('dotenv').load();
  const auth        = require('./api/auth/auth');

  const http = require('http');
  const numCPUs = require('os').cpus().length;
  const chalk = require('chalk');
  const cors = require('cors');
  const app = express();

  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json({limit: '50mb'}));

  if(!process.env.NODE_ENV ) process.env.NODE_ENV = 'development';

  if(process.env.NODE_ENV === 'production')     var DBCON = dotenv.parsed.PROD;
  if(process.env.NODE_ENV === 'development')    var DBCON = dotenv.parsed.DEV;
  if(process.env.NODE_ENV === 'test')           var DBCON = dotenv.parsed.TEST;

  const db = mongoose.connect(DBCON, { useNewUrlParser: true });

  const connected    = chalk.bold.cyan;
  const error        = chalk.bold.yellow;
  const disconnected = chalk.bold.red;
  const termination  = chalk.bold.magenta;

  app.use(cors());

  app.use("/api/v1/signup", require("./api/signup/signup.route"));

  // app.use(auth.check)

  app.use("/api/v1/login", require("./api/login/login.route"));
  app.use("/api/v1/user", require("./api/user/user.route"));

  const server = app.listen(3000, function(){
    console.log('server express start on: http://localhost:' + 3000);
  })
}
