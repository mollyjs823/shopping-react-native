import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCreds => {
            const user = userCreds.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }

    return ( 
        <KeyboardAvoidingView>
            <View
                style = {styles.container}
            >
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />                
            </View>

            <View style = {styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => { }}
                >
                    <Text style={styles.btnText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ [styles.btn, styles.btnOutline] }
                    onPress={ handleSignUp }
                >
                    <Text style={styles.btnOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    btn: {
        backgroundColor: 'darkslateblue',
        color: '#ffffff',
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
    },
    btnOutline: {
        marginTop: 5,
        backgroundColor: '#fff',
        borderColor: 'darkslateblue',
        borderWidth: 2,
    },
    btnOutlineText: {
        color: 'darkslateblue',
    },
});

export default Login;