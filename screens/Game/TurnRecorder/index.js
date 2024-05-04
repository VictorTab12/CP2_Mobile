import { View, Text, StyleSheet } from "react-native"

// Esse componente deve mostrar o jogador ativo, ou seja,
// O que tem a jogada a fazer
const TurnRecorder = ({playerName, playerId}) => {
    return (<View style={{...styles.container, backgroundColor: playerId === 1 ? '#acf' : '#fca'}}>
        <Text style={styles.text}>
            {playerName}
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        borderWidth: 2,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 2,
    }
})

export default TurnRecorder;