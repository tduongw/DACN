

import {MongoClient, ServerApiVersion} from 'mongodb'
import { env } from './environment'
let dutuDataBase = null
const monggoClientInstance = new MongoClient(env.MONGODB_URI,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,

       } 
    })
    export const CONNECT_DB =async ()=>{
        await monggoClientInstance.connect()
        dutuDataBase = monggoClientInstance.db(env.DATABASE_NAME)
    
    }
    export const GET_DB = ()=>
    {
        if (!dutuDataBase) throw new Error('Must connect to Database first')
        return dutuDataBase
    }