import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView, Alert, ActivityIndicator } from 'react-native';
import ButtonOwnerMini from '../components/ButtonOwnerMini';
import axios from 'axios';
import Card from '../components/Card';
import { useSelector } from 'react-redux';

export default function OwnerHome({ navigation }) {

    const [cinemas, setCinemas] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const user = useSelector(state => state.user)

    useEffect(() => {
        setIsLoading(true)
        navigation.setOptions({ title: 'Hola ' + user.name })


        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend-adi-uade.onrender.com/cinemas/owner/${user._id}`);
                setCinemas(response.data.data.docs);
            } catch (e) {
                Alert.alert("Error", "Ha ocurrido un error al importar sus cines, reintente en unos minutos.");
            }
            finally {
                setIsLoading(false)
            }
        };

        fetchData()

    }, [user, navigation])

    const handleCreateCinema = () => {
        navigation.push('CREATE_CINEMA')
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        lettertyperight: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            marginRight: 28
        },
        lettertypeleft: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            marginLeft: 28
        },
        cardContainer: {
            marginVertical: 20,
            marginHorizontal: 16,
        },
        misCinesContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 16,
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/gradient.png')}
                style={styles.container}>
                <ButtonOwnerMini onPress={handleCreateCinema} marginTop={10} title='Agregar Cine +' color='#E01D6F' />
                <View style={styles.misCinesContainer}>
                    <Text style={styles.lettertypeleft}>Mis Cines</Text>
                    <Text style={styles.lettertyperight}>Total: {cinemas.length}</Text>
                </View>
                {isLoading ? (
                    <ActivityIndicator style={styles.loading} size="large" color="#FFFFFF" />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        <View style={styles.cardContainer}>
                            {cinemas.map(cinema => {
                                const activeRoomsCount = cinema.rooms.reduce((count, room) => {
                                    if (room.status === true) {
                                        return count + 1;
                                    }
                                    return count;
                                }, 0);

                                const roomsCount = cinema.rooms.length > 1 ? cinema.rooms.length - 1 : cinema.rooms.length;

                                return (
                                    <Card
                                        key={cinema._id}
                                        title={cinema.name}
                                        description={cinema.address.name}
                                        rooms={roomsCount}
                                        actives={activeRoomsCount}
                                    />
                                );
                            })}
                        </View>

                    </ScrollView>
                )}
            </ImageBackground>
        </SafeAreaView>
    );
}
