import {FC, PropsWithChildren} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MainStackNavs} from "modules/navigator/types/navigator.module.types";
import LoginContainer from "modules/user/containers/login/login.container";
import EphiPreviewContainer from "modules/ephi/containers/ephi-preview/ephi-preview.container";
import {IEphi} from "modules/ephi/types/ephi.type";
import EphiFormContainer from "modules/ephi/containers/ephi-form/ephi-form.container";

export type MainStackNavigatorParamList = {
    [MainStackNavs.LOGIN]: undefined;
    [MainStackNavs.EPHI_PREVIEW]: undefined;
    [MainStackNavs.EPHI_FORM]: {ephi: IEphi | null};
}
const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

type MainStackNavigatorProps = {

};

const MainStackNavigator: FC<PropsWithChildren<MainStackNavigatorProps>> = (props) => {

    return (
        <Stack.Navigator>

            <Stack.Screen
                options={{headerShown: false}}
                name={MainStackNavs.LOGIN}
                component={LoginContainer} />

            <Stack.Screen
                options={{headerShown: false}}
                name={MainStackNavs.EPHI_PREVIEW}
                component={EphiPreviewContainer} />

            <Stack.Screen
                options={{headerShown: false}}
                name={MainStackNavs.EPHI_FORM}
                component={EphiFormContainer} />

        </Stack.Navigator>
    );
};{}

export default MainStackNavigator;
