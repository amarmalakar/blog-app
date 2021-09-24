import dbConnect from "../../../helpers/dbConnect";
import Auth from "../../../helpers/Auth";
import Post from "../../../Schemas/Post"
import User from "../../../Schemas/User"

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            try {
                try {
                    const result = await Auth(req, res)

                    const { heading, title, slug, description, image, post, username } = req.body;

                    if ( !heading || !slug || !post || !username) {
                        return res.status(422).json({ error: 'Please fill all fields' })
                    }


                    const find_username = await User.findOne({ username })
                    const find_post = await Post.findOne({ username, slug })

                    if (!find_username) {
                        return res.status(422).json({ error: 'Ooops! User Not Found' })
                    } else if (find_post) {
                        return res.status(422).json({ error: 'This Slug Name Is Already Exists' })
                    } else {
                        const newPost = await Post.create(
                            { heading, title, slug, description, image, post, username }
                        )
                        res.status(201).json({ success: true, data: newPost, message: 'Post Is Posted' })
                    }
                } catch (error) {
                    res.status(400).json({ success: false, message: 'Invalid Authorization' })
                }
            } catch (error) {
                res.status(400).json({ success: false, message: 'Something Error' })
            }
            break;
    }
}