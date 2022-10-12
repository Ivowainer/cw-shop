import { db } from "."
import { IProducts } from "../interfaces";
import { Product } from "../models";

export const getProductBySlug = async (slug: string): Promise<IProducts | null> => {
    await db.connect();

    const product = await Product.findOne({ slug }).lean()

    await db.disconnect();

    if( !product ) {
        return null;
    }

    return JSON.parse( JSON.stringify(product) );
}