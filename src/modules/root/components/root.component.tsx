import React, {FC, PropsWithChildren} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainStackNavigator from "modules/navigator/components/main-stack-navigator/main-stack-navigator.component";
import {UserProvider} from "modules/user/contexts/user.context";

type RootProps = {};

const Root: FC<PropsWithChildren<RootProps>> = (props) => {

    return (
        <UserProvider>
            <NavigationContainer>
                <MainStackNavigator/>
            </NavigationContainer>
        </UserProvider>
    );
};

export default Root;