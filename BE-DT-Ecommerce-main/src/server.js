
import express from 'express'
import {CONNECT_DB, GET_DB } from '../src/config/mongodb'
import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
const cors = require('cors');
const app = express()

const START_SERVER =()=>
{
  app.use(cors({  maxBodySize: '50mb' }));
app.use(express.json({ limit: '50mb' }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use('/v1', 
  APIs_V1)
  app.use(errorHandlingMiddleware)
app.listen(env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`I am running at http://localhost:${ env.APP_PORT }/`)
})

}
(async ()=>{
    try{
        await CONNECT_DB();
        console.log('connected to MongoDB cloud')
        START_SERVER()

    }
    catch (error) {
console.error(error)
process.exit(0)
    }
})()

// CONNECT_DB()
// .then(()=>{console.log('connected to mongoDB cloud Atlas')})
// .then(()=>START_SERVER())
// .catch(error =>{
//     console.error(error)
//     process.exit(0)})
