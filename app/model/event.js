const mongoose = require("mongoose")
const { Schema } = mongoose

const eventSchema = Schema({
  title: {
    type: String,
    required: true
  },
  sort_desc: {
    type: String,
  }
  ,
  image_URL: {
    type: String
  },
  detail: {
    type: String,
  }
},
  {
    timestamps: true
  })



module.exports = mongoose.model("Event", eventSchema)