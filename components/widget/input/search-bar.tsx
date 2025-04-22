import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface Props {
    placeholder?: string;
    onSearchBarChange: (value: string) => void;
    value?: string ;
}
const SimpleSearchBar = ({placeholder,onSearchBarChange,value}:Props) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <Searchbar
            mode={"view"}
            placeholder={placeholder}
            onChangeText={onSearchBarChange}
            value={value ?? ""}
        />
    );
};

export default SimpleSearchBar;