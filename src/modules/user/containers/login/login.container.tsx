import React, {FC, type PropsWithChildren, useContext, useRef, useState} from 'react';
import {postUpdateContainerStyle as style} from "./login.container.style";
import LoginIcon from 'assets/svgs/login.svg';
import {SafeAreaView} from "react-native-safe-area-context";
import DropdownAlert from 'react-native-dropdownalert';
import {useNavigation} from "@react-navigation/native";
import {
    MainStackNavigatorParamList
} from "modules/navigator/components/main-stack-navigator/main-stack-navigator.component";
import TextField from "core/inputs/text-field/text-field.component";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {UserContext} from "modules/user/contexts/user.context";
import {IUserContextType} from "modules/user/types/user.type";
import {LoginRequest} from "modules/user/requests/login.request";
import {MainStackNavs} from "modules/navigator/types/navigator.module.types";


type PostUpdateProps = {};

const LoginContainer: FC<PropsWithChildren<PostUpdateProps>> = (props) => {

    const navigation = useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();
    const {userSet} = useContext(UserContext) as IUserContextType;
    const [username, usernameSet] = useState('');
    const [password, passwordSet] = useState('');
    const alertRef = useRef(null);

    const submit = () => {

        (async () => {
            try {

                const request = new LoginRequest();
                request.username = username;
                request.password = password;
                const _user = await request.send();
                userSet(_user);
                navigation.navigate(MainStackNavs.EPHI_PREVIEW);
            } catch (e) {
                console.warn(e);
                // @ts-ignore
                alertRef.current?.alertWithType('error', 'Error', e?.message || '');
            }
        })();
    }

    const disableButton = !username || !password;

    return (
        <SafeAreaView style={style.container}>
            <DropdownAlert zIndex={1000000} ref={alertRef}/>
            <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'
                        contentContainerStyle={style.scrollView}>
                <View style={style.login}>
                    <LoginIcon width={100} height={100}/>
                    <View style={{height: 24}}/>
                    <Text style={style.appTitle}>
                        ePHI app
                    </Text>
                </View>
                <View style={{height: 50}}/>
                <TextField label={'Username'}
                           value={username}
                           onChangeText={(text) => usernameSet(text)}/>
                <View style={{height: 20}}/>
                <TextField label={'Password'}
                           value={password}
                           secureTextEntry={true}
                           onChangeText={(text) => passwordSet(text)}/>
                <View style={{height: 20}}/>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => submit()}
                                  disabled={disableButton}
                                  style={[style.saveBtn, disableButton && style.btnDisabled]}>
                    <Text style={style.buttonLabel}>
                        {'Login'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default LoginContainer;
