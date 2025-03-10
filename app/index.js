// app/index.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Import the router

const ListScreen = () => {
  const { width } = Dimensions.get('window');
  const imageWidth = (width - 30) / 2; // Adjust the width to account for margins

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomImages();
  }, []);

  const fetchRandomImages = () => {
    if (loading) return;

    setLoading(true);

    const newImages = Array.from({ length: 10 }, (_, index) => {
      const randomId = Math.floor(Math.random() * 10000) + 1; // Random numeric ID between 1 and 1000
      return {
        id: randomId.toString(), // Convert to string (optional, but consistent with your code)
        imageUrl: `https://picsum.photos/1000?random=${Date.now() + index}`,
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/details/${item.id}`,
          params: { imageUrl: item.imageUrl }, // Pass the image URL as a parameter
        })
      }
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={[styles.image, { width: imageWidth, height: imageWidth }]}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper} // Add space between columns
      onEndReached={fetchRandomImages}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10, // Add padding around the edges of the FlatList
  },
  columnWrapper: {
    justifyContent: 'space-around', // Add space between columns
  },
  image: {
    marginBottom: 10, // Add space between rows
    marginHorizontal: 5,
    resizeMode: 'cover',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ListScreen;