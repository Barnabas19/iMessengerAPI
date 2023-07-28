import mongoose from 'mongoose'
import Network from '../../models/network.js'

import { profileSchema } from "../../models/profile.js"
const Profile = mongoose.model("Profile", profileSchema)



//add clicked profile to sent-friend-requests - AUTHENTICATED
export const addFriendRequest = async (req, res) => {

    const potentialFriendID = req.header("potential-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {

        const loggedInUserProfile = await Profile.findOne({ _id: userID })
        const loggedInUserNetwork = await Network.findOne({ _id: userID })


        const potentialFriendProfile = await Profile.findOne({ _id: potentialFriendID })
        const potentialFriendNetwork = await Network.findOne({ _id: potentialFriendID })

        if(loggedInUserProfile && potentialFriendProfile){

            loggedInUserNetwork.sentFriendRequests.push(potentialFriendProfile)
            loggedInUserNetwork.sentFriendRequestsIDs.push(potentialFriendProfile._id)
            await loggedInUserNetwork.save()


            potentialFriendNetwork.receivedFriendRequests.push(loggedInUserProfile)
            potentialFriendNetwork.receivedFriendRequestsIDs.push(loggedInUserProfile._id)
            await potentialFriendNetwork.save()

            return res.status(200).json({ message: "request sent" })
        }


        res.status(404).json({ message: "could not send request" })

    } catch(error){
        console.log(error)

        res.status(500).json({ message: "internal server error" })
    }

}



// revoke friend request
export const revokeFriendRequest = async (req, res) => {
    const revokeFriendID = req.header("revoke-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {
        const loggedInUserNetwork = await Network.findOne({ _id: userID })
        const revokeFriendNetwork = await Network.findOne({ _id: revokeFriendID })

        if(loggedInUserNetwork && revokeFriendNetwork){

            loggedInUserNetwork.sentFriendRequests = loggedInUserNetwork.sentFriendRequests.filter((profile) => {
                return profile._id !== revokeFriendID
            })
            loggedInUserNetwork.sentFriendRequestsIDs = loggedInUserNetwork.sentFriendRequestsIDs.filter((id) => {
                return id !== revokeFriendID
            })
            loggedInUserNetwork.save()


            revokeFriendNetwork.receivedFriendRequests = revokeFriendNetwork.receivedFriendRequests.filter((profile) => {
                return profile._id !== userID
            })
            revokeFriendNetwork.receivedFriendRequestsIDs = revokeFriendNetwork.receivedFriendRequestsIDs.filter((id) => {
                return id !== userID
            })
            revokeFriendNetwork.save()
    
            return res.status(200).json({ message: "revoked" })
        }

        res.status(404).json({ message: "could not complete action" })

    } catch (error){
        console.log(error)

        res.status(500).json({ message: "internal server error" })
    }

}
