import dbConnect from "../../../../helpers/dbConnect";
import Auth from "../../../../helpers/Auth";
import Post from "../../../../Schemas/Post"

dbConnect()

export default async (req, res) => {
    const {
        query: { username },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const authorization = await Auth(req, res)
                const find_post = await Post.find({ username })
                res.status(200).json({ success: true, data: find_post })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;
    }
}