const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hireready';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout fallback
    });
    isConnected = true;
    global.isMongoConnected = true;
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    global.isMongoConnected = false;
    console.warn(`[Database] Local/remote MongoDB not reachable (${error.message}).`);
    console.log(`[Database] Activated Standalone Embedded JSON Datastore for zero-config offline execution.`);
  }
};

const getModel = (name, mongooseModel) => {
  if (global.isMongoConnected) {
    return mongooseModel;
  }
  const { getMockCollection } = require('./jsonStore');
  return getMockCollection(name);
};

module.exports = {
  connectDB,
  getModel,
  isConnected: () => global.isMongoConnected || isConnected,
};
