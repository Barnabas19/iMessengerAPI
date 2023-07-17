import UserToken from "../../models/userToken.js"

export const logout = async (req, res) => {

    const { refreshToken } = req.body

    try {

        const userToken = await UserToken.findOne({ token: refreshToken })

        if(!userToken) return res.status(200).json({error: false, message: "logged out successfully"})

        await userToken.remove()

        res.status(200).json({error: false, message: "logged out successfully"})

    } catch (error) {
        console.log(error)

        res.status(500).json({ error: true, message: "internal server error" })
    }
}