// ? Import npm
import * as mongoose from 'mongoose';

// ? Constants declaration
const uri: string = process.env.DB_URI || "mongodb://localhost:27017/notebook";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

// ? Function definition to set up mongoose connection
const connectDatabase = () => {
  mongoose.connect(uri, options as mongoose.ConnectOptions);

  // Event : Open
  mongoose.connection.once('open', () => {
    console.log(`MongoDB is running to ${uri}`);
  });

  // Event : Disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB is disconnected');
  });

  // Event : Reconnected
  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB is reconnected');
  });

  // Event : Error
  mongoose.connection.on('error', (error) => {
    console.error('Impossible to connect at the Database.');
    if (
      error.message
      && error.message.match(/failed to connect to server .* on first connect/)
    ) {
      console.error(`Error: ${error}`);
      console.error('Please check if your MongoDB is correctly connected');
      console.error('Retrying first connect in 30 seconds');

      // Wait for a bit,
      setTimeout(() => {
        // Try to connect again
        console.log('Retrying first connect...');
        mongoose.connect(uri, options as mongoose.ConnectOptions).catch(() => {});
      }, 30000);
    }
    else {
      // Some other error occurred, log it
      console.error(`Error: ${error}`);
    }
  });
};

// ? Export
export default connectDatabase;
