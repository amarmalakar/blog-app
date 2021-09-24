import dbConnect from "../../../../helpers/dbConnect";
import Auth from "../../../../helpers/Auth";
import Post from "../../../../Schemas/Post"

dbConnect()

export default async (req, res) => {
    const {
        query: { username, id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                try {
                    await Auth(req, res)
                    try {
                        const find_post = await Post.findOne({ username, _id: id })
                        res.status(200).json({ success: true, data: find_post })
                    } catch (error) {
                        res.status(400).json({ success: false, message: 'Post Not Found' })
                    }
                } catch (error) {
                    res.status(400).json({ success: false, message: 'Invalid Authorization' })
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;

        case 'PUT':
            try {
                try {
                    await Auth(req, res)
                    try {
                        await Post.findOne({ username, _id: id })
                        const postType = await Post.findByIdAndUpdate(id, req.body, {
                            new: true
                        });
        
                        if (!postType) {
                            return res.status(400).json({ success: false })
                        }
        
                        res.status(200).json({ success: true, data: postType })
                    } catch (error) {
                        res.status(400).json({ success: false, message: 'Post Not Found' })
                    }
                } catch (error) {
                    res.status(400).json({ success: false, message: 'Invalid Authorization' })
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;

        case 'DELETE':
            try {
                try {
                    await Auth(req, res)
                    try {
                        await Post.findOne({ username, _id: id })
                        
                        const deletedPost = await Post.deleteOne({ username, _id: id });
                        if (!deletedPost) {
                            return res.status(400).json({ success: false })
                        }

                        res.status(200).json({ success: true, data: {} })
                    } catch (error) {
                        res.status(400).json({ success: false, message: 'Post Not Found' })
                    }
                } catch (error) {
                    res.status(400).json({ success: false, message: 'Invalid Authorization' })
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;
    }
}