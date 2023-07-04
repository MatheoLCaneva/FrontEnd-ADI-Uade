import React from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function BackArrow(props) {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image style={{ height: 20, width: 40 }} source={require('../../assets/icons/arrowleft.png')} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {}
})