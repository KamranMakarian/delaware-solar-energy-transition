// api called predict to get the prediction of the model
// The model is trained on the data and the prediction is returned
// The prediction is the output of the model


/* This code snippet is setting up a router using the Express framework in a Node.js application. */
const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predict');
