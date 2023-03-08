import { StyleSheet } from "react-native";
import Colors from "core/style/colors";

const ephiPreviewContainerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyViewTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    addNewBtn: {
        flexDirection: 'row',
        width: 150,
        height: 45,
        borderRadius: 8,
        backgroundColor: Colors.Primary,
        borderColor: Colors.Secondary,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNewBtnLabel: {
        fontSize: 16,
        color: Colors.White,
    },
    card: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.Gray900,
        shadowColor: Colors.Black,
        backgroundColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cardTextBold: {
        fontWeight: 'bold',
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
    }
})
export { ephiPreviewContainerStyle as ephiPreviewContainerStyle };

