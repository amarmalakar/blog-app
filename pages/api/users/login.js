import dbConnect from "../../../helpers/dbConnect";
import User from '../../../Schemas/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            try {
                const { email, password } = req.body;

                if ( !email || !password ) {
                    return res.status(422).json({ error: 'Please fill all fields' })
                }

                const user = await User.findOne({ email })
                if (!user) {
                    return res.status(422).json({ error: 'Please Enter Valid Ingredients' })
                }

                const doMatch = await bcrypt.compare(password, user.password)

                if (doMatch) {
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                        expiresIn: '7d'
                    })
                    // const {name, role, email} = user
                    const { fname, lname, username, role, email } = user
                    // res.status(201).json({token, user:{name, role, email} })
                    res.status(201).json({token, user:{ fname, lname, username, role, email } })
                } else {
                    return res.status(401).json({ error: 'Please Enter Valid Ingredients' })
                }
            } catch (error) {
                res.status(400).json({ success: false, message: 'Login Error' })
            }
            break;
    }
}