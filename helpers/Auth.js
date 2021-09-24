import jwt from 'jsonwebtoken'
import User from '../Schemas/User'

const Auth = async (req, res) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(400).json({error: 'Invalid Anthentication'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
        return res.status(400).json({error: 'Invalid Anthentication'})
    }

    const user = await User.findOne({_id: decoded.userId})
    // return user;
    return {id: user._id};
}

export default Auth