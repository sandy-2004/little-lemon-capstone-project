import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../App';

export default function Onboarding() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const { completeOnboarding } = useContext(AuthContext);

  const isFormValid = firstName.trim().length > 0 && email.trim().length > 0;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/LittleLemonLogo.png?raw=true' }} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <View style={styles.heroContent}>
          <Text style={styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          <Image source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/capstone/hero.png?raw=true' }} style={styles.heroImage} />
        </View>
      </View>
      <View style={styles.formSection}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="Your name" />
        <Text style={styles.label}>Email *</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Your email" keyboardType="email-address" autoCapitalize="none" />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, !isFormValid && styles.buttonDisabled]} 
          disabled={!isFormValid} 
          onPress={() => completeOnboarding({ firstName, email, lastName: '', phone: '', notifications: { orderStatuses: true, passwordChanges: true, specialOffers: true, newsletter: true } })}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 80, justifyContent: 'center', alignItems: 'center', paddingTop: 20 },
  logo: { width: 150, height: 40 },
  heroSection: { backgroundColor: '#495E57', padding: 20 },
  heroTitle: { color: '#F4CE14', fontSize: 40, fontWeight: 'bold' },
  heroSubtitle: { color: '#fff', fontSize: 24, marginBottom: 10 },
  heroContent: { flexDirection: 'row', justifyContent: 'space-between' },
  heroText: { color: '#fff', flex: 1, marginRight: 10, fontSize: 16 },
  heroImage: { width: 100, height: 100, borderRadius: 10 },
  formSection: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 20 },
  buttonContainer: { padding: 20, backgroundColor: '#f0f0f0', alignItems: 'flex-end' },
  button: { backgroundColor: '#CBD2CE', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
  buttonDisabled: { backgroundColor: '#e0e0e0' },
  buttonText: { fontSize: 18, color: '#333', fontWeight: 'bold' },
});
