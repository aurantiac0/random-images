// app/details/[id].js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Details = () => {
  const { id, imageUrl } = useLocalSearchParams(); // Get the `id` and `imageUrl` from the URL
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        // Fetch metadata for the image using the `id`
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        if (!response.ok) {
          throw new Error('Failed to fetch image details');
        }
        const data = await response.json();
        setImageDetails(data);
      } catch (error) {
        console.error('Error fetching image details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!imageDetails) {
    return (
      <View style={styles.container}>
        <Text>No details found for this image.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl || imageDetails.download_url }} // Use the passed `imageUrl` or fallback to the API URL
          style={styles.image}
        />
        {/* Metadata Overlay */}
        <View style={styles.metadataOverlay}>
          <Text style={styles.metadataText}>Author: {imageDetails.author}</Text>
          <Text style={styles.metadataText}>Width: {imageDetails.width}</Text>
          <Text style={styles.metadataText}>Height: {imageDetails.height}</Text>
          {/*<Text style={styles.metadataText}>ID: {imageDetails.id}</Text>*/}
          {/*<Text style={styles.metadataText}>ID: {id}</Text>*/}
          <Text style={styles.metadataText}> {imageUrl || imageDetails.download_url}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window'); // Get the screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'relative', // Needed for absolute positioning of the overlay
    width: width * 0.85, // 90% of the screen width
    height: width * 0.85, // Make it a square (or adjust height as needed)
    borderRadius: 10, // Optional: Add rounded corners
    overflow: 'hidden', // Ensure the image and overlay stay within the container
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire space
  },
  metadataOverlay: {
    position: 'absolute', // Position the overlay absolutely
    bottom: 0, // Place the overlay at the bottom of the image
    left: "62%",
    right: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  metadataText: {
    color: 'white', // White text for contrast
    fontSize: 12,
    marginBottom: 3, // Space between text lines
    textAlign: "right",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;