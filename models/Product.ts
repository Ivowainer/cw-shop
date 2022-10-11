import mongoose from 'mongoose';
import { IProducts } from '../interfaces';

const productSchema = new mongoose.Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS','S','M','L','XL','XXL', 'XXXL'],
            message: "{VALUE} it's not an allowed size"
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: { 
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: "{VALUE} it's not an allowed type"
        }
     },
    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: "{VALUE} it's not an allowed gender"
        }
    }
}, {
    timestamps: true
});

productSchema.index({ title: 'text', tags: 'text' });

const Product: mongoose.Model<IProducts> = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product