const mongoose = require('mongoose');
const pick = require('lodash');

const Schema = mongoose.Schema;
const dbSchema = new Schema({
  endpoint: {
    type: String,
    required: true
  },
  expirationTime: {
    type: String
  },
  keys: {
    type: Object,
    required: true
  }
});

dbSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  return pick(userObj, ['_id', 'endpoint', 'expirationTime', 'keys']);
}

const Subscriptions = mongoose.model('Subscriptions', dbSchema);

module.exports = {Subscriptions};