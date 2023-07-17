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