import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Login from './pages/login/login';
import Map from './pages/mapa/mapa';
import Modal from './pages/modal/modal';
import Home from './pages/home';
import SignUo from './pages/signUp';


const  Pilha = createStackNavigator()
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'black',
                    paddingBottom: 1,
                    paddingTop: 1,
                    borderTopColor: 'transparent'
                },
                tabBarActiveTintColor: '#84E4C7',
                tabBarInactiveTintColor: '#555'
            }}

        >
            <Tab.Screen
                name="SignIn"
                component={Login}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />
            {/* <Tab.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            /> */}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Mapa"
                component={Map}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="map" size={size} color={color} />
                    )
                }}
            />
             <Tab.Screen
                name="Detalhes"
                component={Modal}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="custom-icon" size={size} color={color} />

                    )
                }}
            />
               
            
          
         
           
        </Tab.Navigator>
    );
}



export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator>
                <Pilha.Screen
                    name="MyTabs"
                    component={MyTabs}
                    options={{ headerShown: false }}
                />
              
                <Pilha.Screen
                    name="SignIn"
                    component={Login}
                    options={{ headerShown: false }}
                />
                 <Pilha.Screen
                    name="Cadastro"
                    component={SignUo}
                    options={{ headerShown: false }}
                />


                <Pilha.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Pilha.Screen
                    name="Mapa"
                    component={Map}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Modal"
                    component={Modal}
                    options={{ headerShown: false }}
                />

                





            </Pilha.Navigator>
        </NavigationContainer>
    )
}