import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data = 
| { message: string } 
| {
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case 'POST':
            return registerUser(req, res)

        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = "", password = "", name = "" } = req.body as { email: string, password: string, name: string }

    // Validation
    if( password.length < 6 ) return res.status(400).json({ message: 'The password must contain at least 6 characters' })
    if( name.length < 6 ) return res.status(400).json({ message: 'The name must contain at least 3 characters' })
    if(!validations.isValidEmail( email )){
        return res.status(400).json({ message: 'The email is not valid' })
    }

    await db.connect();
    const user = await User.findOne({ email }).lean();

    if(user){
        await db.disconnect();
        return res.status(400).json({ message: 'Mail already registered' })
    }

    const newUser = new User({ 
        email: email.toLowerCase(), 
        password: bcrypt.hashSync(password), 
        role: 'client',
        name,
    })

    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        return res.status(500).json({ message: "The serverr doesn't response" })
    }

    const { _id } = newUser;

    const token = jwt.signToken( _id, email )

    return res.status(200).json({ 
        token, 
        user: { email, role: 'client', name }
    })
}