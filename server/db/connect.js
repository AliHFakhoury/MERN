// cloud

import mongoose from "mongoose";

const MongoosConnection = (uri, databaseName) => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName })
        .then( () => {
            return { connection: mongoose.connection.db }
        })
}

export default MongoosConnection;