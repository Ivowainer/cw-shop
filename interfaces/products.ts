type ISizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ITypes = 'shirts'|'pants'|'hoodies'|'hats';

export interface IProducts {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ITypes;
    gender: 'men'|'women'|'kid'|'unisex'
}