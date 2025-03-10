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


import { StatusBar } from 'react-native'; // Importa el componente StatusBar para personalizar la barra de estado.
import { Stack } from 'expo-router';      // Importa el componente Stack para la navegación basada en pila.

const RootLayout = () => {
  return (
    <>
      {/* Status Bar */}
      <StatusBar
        barStyle="dark-content"         // Establece el color del texto de la barra de estado.
        backgroundColor="transparent"   // Color de fondo de la barra de estado (solo Android).
        translucent={true}              // Barra de estado translúcida (solo Android).
      />
      {/* Stack Navigator */}
      <Stack>
        {/* Home Screen */}
        <Stack.Screen
          name="index"                    // Define la ruta de la pantalla de inicio.
          options={{
            headerTitle: 'Home',          // Título del encabezado de la pantalla de inicio a "Home".
            headerStyle: {
              backgroundColor: '#f0f0f0', // Establece el color de fondo del encabezado a '#f0f0f0'.
            },
            headerTitleStyle: {
              fontWeight: 'bold',         // Establece el estilo del título del encabezado a negrita.
            },
          }}
        />
        {/* Details Screen */}
        <Stack.Screen
          name="details/[id]"             // Define la ruta de la pantalla de detalles.
          options={{
            headerTitle: 'Details',       // Título del encabezado de la pantalla de detalles a "Details".
            headerBackTitle: 'Back',      // Establece el texto del botón de retroceso a "Back".
            headerStyle: {
              backgroundColor: '#f0f0f0', // Establece el color de fondo del encabezado a '#f0f0f0'.
            },
            headerTitleStyle: {
              fontWeight: 'bold',         // Establece el estilo del título del encabezado a negrita.
            },
          }}
        />
      </Stack>
    </>
  );
};

 // Exporta RootLayout como exportación predeterminada para que pueda ser importado en otros archivos.
export default RootLayout;