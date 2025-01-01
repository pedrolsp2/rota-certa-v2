/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { primary } from '@/config/colors';
import { Tabs } from 'expo-router';
import { History, House, MapPinned, User, Map } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent;
          switch (route.name) {
            case 'index':
              IconComponent = House;
              break;
            case 'minhas-rotas':
              IconComponent = Map;
              break;
            case 'nova-rota':
              IconComponent = MapPinned;
              break;
            case 'historico':
              IconComponent = History;
              break;
            case 'perfil':
              IconComponent = User;
              break;
            default:
              IconComponent = House;
          }
          return <IconComponent size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: primary[500],
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: theme === 'dark' ? '#171717' : '#fafafa',
          borderTopWidth: 0,
        },
      })}>
      <Tabs.Screen name="nova-rota" options={{ title: 'Nova rota' }} />
      <Tabs.Screen name="minhas-rotas" options={{ title: 'Minhas rotas' }} />
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="historico" options={{ title: 'Histórico' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
