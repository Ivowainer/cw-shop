import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

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
            return checkJWT(req, res)

        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = ''} = req.cookies

    let userId = '';

    try {
        userId = await jwt.isValidToken(token)
    } catch (error) {
        return res.status(401).json({ message: 'Token authorization is not valid' })
    }

    await db.connect()
    const user = await User.findById(userId).lean();
    await db.disconnect()

    if( !user ) {
        return res.status(400).json({ message: "The user doesn't exists with that id" })
    }

    const { _id, email, role, name } = user;

    return res.status(200).json({ 
        token: jwt.signToken( _id, email ), 
        user: { email, role, name }
    })
}