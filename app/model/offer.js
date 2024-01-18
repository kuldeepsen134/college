const mongoose = require("mongoose")
const { Schema } = mongoose

const offerSchema = Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
  }
  ,
  image_URL: {
    type: String
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
  }
},
  {
    timestamps: true
  })



module.exports = mongoose.model("Offer", offerSchema)