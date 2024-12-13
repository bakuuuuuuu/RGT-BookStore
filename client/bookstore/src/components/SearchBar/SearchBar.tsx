import React, { useState } from 'react';
import { SearchBarProps } from '../../types';
import './searchBar.css';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [filter, setFilter] = useState<'title' | 'author'>('title');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value as 'title' | 'author');
    };

    const handleSearch = () => {
        onSearch(query, filter);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <select className="search-filter" value={filter} onChange={handleFilterChange}>
                <option value="title">제목</option>
                <option value="author">저자</option>
            </select>
            <input
                className="search-input"
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력하세요."
            />
            <button className="search-button" onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchBar;