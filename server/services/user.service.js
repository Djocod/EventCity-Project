import User from "../model/User.model.js";
import { randomUUID } from "crypto";

const champs = {
  _id: true,
  gender: true,
  email: true,
  phone: true,
  cell: true,
  nat: true,
  name: {
    title: true,
    first: true,
    last: true,
  },

  location: {
    street: {
      number: true,
      name: true,
    },
    city: true,
    state: true,
    country: true,
    postcode: true,
    coordinates: {
      latitude: true,
      longitude: true,
    },
    timezone: {
      offset: true,
      description: true,
    },
  },

  login: {
    uuid: true,
    username: true,
    password: true,
    salt: true,
    md5: true,
    shatrue: true,
    sha256: true,
  },

  dob: {
    date: true,
    age: true,
  },

  registered: {
    date: true,
    age: true,
  },

  picture: {
    large: true,
    medium: true,
    thumbnail: true,
  },
};

export async function findAllUser() {
  return User.find({}, champs);
}

export async function findUser(email, password) {
  return User.find(
    {
      email: { $regex: email, $options: "i" },
      "login.password": { $regex: password, $options: "i" },
    },
    champs,
  );
}

export async function addNewUser(
  nameFirst,
  nameLast,
  dobDate,
  email,
  locationCity,
  loginPassword,
) {
  return User.create({
    "name.first": nameFirst,
    "name.last": nameLast,
    "dob.date": dobDate,
    email,
    "location.city": locationCity,
    "login.password": loginPassword,
    "login.uuid": randomUUID(),
  });
}
