import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Menu, Button, Divider } from 'react-native-paper';

interface CountryProps {
    code: string;
    name: string;
}

const countries = [
    { code: 'CI', name: 'Côte d’Ivoire' },
    { code: 'FR', name: 'France' },
    { code: 'US', name: 'États-Unis' },
    { code: 'CA', name: 'Canada' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'SN', name: 'Sénégal' },
    { code: 'NG', name: 'Nigéria' },
    // ajoute d'autres pays ici
];

export const CountryDropdown = ({ label = "Pays", color = "white", textColor = "black" }) => {
    const [visible, setVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSelect = (country:CountryProps) => {
        setSelectedCountry(country.name);
        closeMenu();
    };

    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <TextInput
                        label={label}
                        value={selectedCountry}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: color }]}
                        theme={{ colors: { primary: textColor } }}
                        onFocus={openMenu}
                        right={<TextInput.Icon icon="menu-down" />}
                    />
                }
            >
                {countries.map((country, index) => (
                    <React.Fragment key={country.code}>
                        <Menu.Item onPress={() => handleSelect(country)} title={country.name} />
                        {index < countries.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 25,
    },
    input: {
        width: '100%',
        height: 60,
        alignSelf: 'center',
    },
});
