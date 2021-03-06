
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

function validator(array) {
  return array.length > 0
}

// ? Embedded Schema
const movieMoodSchema = new mongoose.Schema({ 
  // mood: { type: mongoose.Schema.ObjectId, ref: 'Mood', required: true, validate: [validator, 'Please add at least one mood'] },
  mood: { type: mongoose.Schema.ObjectId, ref: 'Mood', required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, { 
  timestamps: true,
})

const ratingsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  value: { type: String, required: true },
})

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, { 
  timestamps: true,
})

// ? Movie Schema
const movieSchema = mongoose.Schema({
  imdb: { type: String, required: false, unique: true, validate: [validator, 'Please add the IMDb ID']  },
  title: { type: String, required: true, unique: true, validate: [validator, 'Please add the movie title']  },
  year: { type: String, required: true, validate: [validator, 'Please add the release year']  },
  rated: { type: String, required: true, validate: [validator, 'Please add the rating']  },
  released: { type: String, required: true, validate: [validator, 'Please add the release date']  },
  runtime: { type: String, required: true, validate: [validator, 'Please add the running time']  },
  genres: {  type: String, required: true, validate: [validator, 'Please add at least one genre'] },
  director: { type: String, required: true, validate: [validator, 'Please add the director']  },
  actors: { type: String, required: true, validate: [validator, 'Please add the cast']  },
  plot: { type: String, required: true, validate: [validator, 'Please add the plot']  },
  language: { type: String, required: true, validate: [validator, 'Please add the language of the movie']  },
  poster: { type: String, required: true, validate: [validator, 'Please add the URL for the movie poster']  },
  ratings: { type: [ratingsSchema], required: true, validate: [validator, 'Please make sure ratings are added'] },
  moods: { type: [movieMoodSchema], required: true, validate: [validator, 'Please add your moods for this movie'] },
  comments: { type: [commentSchema], required: false },
})


movieSchema.plugin(uniqueValidator)
export default mongoose.model('Movie', movieSchema)