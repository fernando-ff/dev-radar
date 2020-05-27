import React, { useState,useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import {  MaterialIcons} from '@expo/vector-icons'


function Main({ navigation }){
    const [ currentRegion, setCurrentRegion] = useState(null); 

    useEffect(() => {
        async function loadInitialPosition(){
            const {granted} = await requestPermissionsAsync();
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
            
                const { latitude, longitude } = coords;
                
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    },[]);
    if(!currentRegion)  return null;
    return (
     <>
        <MapView initialRegion={currentRegion} style={styles.map} >
            <Marker coordinate={} >
                <Image style={styles.avatar} source={{ uri:  }}/>

                <Callout onPress={() => {
                    navigation.navigate('Profile', {github_username })
                }}>
                    <View style={style.callout}>
                        <Text style={styles.devName}></Text>
                        <Text style={styles.devBio}></Text>
                        <Text style={styles.devTechs}></Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={styles.searchForm}>
                <TextInput
                 style={styles.searchInput}
                 placeholder="Buscar devs por techs..."
                 placeholderTextColor="#999"
                 autoCapitalize="words"
                 autoCorrect={false}
                />

                <TouchableOpacity onPress={() => {}} style={style.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },

    avatar:{
        width: 54,
        height:54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },

    callout: {
        width: 260,
    },

    devName: {
       fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    }
})

export default Main;