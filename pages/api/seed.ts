import type { NextApiRequest, NextApiResponse } from 'next'

import { Product } from '../../models';

import { seedDatabase } from '../../database'
import conectarDB from '../../database/db';

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: "Don't have access to API" })
    }

    await conectarDB();

    await Product.deleteMany()
    await Product.insertMany( seedDatabase.initialData.products )

    /* await db.disconnect() */

    res.status(200).json({ message: 'Process succesfully' })
}