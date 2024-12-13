export interface SearchBarProps {
    onSearch: (query: string, filter: 'title' | 'author') => void;
}