export interface ListItem {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export function generateMockData(count: number = 2000): ListItem[] {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Toys', 'Automotive'];
    const titles = [
        'Smartphone', 'Laptop', 'Headphones', 'Watch', 'Camera', 'Tablet', 'Speaker', 'Charger',
        'T-Shirt', 'Jeans', 'Shoes', 'Jacket', 'Hat', 'Sunglasses', 'Belt', 'Bag',
        'Novel', 'Textbook', 'Magazine', 'Comic', 'Dictionary', 'Biography', 'Cookbook', 'Manual',
        'Chair', 'Table', 'Lamp', 'Mirror', 'Clock', 'Vase', 'Candle', 'Plant',
        'Ball', 'Racket', 'Shoes', 'Helmet', 'Gloves', 'Water Bottle', 'Towel', 'Mat',
        'Shampoo', 'Soap', 'Cream', 'Perfume', 'Makeup', 'Brush', 'Mirror', 'Towel',
        'Doll', 'Car', 'Puzzle', 'Game', 'Ball', 'Blocks', 'Robot', 'Plane',
        'Tire', 'Oil', 'Filter', 'Battery', 'Brake', 'Light', 'Mirror', 'Tool'
    ];

    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        title: `${titles[index % titles.length]} ${index + 1}`,
        description: `Descripción detallada del producto ${index + 1}. Este es un producto de alta calidad con características excepcionales.`,
        category: categories[index % categories.length],
        price: Math.floor(Math.random() * 1000) + 10,
        image: `https://picsum.photos/200/200?random=${index + 1}`,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));
}

