import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import logomarca from '../../assets/logoMarca.png'
import styles from './styles'

export default function SignUo({ navigation }) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState(null)
 

    const cadastrarUsuario = async () => {
        try {
            const response = await axios.post(
                'http:/adamFilho.pythonanywhere.com/api/create_user/',
                {
                    username: user,
                    password: password
                }
            )
            console.log(response.data.access)

            navigation.navigate('SignUp')

        } catch (error) {
            console.error("Deu Erro:", error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>
               SignUp
            </Text>
            <Text style={styles.title}>
               Faça o seu cadastro
            </Text>
            <TextInput
                placeholder='user'
                onChangeText={setUser}
                value={user}
                style={styles.caixa}
            />
             <TextInput
                placeholder='email'
                onChangeText={setEmail}
                value={email}
                style={styles.caixa}
            />
            <TextInput
                placeholder='password'
                onChangeText={setPassword}
                value={password}
                style={styles.caixa}
                secureTextEntry={true}
            />

            <Pressable
                style={styles.btnLogin}
                onPress={cadastrarUsuario}
            >
                <Text style={{ fontSize: 20 }}>Cadastrar</Text>
            </Pressable>
        </ScrollView>
    )
}
