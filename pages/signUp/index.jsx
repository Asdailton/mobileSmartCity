import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import logomarca from '../../assets/logoMarca.png'
import styles from './styles'

export default function SignUp({ navigation }) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState(null)

    const authenticateAndRegisterUser = async () => {
       
        const authData = {
            username: 'smart_city',
            password: '123456'
        }

        try {
           
            const authResponse = await axios.post(
                'https://adamfilho.pythonanywhere.com/api/token/',
                authData
            )
            const token = authResponse.data.access
            console.log('Token obtido:', token)

          
            await AsyncStorage.setItem('userToken', token)
            setToken(token)

       
            const data = {
                username: user,
                email: email,
                password: password
            }

          
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

         
            const response = await axios.post(
                'https://adamfilho.pythonanywhere.com/api/create_user/',
                data,
                config
            )
            console.log('Usuário criado:', response.data)

            navigation.navigate('SignIn')
        } catch (error) {
            console.error("Deu Erro:", error)
            if (error.response) {
                console.error('Erro na resposta:', error.response.data)
            } else if (error.request) {
                console.error('Erro na requisição:', error.request)
            } else {
                console.error('Erro:', error.message)
            }
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
                placeholderTextColor="#aaa" 
            />
            <TextInput
                placeholder='email'
                onChangeText={setEmail}
                value={email}
                style={styles.caixa}
                placeholderTextColor="#aaa" 
            />
            <TextInput
                placeholder='password'
                onChangeText={setPassword}
                value={password}
                style={styles.caixa}
                secureTextEntry={true}
                placeholderTextColor="#aaa" 
            />

            <Pressable
                style={styles.btnLogin}
                onPress={authenticateAndRegisterUser}
            >
                <Text style={{ fontSize: 20 }}>Cadastrar</Text>
            </Pressable>
        </ScrollView>
    )
}
