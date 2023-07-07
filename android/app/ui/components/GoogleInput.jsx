import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            textInputProps={{ placeholderTextColor: 'black', cursorColor: 'black' }}
            fetchDetails={true}
            styles={{
                textInput: {
                    backgroundColor: 'white',
                    borderRadius: 20,
                    marginTop: 32,
                    marginHorizontal: 32,
                    paddingLeft: 20,
                    color: 'black'
                },
                description: {
                    color: 'black'
                },
                keyboardAvoidingContainer: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                listView: {
                    backgroundColor: 'white',
                    marginHorizontal: 30,
                    marginTop: 5,
                }
            }}

            onPress={(data, details = null) => {
                console.log(details)
                // handleAddressChange(details)
            }}

            query={{
                key: 'AIzaSyCldpYhbjqR9JMKXBdEEagYWxnqlS1jyAA',
                language: 'es',
            }}

            onFail={error => console.log(error)} onNotFound={() => console.log('no results')}
        />
    );
};

export default GooglePlacesInput;