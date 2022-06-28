import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import api from './src/services/api';

import Movies from './src/Movies/index';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('r-api/?api=filmes');
      //console.log(response.data);
      setMovies(response.data);
      setLoading(false);
    }

    loadMovies();

  },[]);

  if(loading) {
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    );
  } else {
    return (
      <View>
        <FlatList 
          data={movies}
          keyExtractor={item => String(item.id)}
          renderItem={ ({ item }) => <Movies data={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});