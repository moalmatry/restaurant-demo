import config from 'config';
import mongoose from 'mongoose';

const dbConnection = () => {
  // NOTE: when uploading to the server replace it with your MongoDB connection string
  const dbUrl = config.get<string>('dbUrl');
  mongoose
    .connect(dbUrl)
    .then((conn) => {
      console.log(`Database Connected`, conn.connection.host);
    })
    .catch((err) => console.log(`Database error   `, err));
};

export default dbConnection;
