import Profile from "../../models/profile.js"



//fetch all registered users
export const getUsers = async (req, res) => {
    try {
        const allUsers = await Profile.find({ })

        res.status(200).json({ allUsers })

    } catch(error) {
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }

}



//fetch details of a single user - AUTHENTICATED
export const getUserDetails = async (req, res) => {
    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    const details = {
        name: null,
        photo: null,
        friends: null,
        sentFriendRequests: null,
        receivedFriendRequests: null
    }

    try {
        const userProfile = await Profile.findOne({ _id: userID })

        details.name = userProfile.name
        details.photo = userProfile.photo
        details.friends = userProfile.friends
        details.sentFriendRequests = userProfile.sentFriendRequests
        details.receivedFriendRequests = userProfile.receivedFriendRequests

        res.status(200).json({ details })

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }
}