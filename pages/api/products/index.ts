import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { IProducts } from '../../../interfaces'
import { Product } from '../../../models'

type Data = { message: string } | IProducts[] 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getProducts(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {

    const { gender = 'all' } = req.query

    let coindition = {}

    if(gender !== 'all' && SHOP_CONSTANTS.validGender.includes(`${gender}`)) {
        coindition = { gender };
    }

    await db.connect()    
    const products = await Product.find(coindition).select("title images price inStock slug -_id").lean();

    await db.disconnect()

    return res.status(200).json(products)
}
