import mongoose from "mongoose";

export default async function handler(res,req) {
  try {
   await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
   });    

   const connection = mongoose.connection;
   
   connection.on('connected', () => {
    console.log('MongoDB connected successfully');
   })

   connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
    res.status(500).json({error:'MongoDB connection error'});
   });

   res.status(200).json({message: 'MongoDB connected successfully'});
} catch (error) {
    console.log('Something goes wrong!',error);
    res.status(500).json({error:'Something went wrong'});

}

}

