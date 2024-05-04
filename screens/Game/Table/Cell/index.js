import { useState } from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';

const Cell = ({ id, cellState = id % 3, onClick }) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const imgSrc = `assets/pieces/peca${cellState}.png`
    
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '33.3%', height: '33.3%' }}>
        <Pressable 
          onLongPress={() => setShowFeedback(false)} // Deve cancelar o toque
          onPressIn={() => setShowFeedback(true)} // Deve fornecer feedback visual do quadrado escolhido
          onPress={() => onClick(id)} // Deve fazer a jogada usando o onClick
          onPressOut={() => setShowFeedback(false)} // Cancela o feedback na jogada normal
          style={[styles.pressable, {backgroundColor: showFeedback ? '#eea' : '#fff'}]}
          disabled={cellState !== 0}
          delayLongPress={2000} // 2 segundos para cancelar a jogada
        >
              {
                cellState !== 0 && <Image source={imgSrc} style={styles.pieceImg} />
              }
        </Pressable>
      </View>
    );
  }

const styles = StyleSheet.create({
  pieceImg: {
    width: '100%',
    aspectRatio: 1
  },
  pressable: {
    width: '100%',
    height: '100%',
    padding: 10,
    borderWidth: 3,
    borderColor: '#222'
  }
})

export default Cell;