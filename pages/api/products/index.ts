import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProducts } from '../../../interfaces'
import { Product } from '../../../models'

type Data = { message: string } | IProducts[] 

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {

    await db.connect()
    const products = await Product.find().lean();

    await db.disconnect()

    return res.status(200).json(products)
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getProducts(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

    res.status(200).json({ message: 'Example' })
}

