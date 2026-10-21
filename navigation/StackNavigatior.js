import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Jogo from '../telas/Jogo';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TelaPrincipal" component={BottomTabNavigator} />
            <Stack.Screen
                name="Jogo"
                component={Jogo}
                options={{
                    headerShown: true,
                    title: 'Detalhes',
                    headerStyle: { backgroundColor: '#1e293b', borderBottomColor: '#1e293b' },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    )
}