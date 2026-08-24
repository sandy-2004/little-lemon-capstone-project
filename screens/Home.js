import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const categories = ['starters', 'mains', 'desserts', 'drinks'];

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  
  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) setUser(JSON.parse(userStr));
      } catch (error) {
        console.error(error);
      }
    };
    
    // Refresh user data when screen is focused
    const unsubscribe = navigation.addListener('focus', loadUser);
    loadUser();
    
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        const menuItems = json.menu.map((item, index) => ({
          ...item,
          id: index.toString(),
          image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/capstone/images/${item.image}?raw=true`
        }));
        setData(menuItems);
        setFilteredData(menuItems);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    let result = data;
    if (activeCategories.length > 0) {
      result = result.filter(item => activeCategories.includes(item.category));
    }
    if (searchQuery) {
      result = result.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredData(result);
  }, [activeCategories, searchQuery, data]);

  const handleCategoryPress = (category) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) return prev.filter(c => c !== category);
      return [...prev, category];
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemTitle}>{item.name}</Text>
        <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Image source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/LittleLemonLogo.png?raw=true' }} style={styles.logo} resizeMode="contain" />
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.firstName?.[0] || 'U'}</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <View style={styles.heroContent}>
          <Text style={styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          <Image source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/capstone/hero.png?raw=true' }} style={styles.heroImage} />
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#333" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search" 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
          />
        </View>
      </View>

      <View style={styles.filtersSection}>
        <Text style={styles.filtersTitle}>ORDER FOR DELIVERY!</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {categories.map(category => (
            <Pressable 
              key={category} 
              style={[styles.filterButton, activeCategories.includes(category) && styles.filterButtonActive]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[styles.filterText, activeCategories.includes(category) && styles.filterTextActive]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 40 },
  logo: { width: 150, height: 40 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#495E57', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  heroSection: { backgroundColor: '#495E57', padding: 20 },
  heroTitle: { color: '#F4CE14', fontSize: 40, fontWeight: 'bold' },
  heroSubtitle: { color: '#fff', fontSize: 24, marginBottom: 10 },
  heroContent: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  heroText: { color: '#fff', flex: 1, marginRight: 10, fontSize: 16 },
  heroImage: { width: 100, height: 100, borderRadius: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, height: 40 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  filtersSection: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  filtersTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  filtersScroll: { flexDirection: 'row' },
  filterButton: { backgroundColor: '#eee', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  filterButtonActive: { backgroundColor: '#495E57' },
  filterText: { fontWeight: 'bold', color: '#495E57' },
  filterTextActive: { color: '#fff' },
  listContainer: { paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', paddingVertical: 15 },
  menuItemTextContainer: { flex: 1, marginRight: 15 },
  menuItemTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  menuItemDesc: { color: '#666', marginBottom: 5 },
  menuItemPrice: { fontSize: 18, fontWeight: 'bold', color: '#495E57' },
  menuItemImage: { width: 80, height: 80, borderRadius: 10 },
  separator: { height: 1, backgroundColor: '#eee' }
});
