import Profile from "../../models/profile.js"


//add clicked profile to sent-friend-requests - AUTHENTICATED
export const addToSentFriendRequests = async (req, res) => {

    const potentialFriendID = req.header("potential-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {
        const loggedInUser = await Profile.findOne({ _id: userID })

        const potentialFriend = await Profile.findOne({ _id: potentialFriendID })

        if(loggedInUser && potentialFriend){

            loggedInUser.sentFriendRequests.push(potentialFriend)
            potentialFriend.receivedFriendRequests.push(loggedInUser)

            console.log(loggedInUser.sentFriendRequests.length)

            return res.status(200).json({ message: "request sent" })
        }

        res.status(404).json({ message: "could not send request" })

    } catch(error){
        res.status(500).json({ message: "internal server error" })
    }

}