import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Switch, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../App';

export default function Profile() {
  const { logOut } = useContext(AuthContext);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notifications: {
      orderStatuses: true,
      passwordChanges: true,
      specialOffers: true,
      newsletter: true
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) setUser(JSON.parse(userStr));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const saveChanges = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      alert('Changes saved successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  const updateNotification = (key, value) => {
    setUser(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal information</Text>
      
      <Text style={styles.label}>Avatar</Text>
      <View style={styles.avatarRow}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user.firstName?.[0] || 'U'}</Text>
        </View>
        <Pressable style={styles.changeButton}><Text style={styles.changeButtonText}>Change</Text></Pressable>
        <Pressable style={styles.removeButton}><Text style={styles.removeButtonText}>Remove</Text></Pressable>
      </View>

      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={user.firstName} onChangeText={t => setUser({...user, firstName: t})} />

      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value={user.lastName} onChangeText={t => setUser({...user, lastName: t})} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={user.email} onChangeText={t => setUser({...user, email: t})} keyboardType="email-address" />

      <Text style={styles.label}>Phone number</Text>
      <TextInput style={styles.input} value={user.phone} onChangeText={t => setUser({...user, phone: t})} keyboardType="phone-pad" />

      <Text style={styles.title}>Email notifications</Text>
      
      <View style={styles.checkboxRow}>
        <Switch value={user.notifications?.orderStatuses ?? true} onValueChange={v => updateNotification('orderStatuses', v)} />
        <Text style={styles.checkboxLabel}>Order statuses</Text>
      </View>
      <View style={styles.checkboxRow}>
        <Switch value={user.notifications?.passwordChanges ?? true} onValueChange={v => updateNotification('passwordChanges', v)} />
        <Text style={styles.checkboxLabel}>Password changes</Text>
      </View>
      <View style={styles.checkboxRow}>
        <Switch value={user.notifications?.specialOffers ?? true} onValueChange={v => updateNotification('specialOffers', v)} />
        <Text style={styles.checkboxLabel}>Special offers</Text>
      </View>
      <View style={styles.checkboxRow}>
        <Switch value={user.notifications?.newsletter ?? true} onValueChange={v => updateNotification('newsletter', v)} />
        <Text style={styles.checkboxLabel}>Newsletter</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </Pressable>

      <View style={styles.actionButtons}>
        <Pressable style={styles.discardButton} onPress={() => {}}>
          <Text style={styles.discardButtonText}>Discard changes</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </Pressable>
      </View>
      
      <View style={{height: 50}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#495E57', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  changeButton: { backgroundColor: '#495E57', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginRight: 10 },
  changeButtonText: { color: '#fff', fontWeight: 'bold' },
  removeButton: { borderWidth: 1, borderColor: '#495E57', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  removeButtonText: { color: '#495E57', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkboxLabel: { marginLeft: 10, fontSize: 16 },
  logoutButton: { backgroundColor: '#F4CE14', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20, marginBottom: 20 },
  logoutButtonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  discardButton: { borderWidth: 1, borderColor: '#495E57', padding: 12, borderRadius: 8, flex: 1, marginRight: 10, alignItems: 'center' },
  discardButtonText: { color: '#495E57', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#495E57', padding: 12, borderRadius: 8, flex: 1, marginLeft: 10, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' }
});
