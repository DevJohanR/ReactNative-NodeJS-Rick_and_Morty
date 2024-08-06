import React, { useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = 1; // Puedes cambiar este ID por el ID del personaje que quieras buscar // att johan // esto es un test 

  useEffect(() => {
    fetch(`https://rym2.up.railway.app/api/character/${id}?key=pi-riascosjohan333`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching character:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00ff00" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!character) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">No se encontró el personaje.</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={{ uri: character.image }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <Text className="text-blue-500 text-xl font-bold">{character.name}</Text>
      <Text className="text-gray-500">{character.status} - {character.species}</Text>
      <Text className="text-gray-500">{character.gender}</Text>
      <Text className="text-gray-500">Origen: {character.origin.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
