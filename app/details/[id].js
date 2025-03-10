// app/details/[id].js

import React, {
  useState,
  useEffect
} from 'react'; // Importa React y los hooks useState y useEffect.

import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions } from 'react-native'; // Importa componentes y módulos de React Native.

import {
  useLocalSearchParams
} from 'expo-router'; // Importa el hook useLocalSearchParams de expo-router.

const Details = () => {
  const { id, imageUrl } = useLocalSearchParams();          // Obtiene el 'id' y 'imageUrl' de los parámetros de la URL.
  const [imageDetails, setImageDetails] = useState(null);   // Estado para almacenar los detalles de la imagen.
  const [loading, setLoading] = useState(true);             // Estado para controlar la carga de los detalles de la imagen.

  useEffect(() => {
    // Función asíncrona para obtener los detalles de la imagen.
    const fetchImageDetails = async () => {
      try {
        // Realiza una petición a la API de Picsum para obtener los metadatos de la imagen usando el 'id'.
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        if (!response.ok) {
          throw new Error('Failed to fetch image details');     // Lanza un error si la respuesta no es exitosa.
        }
        const data = await response.json(); // Convierte la respuesta a JSON.
        setImageDetails(data);              // Actualiza el estado con los detalles de la imagen.
      } catch (error) {
        console.error('Error fetching image details:', error);  // Maneja los errores de la petición.
      } finally {
        setLoading(false);    // Establece la carga como falsa, independientemente del resultado.
      }
    };

    fetchImageDetails();      // Llama a la función para obtener los detalles de la imagen.
  }, [id]);                   // Se ejecuta cuando el 'id' cambia.

  if (loading) {              // Si 'loading' es verdadero (la carga está en progreso).
    return (
      <View style={styles.loadingContainer}>                {/* Muestra un contenedor de carga. */}
        <ActivityIndicator size="large" color="#0000ff" />  {/* Muestra un indicador de carga. */}
      </View>
    );
  }

  if (!imageDetails) { // Si 'imageDetails' es nulo o indefinido (no se encontraron detalles de la imagen).
    return (
      <View style={styles.container}>                   {/* Muestra un mensaje de error. */}
        <Text>No details found for this image.</Text>   {/* Texto del mensaje de error. */}
      </View>
    );
  }

  return (
    <View style={styles.container}> {/* Contenedor principal de la pantalla de detalles. */}
      {/* Image Container */}
      <View style={styles.imageContainer}> {/* Contenedor de la imagen y metadatos. */} 
        <Image
          source={{ uri: imageUrl || imageDetails.download_url }} // Usa 'imageUrl' pasado o la URL de la API como fuente de la imagen.
          style={styles.image} // Aplica estilos a la imagen.
        />
        {/* Metadata Overlay */}
        <View style={styles.metadataOverlay}>
          <Text style={styles.metadataText}>Author: {imageDetails.author}</Text>
          <Text style={styles.metadataText}>Width: {imageDetails.width}</Text>
          <Text style={styles.metadataText}>Height: {imageDetails.height}</Text>
          {/*<Text style={styles.metadataText}>ID: {imageDetails.id}</Text>*/} {/* Comentado: Muestra el ID de la imagen (de la API). */}
          {/*<Text style={styles.metadataText}>ID: {id}</Text>*/} {/* Comentado: Muestra el ID de la imagen (de los parámetros). */}
          <Text style={styles.metadataText}> {imageUrl || imageDetails.download_url}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla.

const styles = StyleSheet.create({
  container: {
    flex: 1,                        // El contenedor ocupa todo el espacio disponible.
    alignItems: 'center',           // Centra los elementos horizontalmente.
    justifyContent: 'center',       // Centra los elementos verticalmente.
    padding: 20,                    // Añade padding al contenedor.
  },
  imageContainer: {
    position: 'relative',           // Necesario para posicionar la superposición absolutamente.
    width: width * 0.85,            // 85% del ancho de la pantalla.
    height: width * 0.85,           // Hace que el contenedor sea cuadrado.
    borderRadius: 10,               // Opcional: añade esquinas redondeadas.
    overflow: 'hidden',             // Asegura que la imagen y la superposición permanezcan dentro del contenedor.
  },
  image: {
    width: '100%',                  // La imagen ocupa todo el ancho del contenedor.
    height: '100%',                 // La imagen ocupa todo el alto del contenedor.
    resizeMode: 'cover',            // Asegura que la imagen cubra todo el espacio.
  },
  metadataOverlay: {
    position: 'absolute',           // Posiciona la superposición absolutamente.
    bottom: 0,                      // Coloca la superposición en la parte inferior de la imagen.
    left: "62%",                    // Posiciona la superposición horizontalmente.
    right: 1,
    borderTopLeftRadius: 10,        // Borde redondeado en la esquina superior izquierda del elemento.
    borderBottomRightRadius: 10,    // Borde redondeado en la esquina inferior derecha del elemento.
    // Fondo negro semitransparente.
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingRight: 10,               // Margen interno del lado derecho del elemento.
    paddingTop: 10,                 // Margen interno de la parte superior del elemento.
    paddingBottom: 5,               // Margen interno de la parte inferior del elemento.
  },
  metadataText: {
    color: 'white',                 // Texto blanco para contraste.
    fontSize: 12,                   // Tamaño de la fuente.
    marginBottom: 3,                // Espacio entre líneas de texto.
    textAlign: "right",             // Alinea el texto a la derecha.
  },
  loadingContainer: {
    flex: 1,                        // El contenedor ocupa todo el espacio disponible.
    justifyContent: 'center',       // Centra los elementos verticalmente.
    alignItems: 'center',           // Centra los elementos horizontalmente.
  },
});

export default Details; // Exporta el componente Details para ser usado en otras partes de la aplicación.