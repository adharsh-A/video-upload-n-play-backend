import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50
  },
  description: {
    type: String,
    required: true,
    maxLength: 200
  },
  thumbnail: {
    public_id: { type: String },
    url: { type: String, required: true }
  },
  videoUrl: {
    public_id: { type: String },
    url: { type: String, required: true }
  },
  duration: {
    type: String,
    default: "00:00"
  },
  author: {
    type: String,
    default: "Anonymous"
  },
  views: {
    type: String,
    default: "0"
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Video', videoSchema);
