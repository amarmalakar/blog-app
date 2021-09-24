import dbConnect from "../../../helpers/dbConnect";
import Post from "../../../Schemas/Post";

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const readPost = await Post.find()
                res.status(200).json({ success: true, data: readPost })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;
    }
}