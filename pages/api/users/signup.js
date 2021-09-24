import dbConnect from "../../../helpers/dbConnect";
import User from '../../../Schemas/User'
import bcrypt from 'bcryptjs'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            try {
                const { fname, lname, username, email, password } = req.body;
                if ( !fname || !email || !username || !password ) {
                    return res.status(422).json({ error: 'Please fill all fields' })
                }

                const user_email = await User.findOne({ email })
                const user_name = await User.findOne({ username })
                if (user_email) {
                    return res.status(422).json({ error: 'Email Already Exists' })
                } else if (user_name) {
                    return res.status(422).json({ error: 'Username Already Exists' })
                } else {

                    const hashedPassword = await bcrypt.hash(password, 12)
                    const newUser = await new User (
                        {
                            fname,
                            lname,
                            email,
                            username,
                            password: hashedPassword
                        }
                    ).save()

                    res.status(200).json({ success: true, message: 'Signup Success', data: newUser })
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message: 'Signup Error' })
            }
            break;
    }
}