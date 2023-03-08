import { StyleSheet } from "react-native";
import Colors from "core/style/colors";

const loginContainerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.White,
        paddingTop: 0,
        padding: 24,
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
    scrollView: {
        paddingTop: 34,
        flexGrow: 1
    },
    login: {
        width: '100%',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});
export { loginContainerStyle as postUpdateContainerStyle };
