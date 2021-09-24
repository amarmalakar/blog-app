const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        heading: String,
        title: String,
        slug: String,
        description: String,
        image: String,
        post: String,
        username: String
    }, {
        timestamps: true
    }
)

export default mongoose.models.Post || mongoose.model('Post', PostSchema);