import dbConnect from "../../../helpers/dbConnect"
import User from '../../../Schemas/User'
import Auth from '../../../helpers/Auth'

dbConnect()

export default async (req, res) => {
    const {
        query: { username },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                // const result = await Auth(req, res)
                const find_user = await User.findOne({ username })
                res.status(200).json({ success: true, data: find_user })
            } catch (error) {
                console.log(error.message)
                res.status(400).json({ success: false, message: 'Invalid Authorization' })
            }
            break;
        case 'PUT':
            try {
                const result = await Auth(req, res)

                const find_user = await User.findOne({ username })
                if (!find_user) {
                    return res.status(400).json({ success: false, message: 'User Not Found' })
                }

                const updateUser = await User.updateOne({username}, req.body, {
                    new: true
                })

                if (!updateUser) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: updateUser })
            } catch (error) {
                res.status(400).json({ success: false, message: 'Invalid Authorization' })
            }
            break;
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTFhNzk0YmU5NjJhNjE5MThkM2VkMTMiLCJpYXQiOjE2MjkxMjU0NDEsImV4cCI6MTYyOTczMDI0MX0.lh1UCzi-GuO7U_0kGBNgnXG-Vi9MGuUYOOr5hKxT_a8