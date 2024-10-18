import express from "express";

import dotenv from 'dotenv';

import cors from 'cors';


import 'express-async-errors';
import morgan from 'morgan';





// db and authenticateUser

// cloud
import MongoosConnection from "./db/connect.js";


// routers
import authRouter from "./routes/authRoutes.js";
import sampleTypeRouter from "./routes/sampleTypeRoutes.js";
import projectRouter from "./routes/projectRoutes.js"
import sampleRouter from "./routes/sampleRoutes.js"
import documentRouter from "./routes/documentRoutes.js"













//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import mongoose from "mongoose";



//creating the path
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const currentModuleURL = new URL(import.meta.url);
const currentModulePath = fileURLToPath(currentModuleURL);
const currentDir = dirname(currentModulePath);




const app = express();



dotenv.config();





//to show the requests in the console
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};


app.use(cors(corsOpts));


// app.use(express.static(join(currentDir, '..', 'client', 'build')));
app.use(express.json());


app.get('/api/mvp/dashboard', (req, res) => {
    res.json({msg:"Works!"})
})

// Controller Routes
app.use('/controller/user', authRouter);
app.use('/controller/sampleType', sampleTypeRouter);
app.use('/controller/project', projectRouter);
app.use('/controller/sample', sampleRouter);
app.use('/controller/documents', documentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// app.get('*', (req, res) => {
//     res.sendFile(join(currentDir, '..', 'client', 'build', 'index.html'));
// });


const port = process.env.PORT || 5000;
const host = '0.0.0.0';

const start = async () => {
    try {
        // connecting to the cloud mongodb
        await MongoosConnection(process.env.MONGO_URL, "OT_Dev"); 
        app.listen(port, host, () => console.log(`Server is listening on port ${port}...`));

    } catch (err) {
        console.log(err);
    }
}

start();