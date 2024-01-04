import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { pokeApi } from '@/api';
import { PokemonListResponse } from '@/interfaces';

const suggestionStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    margin: '5% 0',
    width: '70%',
    borderRadius: '4px',
    zIndex: 999,
    color: 'white',
    textAlign: 'center',
};

const NUMBEROFSUGGESTIONS = 5;

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);
    const [selectedPokemonChange, setSelectedPokemonChange] = useState<boolean>(false);

    const router = useRouter();

    const handleSearch = () => {
        if (selectedSuggestion) {
            router.push(`/name/${selectedSuggestion}`);
        } else if (searchTerm.trim() !== '') {
            router.push(`/name/${searchTerm}`);
        }
        setSelectedSuggestion('');
        setSearchTerm('');
        setSuggestions([]);
        setSelectedSuggestionIndex(0)
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSelectedSuggestion(suggestion);
        setSelectedPokemonChange(!selectedPokemonChange);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleArrowDown();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleArrowUp();
        }
    };

    const handleArrowDown = () => {
        if (suggestions.length > 0) {
            const newIndex = selectedSuggestion !== null ? Math.min(selectedSuggestionIndex + 1, suggestions.length - 1) : 0;
            setSelectedSuggestionIndex(newIndex);
            setSelectedSuggestion(suggestions[newIndex]);
        }
    };

    const handleArrowUp = () => {
        if (suggestions.length > 0) {
            const newIndex = selectedSuggestion !== null ? Math.max(selectedSuggestionIndex - 1, 0) : suggestions.length - 1;
            setSelectedSuggestionIndex(newIndex);
            setSelectedSuggestion(suggestions[newIndex]);
        }
    };

    const handleSuggestionMouseEnter = (index: number) => {
        setSelectedSuggestionIndex(index);
    };

    const handleSuggestionMouseLeave = () => {
        setSelectedSuggestionIndex(null);
    };

    const handleInputChange = async (newValue: string) => {
        setSearchTerm(newValue);

        if (newValue.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=1000`);
            const allPokemonNames = response.data.results.map((result) => result.name);

            const filteredNames = allPokemonNames.filter((name) =>
                name.toLowerCase().includes(newValue.toLowerCase())
            ).slice(0, NUMBEROFSUGGESTIONS);

            setSuggestions(filteredNames);
        } catch (error) {
            console.error('Error searching Pokémon:', error);
            setSuggestions([]);
        }
    };

    useEffect(() => {
        handleSearch()
    }, [selectedPokemonChange])

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Search for a Pokémon"
                    style={{
                        border: '2px solid white',
                        padding: '0 20px',
                        width: '100%',
                        borderRadius: '20px'
                    }}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        border: '2px solid white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        backgroundColor: 'black',
                        margin: '0 2.5%',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul style={suggestionStyle}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => handleSuggestionMouseEnter(index)}
                            onMouseLeave={handleSuggestionMouseLeave}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                backgroundColor: selectedSuggestionIndex === index ? 'rgb(128, 163, 250)' : 'rgb(110, 150, 180)',
                                textTransform: 'capitalize',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default SearchBar;