/*
 *  CREAR UNA APLICACION EN REACT NATIVE CON EXPO
 *
 *  Requisitos:
 *  1. Pantalla Principal
 *      a.  Mostrar una cuadrícula de imágenes en dos columnas.
 *      b.  Cargar más imágenes automáticamente cuando el usuario se
 *          desplace hacia abajo (desplazamiento infinito).
 *      c.  Cada imagen debe ser un elemento táctil que redirija a una
 *          pantalla de detalles.
 *  2. Pantalla de Detalles
 *      a.  Mostrar la imagen seleccionada en el centro de la pantalla.
 *      b.  Mostrar información adicional (Ej: autor, ancho y alto).
 *      c.  Implementar navegación entre la pantalla principal y la
 *          pantalla de detalles.
 *  3. API
 *      a.  Emplear la API de generación de imágenes aleatoria de
 *          Picsum.
 *  4. Estilos
 *      a.  Aplicar estilos para que la aplicación sea responsive.
 *
 *  Dependencias:
 *  - React
 *  - React Native
 *
 *  @author Jose Naranjo
 *  @date 3-10-2025
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