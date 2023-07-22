import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    interests: { type: String, required: true },
    photo: { type: Buffer, required: false },
    friends: { type: String, required: false },
    sentFriendRequests: { type: String, required: false },
    receivedFriendRequests: { type: String, required: false },
    _id: {
        type: String,
    }
})

export default mongoose.model("Profile", profileSchema)