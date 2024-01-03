// components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { pokeApi } from '@/api';
import { PokemonListResponse } from '@/interfaces';

import styles from './searchBar.module.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

    const router = useRouter();

    const handleSearch = () => {
        if (selectedSuggestion) {
            router.push(`/name/${selectedSuggestion}`);
        } else if (searchTerm.trim() !== '') {
            router.push(`/name/${searchTerm}`);
        }
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
            );
            setSuggestions(filteredNames);
        } catch (error) {
            console.error('Error searching Pokémon:', error);
            setSuggestions([]);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [selectedSuggestion]);

    const handleSuggestionClick = (suggestion: string) => {
        setSelectedSuggestion(suggestion);
    };

    return (
        <div className='container'>
            <div className={styles.inputContainer}>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Search for a Pokémon"
                    className={styles.input}
                />
                <button className={styles.button} onClick={handleSearch}>
                    Search
                </button>
            </div>
            <ul className={styles.suggestion}>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className={styles.options}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
