import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';
// import { StackActions, } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from "@react-native-mapbox-gl/maps";
import layout from '../layout/layout.js';
import { StackActions } from '@react-navigation/core';
import { homePropChanged, suggestPlace } from '../actions';
import { connect } from 'react-redux';
MapboxGL.setAccessToken("pk.eyJ1IjoiYWhtZWRtYWxpYTIyMiIsImEiOiJja2F5MnB3amswYTMyMnFwNnJndDZ3eXE0In0.suvmRVmd1Td-Yfg1IyUZ-g");

class InitialHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(location => {
            console.log(location)
            this.props.homePropChanged('currentLocation', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        });

        // MapboxGL.setTelemetryEnabled(false);
    }

    render() {
        const {
            currentLocation,
            suggestPlace,
            navigation
        } = this.props
        console.log(currentLocation)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street} zoomLevel={10}>
                            {currentLocation !== null ? <MapboxGL.Camera zoomLevel={12} centerCoordinate={[currentLocation.longitude, currentLocation.latitude]} /> : null}
                        </MapboxGL.MapView>
                    </View>
                </View>
                <View style={{
                    position: 'absolute', left: 0, top: 0, height: layout.height,
                    width: layout.width, backgroundColor: '#0b9496', opacity: 0.8
                }} />
                <View style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Image source={require('../assets/logo-white.png')}
                    />
                    <TouchableOpacity style={{
                        width: '80%',
                        height: layout.verticalScale(70),
                        marginTop: layout.horizontalScale(100),
                        borderRadius: 10,
                        backgroundColor: 'white',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            const resetAction = StackActions.replace('Home')
                            navigation.dispatch(resetAction);
                            suggestPlace()
                        }}
                    >
                        <Text style={{ fontSize: layout.getAdaptedFontSize(26), textAlign: 'center', color: '#0b9496', fontFamily: 'Avenir' }}>
                            {`اقترح`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};


const mapStateToProps = ({ home }) => {
    console.log(home)
    const {
        currentLocation,
    } = home
    return {
        currentLocation,
    }
}
export default connect(mapStateToProps, {
    homePropChanged,
    suggestPlace
})(InitialHome)


const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    container: {
        height: layout.height,
        width: layout.width,
        backgroundColor: "#0b9496"
    },
    map: {
        flex: 1
    },
});
