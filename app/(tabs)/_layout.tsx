import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import Navigation from "../../components/navigation";

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Navigation />
      <Tabs>
        <Tabs.Screen name="index" options={{ headerShown: false, 
            tabBarLabel : 'Home', tabBarLabelPosition : 'beside-icon',
            tabBarIcon : () => <Ionicons name="home" size={24} color="black" />
         }} />
        <Tabs.Screen name="about" options={{ headerShown: false, 
            tabBarLabel : 'About', tabBarLabelPosition : 'beside-icon',
            tabBarIcon : () => <Ionicons name="information-circle" size={24} color="black" />
             }} />
        <Tabs.Screen name="hot" options={{ headerShown: false, 
            tabBarLabel : 'Hot Products', tabBarLabelPosition : 'beside-icon',
            tabBarIcon : () => <Ionicons name="trending-up" size={24} color="black" />
            }} />
        <Tabs.Screen name="product/[symbol]" options={{ href: null, headerShown: false }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});
