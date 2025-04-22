import { Card, Title } from "react-native-paper";
import {View, StyleSheet, Dimensions, Pressable} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface OperationCardProps {
    icon?: React.ReactNode;
    title?: string;
    onPress?: () => void;
    style?: any;
}

const OperationCard = ({ icon, title, onPress, style }: OperationCardProps) => {
    return (
        <Pressable onPress={onPress}>
            <Card style={[cardStyles.card, style]}>
                <Card.Content style={cardStyles.content}>
                    {icon}
                    <Title style={cardStyles.title}>{title}</Title>
                </Card.Content>
            </Card>
        </Pressable>

    );
};

const OperationsGrid = ({ navigation: { navigate } }: any) => {
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth) / 2.5; // 20 padding horizontal total + 20 espace entre cartes

    return (
        <View style={styles.gridContainer}>
            <View style={styles.row}>
                <OperationCard
                    icon={<FontAwesome5 name="dollar-sign" size={24} color="black" />}
                    title={"Se recharger"}
                    style={[styles.card, { width: cardWidth }]}
                    onPress={()=>navigate('Rechargement')}
                />
                <View style={styles.cardSpacer} />
                <OperationCard
                    icon={<FontAwesome5 name="shopping-cart" size={24} color="black" />}
                    title={"Acheter du ciment"}
                    style={[styles.card, { width: cardWidth }]}
                    onPress={()=>navigate('Factories')}
                />
            </View>

            <View style={styles.row}>
                <OperationCard
                    icon={<FontAwesome5 name="phone-volume" size={24} color="black" />}
                    title={"Nos offres"}
                    style={[styles.card, { width: cardWidth }]}
                    onPress={()=>navigate('Profil')}
                />
                <View style={styles.cardSpacer} />
                <OperationCard
                    icon={<FontAwesome5 name="file-invoice" size={24} color="black" />}
                    title={"Mes commandes"}
                    style={[styles.card, { width: cardWidth }]}
                    onPress={()=>navigate('Profil')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        paddingHorizontal: 10,
        // paddingVertical: 10,
        // right:12
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15, // Espace entre les lignes si nécessaire
    },
    card: {
        height: 120,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: 'white',
    },
    cardSpacer: {
        width: 10, // Espacement horizontal entre les cartes
    },
});

const cardStyles = StyleSheet.create({
    card: {
        borderRadius: 8,
        elevation: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
        marginTop: 8,
    },
});

export { OperationCard };
export default OperationsGrid;