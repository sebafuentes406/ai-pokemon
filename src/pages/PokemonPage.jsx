// PokemonPage.jsx
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';

// Lo que ya tenías para tu Pokédex
export default function PokemonPage() {
    const location = useLocation();
    const prompt = location.state?.prompt || 'No se recibió ningún estado.';

    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [likedPokemons, setLikedPokemons] = useState({});
    const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            setIsLoadingPokemons(true);
            let allPokemons = [];
            let url = 'https://pokeapi.co/api/v2/pokemon?limit=10000';

            try {
                const response = await fetch(url);
                const data = await response.json();
                allPokemons = data.results;
                setPokemons(allPokemons);
                setFilteredPokemons(allPokemons);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            } finally {
                setIsLoadingPokemons(false);
            }
        };

        fetchAllPokemons();
        const storedLikes = JSON.parse(localStorage.getItem('likedPokemons')) || {};
        setLikedPokemons(storedLikes);
    }, []);

    useEffect(() => {
        let currentPokemons = [...pokemons];
        if (searchTerm) {
            currentPokemons = currentPokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        currentPokemons.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setFilteredPokemons(currentPokemons);
    }, [searchTerm, sortOrder, pokemons]);

    const handleLikeClick = (pokemonName) => {
        const newLikedPokemons = { ...likedPokemons };
        if (newLikedPokemons[pokemonName]) {
            delete newLikedPokemons[pokemonName];
        } else {
            newLikedPokemons[pokemonName] = true;
        }
        setLikedPokemons(newLikedPokemons);
        localStorage.setItem('likedPokemons', JSON.stringify(newLikedPokemons));
    };

    const getPokemonImageUrl = (pokemonUrl) => {
        const id = pokemonUrl.split('/').filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>

            <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-8 mt-4 rounded-xl">
                Pokédex
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Buscar Pokémon por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80 transition-all duration-200"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white w-full sm:w-auto transition-all duration-200"
                >
                    <option value="asc">Nombre (A-Z)</option>
                    <option value="desc">Nombre (Z-A)</option>
                </select>
            </div>

            {isLoadingPokemons && (
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <p className="ml-4 text-gray-600 text-lg">Cargando Pokémon...</p>
                </div>
            )}

            {!isLoadingPokemons && filteredPokemons.length === 0 && (
                <div className="text-center text-gray-600 text-lg mt-10">
                    No se encontraron Pokémon que coincidan con tu búsqueda.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredPokemons.map(pokemon => (
                    <div
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden flex flex-col items-center p-4"
                        key={pokemon.name}
                    >
                        <h3 className="text-xl font-semibold capitalize text-gray-800 mb-2">{pokemon.name}</h3>
                        <img
                            src={getPokemonImageUrl(pokemon.url)}
                            alt={pokemon.name}
                            className="w-32 h-32 object-contain mb-3"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/128x128/e0e0e0/555555?text=No+Image`; }}
                        />
                        <div className="flex flex-col gap-2 w-full px-2">
                            <button
                                className={`w-full py-2 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 ${likedPokemons[pokemon.name]
                                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm'
                                    }`}
                                onClick={() => handleLikeClick(pokemon.name)}
                            >
                                {likedPokemons[pokemon.name] ? '❤️ Me gusta' : '🤍 Me gusta'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}