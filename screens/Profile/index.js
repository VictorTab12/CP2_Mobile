import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from "firebase/database";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const auth = getAuth();
  const db = getDatabase();
  const user = auth.currentUser;

  useEffect(() => {
    onValue(ref(db, '/users/' + user.uid), (snapshot) => {
    const username = (snapshot.val() && snapshot.val().name) || '';
    setName(username);
    }, {
    onlyOnce: true
    })
  }, [])

  const updateName = () => {
    updateProfile(user, {
    displayName: newName,
    })
    .then(() => {
    console.log('SUCESSO')
    setNewName('')
    })
    .catch((error) => {
    console.log('ERRO', error)
    });
  }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {'Gostaria de trocar de nome?'}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Novo Nome"
        />
        <Button
          title="Change Name"
          onPress={updateName}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-around',
      backgroundColor: '#fdb',
      alignItems: 'center',
      flex: 1,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#eee'
    },
    title: {
      fontSize: 23,
      fontWeight: 'bold'
    }
  });

export default ProfileScreen;