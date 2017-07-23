let mongoose = require('mongoose')

let Schema = mongoose.Schema

module.exports = mongoose.model('Post', new Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  created_at: Date,
  updated_at: Date
}))
