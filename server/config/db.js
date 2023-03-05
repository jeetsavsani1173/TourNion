import mongoose from 'mongoose';
mongoose.set("strictQuery", false);

// default
const log = console.log;

const connectDB = async (app) => {
    try {
        // let dbLink = process.env.MONGO_URI;
        let dbLink = 'mongodb+srv://tournionwebapp:TourNionWebApp@cluster0.vngvfvr.mongodb.net/tourNionDB?retryWrites=true&w=majority';
        let port = 5000;
        const con = await mongoose.connect(dbLink)
            .then(() => {
                log(`--------------------------------------------`);
                log('MONGODB CONNECTED SUCCESSFULLY');
                app.get('/',(req,res) => {
                    res.send(`Hello, server is running (Express)`)
                })
                app.listen(port,() => {
                    log(`server running on : http://localhost:${port}`);
                    log(`--------------------------------------------`);
                })
            })
            .catch(err => console.log(err));
    } catch (err) {
        log(`#############################################`);
        console.log('MONGODB ERROR : ', err.message);
        log(`#############################################`);
        process.exit();
    }
}

export default connectDB;