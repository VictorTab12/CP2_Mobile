import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const Table = ({ onCellClicked, tableState }) => {
    return (
        <View style={styles.table}>
            {
                tableState.map((cellState, id) => {
                    return(
                        <Cell
                            onClick={onCellClicked}
                            id={id}
                            key={id}
                            cellState={cellState}
                        />)
                })
            }
        </View>
    );
  }

const styles = StyleSheet.create({
    table: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '30%',
        aspectRatio: 1,
        backgroundColor: '#fff',
        padding: -10,
    }
})

export default Table;