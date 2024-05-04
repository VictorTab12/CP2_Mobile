import { useState } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const CadastroScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const filterNonNumeric = (text) => text.replace(/[^0-9]/g, '');

  const createProfile = (userUid) => {
    const db = getDatabase();
    set(ref(db, 'users/' + userUid), {
      username: name,
      email: email,
      age: age
    });
  }

  const signUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createProfile(user.uid);
        console.log('SUCESSO DO MÉTODO SIGNUP', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ERRO DO MÉTODO SIGNUP', errorMessage);
      })
      .finally(() => {
        console.log('FINALLY DO MÉTODO SIGNUP');
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastrar
      </Text>
      <View style={{ width: '70%'}}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="senha"
        />
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="nome"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAge(filterNonNumeric(text))}
          value={age}
          placeholder="idade"
          maxLength={3}
        />
      </View>
      <Button
        title="Cadastrar"
        onPress={signUp}
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
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default CadastroScreen;