import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('BD connected 🚀🚀🚀')
  })
  .catch((error) => {
    console.log('BD error 😢😢😢' + error)
  })

// Another way
// try {
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log('BD connected 🚀🚀🚀')
// } catch (error) {
//     console.log('BD error 😢😢😢' + error)
// }
