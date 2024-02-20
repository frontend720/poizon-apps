const express = require("express");
const admin = require("firebase-admin");
const adminRouter = express.Router();
const app = require("./config");
const { v4: uuid } = require("uuid");