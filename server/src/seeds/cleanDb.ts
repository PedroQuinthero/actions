import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];

    if (!model || !model.db?.db) {
      throw new Error(`Database connection not found for model ${modelName}`);
    }

    const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
