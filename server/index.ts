// ? Import npm
require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';

// ? Import Local
// | DB connection
import connectDatabase from './db/index';
// | Router
import router from './router/index';

// ? Constants declaration
// | PORT
const PORT = process.env.PORT || 5000;

// | APP
const app = express();

// | Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// | CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

// | Router
app.use(router);

// | Listen
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// | DB Connection
connectDatabase();
