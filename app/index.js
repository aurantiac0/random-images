// app/index.js

/*
 *  @author Jose Naranjo
 *  @date 3-10-2025
 */


import React, {   // Importa la librería principal de React
  useState,       // Importa el hook useState para manejar el estado en componentes funcionales
  useEffect,      // Importa el hook useEffect para realizar efectos secundarios en componentes funcionales
} from 'react';   // Importa desde el módulo 'react'

import { 
  View,                   // Componente para crear contenedores de interfaz de usuario
  StyleSheet,             // Módulo para crear y gestionar estilos
  FlatList,               // Componente para renderizar listas de datos eficientemente
  Image,                  // Componente para mostrar imágenes
  Dimensions,             // Módulo para obtener dimensiones de la pantalla
  ActivityIndicator,      // Componente para mostrar indicadores de carga
  TouchableOpacity        // Componente para crear botones táctiles
} from 'react-native';    // Importa desde el módulo 'react-native'

// Importa el objeto router para la navegación entre pantallas usando expo-router.
import { router } from 'expo-router';


const ListScreen = () => {
  const windowWidth = Dimensions.get('window').width;     // Obtiene el ancho de la pantalla del dispositivo
  const windowHeight = Dimensions.get('window').height;   // Obtiene el alto de la pantalla del dispositivo
  const imageWidth = (windowWidth - 30) / 2;              // Calcula el ancho de cada imagen para 2 columnas

  const [images, setImages] = useState([]);         // Estado para almacenar las imágenes.
  const [loading, setLoading] = useState(false);    // Estado para controlar la carga de imágenes.

  useEffect(() => {
    fetchRandomImages();    // Carga las imágenes aleatorias al montar el componente.
  }, []);                   // Se ejecuta solo una vez al montar el componente.

  const fetchRandomImages = () => {
    if (loading) return;    // Evita múltiples cargas si ya está cargando.

    setLoading(true);       // Inicia la carga.

    const newImages = Array.from({ length: 10 }, (_, index) => {    // Crea un array de 10 objetos de imagen.
      const randomId = Math.floor(Math.random() * 100) + 1;       // Genera un ID aleatorio.
      return {
        id: randomId.toString(), // Convierte el ID a string.
        // Genera una URL de imagen aleatoria.
        imageUrl: `https://picsum.photos/1000?random=${Date.now() + index}`,
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);   // Añade las nuevas imágenes al estado.
    setLoading(false);                                          // Finaliza la carga.
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity                           // Crea un botón táctil para cada imagen.
    onPress={() =>                              // Función ejecutada al presionar el componente TouchableOpacity.
        router.push({                           // Navega a la pantalla de detalles al tocar la imagen.
          pathname: `/details/${item.id}`,      // Ruta a la pantalla de detalles.
          params: { imageUrl: item.imageUrl },  // Pasa la URL de la imagen como parámetro.
        })
      }
    >
      <Image                                                                // Muestra la imagen.
        source={{ uri: item.imageUrl }}                                     // Fuente de la imagen.
        style={[styles.image, { width: imageWidth, height: imageWidth }]}   // Aplica estilos a la imagen.
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;                              // No muestra el footer si no está cargando.
    return (
      <View style={styles.loadingContainer}>                {/* Contenedor del indicador de carga. */}
        <ActivityIndicator size="large" color="#0000ff" />  {/* Muestra el indicador de carga. */}
      </View>
    );
  };

  return (
    <FlatList                                     // Lista de imágenes.
      data={images}                               // Datos de las imágenes.
      renderItem={renderItem}                     // Función para renderizar cada elemento.
      keyExtractor={(item) => item.id}            // Función para extraer la clave única de cada elemento.
      numColumns={2}                              // Número de columnas.
      contentContainerStyle={styles.container}    // Estilos del contenedor de la lista.
      columnWrapperStyle={styles.columnWrapper}   // Añade espacio entre columnas.
      onEndReached={fetchRandomImages}            // Carga más imágenes al llegar al final de la lista.
      onEndReachedThreshold={0.5}                 // Define el umbral para activar onEndReached.
      ListFooterComponent={renderFooter}          // Muestra el footer de carga.
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,    // Permite que la lista crezca si el contenido lo requiere.
    padding: 10,    // Añade padding alrededor de la lista.
  },
  columnWrapper: {
    justifyContent: 'space-around', // Añade espacio entre las columnas.
  },
  image: {
    marginBottom: 10,       // Añade espacio entre las filas.
    marginHorizontal: 5,    // Añade margen horizontal.
    resizeMode: 'cover',    // Ajusta la imagen para cubrir el contenedor.
  },
  loadingContainer: {
    padding: 20,            // Añade padding al contenedor de carga.
    alignItems: 'center',   // Centra el indicador de carga.
  },
});

// Exporta ListScreen como exportación predeterminada para que pueda ser importado en otros archivos.
export default ListScreen;