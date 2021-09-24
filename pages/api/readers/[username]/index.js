import dbConnect from "../../../../helpers/dbConnect";
import Post from "../../../../Schemas/Post";

dbConnect()

export default async (req, res) => {
    const {
        query: { username },
        method
    } = req;
    switch (method) {
        case 'GET':
            try {
                const find_post = await Post.find({ username })
                if (find_post) {
                    res.status(200).json({ success: true, data: find_post })
                } else {
                    res.status(400).json({ success: true, message: 'Data Not Fetched' })
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;
    }
}