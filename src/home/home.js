import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHistory, faBars, faMapMarkerAlt, faImages, faMapPin, faInfoCircle, faHeart, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from "@react-native-mapbox-gl/maps";
import layout from '../layout/layout.js';
import { connect } from 'react-redux';
import { homePropChanged, suggestPlace } from '../actions';
import Preloading from '../common/preloading.js';

MapboxGL.setAccessToken("pk.eyJ1IjoiYWhtZWRtYWxpYTIyMiIsImEiOiJja2F5MnB3amswYTMyMnFwNnJndDZ3eXE0In0.suvmRVmd1Td-Yfg1IyUZ-g");

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

        Geolocation.getCurrentPosition(location => {
            this.props.homePropChanged('currentLocation', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        });
        MapboxGL.setTelemetryEnabled(false);

    }
    renderHeader() {
        return (
            <View style={{
                height: layout.verticalScale(100),
                width: layout.width,
                paddingHorizontal: 15,
                paddingTop: 25,
                backgroundColor: '#0b9496',
                opacity: 0.9,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <FontAwesomeIcon icon={faHistory} color={'white'} size={20} />
                <Image source={require('../assets/logo-header.png')} style={{ aspectRatio: 4.15, width: layout.horizontalScale(140) }} />
                <FontAwesomeIcon icon={faBars} color={'white'} size={20} />
            </View>
        )
    }

    renderRestaurentInfo() {
        const {
            restaurantInfo,
        } = this.props
        return (
            <View style={{
                height: layout.verticalScale(220),
                width: layout.width,
                padding: 15,
                paddingTop: 25,
                backgroundColor: 'rgba(255,255,255,0.8)',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: layout.getAdaptedFontSize(26), textAlign: 'center', color: '#0b9496', fontFamily: 'Avenir-Heavy' }}>
                    {`${restaurantInfo.name}`}
                </Text>
                <Text style={{ fontSize: layout.getAdaptedFontSize(18), textAlign: 'center', color: '#a2a2a2', fontFamily: 'Avenir' }}>
                    {`${restaurantInfo.cat} - ${restaurantInfo.rating}`}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 25
                }}>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} color={'#a2a2a2'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon icon={faExternalLinkAlt} color={'#a2a2a2'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon icon={faHeart} color={'#a2a2a2'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon icon={faImages} color={'#a2a2a2'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.item, { borderRightWidth: 0 }]}>
                        <FontAwesomeIcon icon={faInfoCircle} color={'#a2a2a2'} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderSuggestionDetails() {
        const {
            homeLoading,
            suggestPlace,
            restaurantInfo,
        } = this.props
        return (
            <View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                alignItems: 'center',
                // height: layout.height
            }}>
                {this.renderHeader()}
                {restaurantInfo ? this.renderRestaurentInfo() : null}
            </View>
        )
    }
    render() {
        const {
            currentLocation,
            restaurantInfo,
            suggestPlace,
            homeLoading
        } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street} zoomLevel={10}>
                            <MapboxGL.UserLocation
                                visible={true}
                            />
                            {restaurantInfo ? <MapboxGL.PointAnnotation
                                id={'535'}
                                coordinate={[parseFloat(restaurantInfo.lon), parseFloat(restaurantInfo.lat)]}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} color={'#0b9496'} size={45} />
                            </MapboxGL.PointAnnotation> : null}
                            {currentLocation !== null ? <MapboxGL.Camera zoomLevel={12} centerCoordinate={[currentLocation.longitude, currentLocation.latitude]} /> : null}
                        </MapboxGL.MapView>
                    </View>
                </View>
                {this.renderSuggestionDetails()}
                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: layout.verticalScale(100),
                    width: '70%',
                    height: layout.verticalScale(60),
                    borderRadius: 10,
                    backgroundColor: '#0b9496',
                    justifyContent: 'center'
                }}
                    onPress={() => {
                        suggestPlace()
                    }}
                >
                    <Text style={{ fontSize: layout.getAdaptedFontSize(26), textAlign: 'center', color: '#fff', fontFamily: 'Avenir' }}>
                        {`اقتراح آخر`}
                    </Text>
                </TouchableOpacity>
                <Preloading show={homeLoading} />
            </View>
        );
    }
};


const mapStateToProps = ({ home }) => {
    console.log(home)
    const {
        currentLocation,
        homeLoading,
        restaurantInfo

    } = home
    return {
        currentLocation,
        homeLoading,
        restaurantInfo
    }
}
export default connect(mapStateToProps, {
    homePropChanged,
    suggestPlace
})(Home)

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
    item: {
        width: '20%',
        borderRightWidth: 0.5,
        borderRightColor: '#a2a2a2',
        alignItems: 'center'
    }
});
