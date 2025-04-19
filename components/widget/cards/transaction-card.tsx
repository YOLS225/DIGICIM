import {Card, Button, Divider} from 'react-native-paper';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
    label:string;
    amount:number;
}

interface TransactionCardProps {
    data:Array<Transaction>
}

export default function TransactionCard({ data }: TransactionCardProps) {
    return (
        <Card style={{ margin: 16, borderRadius: 12, backgroundColor: "white" }}>
            <Card.Content>
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: "black" }}>
                        Dernières transactions
                    </Text>
                    <Button
                        mode="text"
                        onPress={() => console.log('Bouton pressé')}
                        contentStyle={{ flexDirection: 'row-reverse' }} // Icône à droite
                        icon={() => <Ionicons name="arrow-forward" size={20} color="red" />}
                        labelStyle={{ color: "red", marginLeft: 8 }}
                    >
                        Voir tout
                    </Button>
                </View>

                {/* Divider visible */}
                <Divider bold style={{ backgroundColor: "red", marginBottom: 10 }} />

                {/* Historique */}
                {data?.length > 0 ? (
                    data.map((t: any, i: any) => (
                        <View key={i} style={{ paddingVertical: 6 }}>
                            <Text style={{ color: "black"}}>{t?.label} - {t?.amount} FCFA</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: 'gray', textAlign: 'center', paddingVertical: 20 }}>
                        Aucune donnée
                    </Text>
                )}
            </Card.Content>
        </Card>
    );
}

