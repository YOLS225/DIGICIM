import React from 'react';
import {
    StyleProp,
    ViewStyle,
    Animated,
    StyleSheet,
    Platform,
    ScrollView,
    Text,
    SafeAreaView,
    I18nManager,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

const FloatingButton = ({
                         animatedValue,
                         visible,
                         extended,
                         label,
                         animateFrom,
                         style,
                         iconMode,
                     }:any) => {
    const [isExtended, setIsExtended] = React.useState(true);

    const isIOS = Platform.OS === 'ios';

    const onScroll = ({ nativeEvent }:any) => {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

        setIsExtended(currentScrollPosition <= 0);
    };

    const fabStyle = { [animateFrom]: 16 };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView onScroll={onScroll}>
                <Text>essaie</Text>
            </ScrollView>
            <AnimatedFAB
                icon={'plus'}
                label={'Label'}
                extended={isExtended}
                onPress={() => console.log('Pressed')}
                visible={visible}
                animateFrom={'right'}
                iconMode={'static'}
                style={[styles.fabStyle, style, fabStyle]}
            />
        </SafeAreaView>
    );
};

export default FloatingButton;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});