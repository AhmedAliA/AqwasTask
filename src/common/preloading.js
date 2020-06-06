import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
export default class Preloading extends Component {
    render() {
        const {
            show,
        } = this.props
        if (show) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={'large'} color={'#0b9496'} />
                </View>
            );
        }
        return null;
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a2a2a2',
        opacity: 0.8,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
