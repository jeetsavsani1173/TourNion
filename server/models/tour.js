import mongoose from "mongoose";

// const reviewSchema = mongoose.Schema({
//   description: { type: String, required: true },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdAt: { type: Date, default: Date.now },
//   user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//   },
//   parent : {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Review',
//     required : false,
//     default : null
//   },
//   reviews: [{
//     type: [this],
//     default: [],
//   }],
// });

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  }
  // reviews: {
  //   type: [reviewSchema],
  //   default: [],
  // }
});

const TourModel = mongoose.model("Tour", tourSchema);

export default TourModel;
