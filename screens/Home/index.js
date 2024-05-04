import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Jogo da Veia
        </Text>
        <Image source={'assets/home.png'} style={styles.image} />
        <Button
          title="Play"
          onPress={() => navigation.navigate('Game')}
        />
        <Button
        title="Sair"
        onPress={() => signOut(auth)}
      />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
      justifyContent: 'space-around',
      backgroundColor: '#191970',
      alignItems: 'center',
      flex: 1,
  },
  title: {
      fontWeight: 'bold',
      fontSize: '50px',
      color: '#842'
  },
  image: {
    width: '30%',
    aspectRatio: 1
  },
})

export default HomeScreen;