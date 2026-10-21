import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../telas/Home';
import Perfil from '../telas/Perfil';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#94a3b8',
                tabBarStyle: {
                    backgroundColor: '#1e293b',
                    borderTopColor: '#334155',
                },
            })}
        >
            <Tab.Screen name="Início" component={Home} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    )
}