import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProducts } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProducts

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return getProductBySlug(req, res)
        
        default:
            return res.status(404).json({ message: 'Bad Request' })
    }
    
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query

    try {
        await db.connect();
        const product = await Product.find({ slug })
        await db.disconnect();

        if(!product){
            return res.status(404).json({ message: 'Product not found'})
        }

        res.status(200).json(product )
    } catch (error) {
        console.log(error)
    }
}