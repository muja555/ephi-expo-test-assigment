import { StyleSheet } from "react-native";
import Colors from "core/style/colors";


const textFieldStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        flexDirection: 'row'
    },
    label: {
        color: Colors.Gray1400,
        fontSize: 15,
        marginStart: 8,
    },
    textFieldView: {
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: Colors.Gray300

    },
    textField: {
        flex: 1,
        paddingStart: 8,
    },
    errorMessageView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    errorMessage: {
        color: Colors.Red,
        textAlign: 'right'
    },
});
export { textFieldStyle as textFieldStyle };
