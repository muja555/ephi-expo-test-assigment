import { StyleSheet } from "react-native";
import Colors from "core/style/colors";

const ephiFormStyle = StyleSheet.create({
    content: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 20
    },
    saveBtn: {
        width: '100%',
        height: 45,
        borderRadius: 8,
        backgroundColor: Colors.Primary,
        borderColor: Colors.Secondary,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLabel: {
        color: Colors.White,
    },
    btnDisabled: {
        opacity: 0.5
    },
    label: {
        color: Colors.Gray1400,
        fontSize: 15,
        marginStart: 8,
    },
})
export { ephiFormStyle as ephiFormStyle };

