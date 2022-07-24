import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  mongoose.connection.close();
});

global.signin = () => {
  // Build a JWT Paylod with an ID and email
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  //Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // session object to store the JWT in {jwt: MY_JWT}
  const session = { jwt: token };

  // turn session to json
  const sessionJSON = JSON.stringify(session);

  // take json and encode it as base64

  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that is cookie

  return [`session=${base64}`];
};
