import { useSearchStore } from '../stores/searchStore';
import products from '../data/products';

const SearchResults = () => {
    const { searchTerm } = useSearchStore();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return(
        <div>
            <h2>Search results for "{searchTerm}"</h2>
            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) :(
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;