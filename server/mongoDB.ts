import mongoose from "mongoose";

const connectionString: string | undefined = process.env.MONGODB_URL;

if (!connectionString) {
    throw new Error("Please provide a connection string.");
}

const MongoDB = {
    open: async () => {
        // if (mongoose.connection.readyState >= 1) {
        //     console.log("-------Already connected to database---------");
        //     return;
        // }

        try {
            await mongoose.connect(connectionString);
            console.log("------Database connected------");
        } catch (error) {
            console.error("------Error while connecting database------");
            console.log(error);
        }
    },
    close: async () => {
        try {
            await mongoose.connection.close();
            console.log("------Database disconnected-----");
        } catch (error) {
            console.error("------Error while disconnecting database------");
        }
    },
};

export default MongoDB;
