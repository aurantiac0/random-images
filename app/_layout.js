/*

import { Slot, useRouter, useSegments } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Layout() {
  const router = useRouter();
  const segments = useSegments(); // Obtener los segmentos de la ruta actual

  // Determinar el título y los botones del header según la ruta
  let headerTitle = 'App';
  let showBackButton = false;

  if (segments[0] === 'details') {
    headerTitle = 'Details';
    showBackButton = true;
  } else if (segments.length === 0) {
    headerTitle = 'Home';
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>


      <View style={styles.content}>
        <Slot /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});

*/


import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <>
      {/* Status Bar */}
      <StatusBar
        barStyle="dark-content" // Set the status bar text color (dark-content or light-content)
        backgroundColor="transparent" // Set the background color (Android only)
        translucent={true} // Make the status bar translucent (Android only)
      />
      {/* Stack Navigator */}
      <Stack>
        {/* Home Screen */}
        <Stack.Screen
          name="index"  // Home screen route
          options={{
            headerTitle: 'Home', // Header title for the home screen
            headerStyle: {
              backgroundColor: '#f0f0f0', // Header background color
            },
            headerTitleStyle: {
              fontWeight: 'bold', // Header title style
            },
          }}
        />
        {/* Details Screen */}
        <Stack.Screen
          name="details/[id]" // Details screen route
          options={{
            headerTitle: 'Details', // Header title for the details screen
            headerBackTitle: 'Back', // Back button text
            headerStyle: {
              backgroundColor: '#f0f0f0', // Header background color
            },
            headerTitleStyle: {
              fontWeight: 'bold', // Header title style
            },
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;