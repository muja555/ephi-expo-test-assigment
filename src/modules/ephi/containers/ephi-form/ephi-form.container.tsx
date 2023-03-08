import React, {FC, PropsWithChildren, useContext} from "react";
import BackIcon from 'assets/svgs/back-icon.svg';
import {ephiFormContainerStyle as style} from "./ephi-form.container.style";
import {TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    MainStackNavigatorParamList
} from "modules/navigator/components/main-stack-navigator/main-stack-navigator.component";
import {MainStackNavs} from "modules/navigator/types/navigator.module.types";
import {UserContext} from "modules/user/contexts/user.context";
import {IUserContextType} from "modules/user/types/user.type";
import EphiCreateRequest from "modules/ephi/requests/ephi-create.request";
import UserEphiIdUpdate from "modules/user/requests/user-ephi-id-update.request";
import EphiUpdateRequest from "modules/ephi/requests/ephi-update.request";
import EphiForm, {IEphiFormEvent, IEphiFormValues} from "modules/ephi/components/ephi-form.component";

type EphiFormContainerProps = {

};

const EphiFormContainer: FC<PropsWithChildren<EphiFormContainerProps>> = (props) => {

    const navigation = useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();
    const route = useRoute<RouteProp<MainStackNavigatorParamList, MainStackNavs.EPHI_FORM>>();
    const {
        ephi
    } = route?.params || {};
    const {user, userSet} = useContext(UserContext) as IUserContextType;

    const submit = (payload: IEphiFormValues) => {

        (async () => {
            try {

                if (!user) {
                    return;
                }

                if (ephi) {
                    await submitUpdate(ephi.ephi_id, payload);

                    // Update preview page
                    userSet({...user});
                }
                else {
                    const _ephi = await submitCreate(payload);

                    // Update user corresponding ePHI
                    const requestUpdate = new UserEphiIdUpdate();
                    requestUpdate.user_id = user?.user_id || null;
                    requestUpdate.ephi_id = _ephi.ephi_id;
                    const _user = await requestUpdate.send();

                    // Update preview page
                    userSet({..._user});
                }


                navigation.goBack();
            }
            catch (e) {
                console.warn(e);
            }
        })();
    }

    const submitCreate = async (values: IEphiFormValues) => {
        const requestCreate = new EphiCreateRequest();
        requestCreate.first_name = values.first_name;
        requestCreate.last_name = values.last_name;
        requestCreate.address = values.address;
        requestCreate.birthday = values.birthday;
        requestCreate.health_plan = values.health_plan;
        requestCreate.email = values.email;
        requestCreate.phone = values.phone;
        requestCreate.ssn = values.ssn;
        requestCreate.mrn = values.mrn;
        return await requestCreate.send();
    }

    const submitUpdate = async (ephiId: number, values: IEphiFormValues) => {
        const requestUpdate = new EphiUpdateRequest();
        requestUpdate.ephi_id = ephiId;
        requestUpdate.first_name = values.first_name;
        requestUpdate.last_name = values.last_name;
        requestUpdate.address = values.address;
        requestUpdate.birthday = values.birthday;
        requestUpdate.health_plan = values.health_plan;
        requestUpdate.email = values.email;
        requestUpdate.phone = values.phone;
        requestUpdate.ssn = values.ssn;
        requestUpdate.mrn = values.mrn;

        return await requestUpdate.send();
    }

    const onChange = (event: IEphiFormEvent) => {
        if (event.type === 'SUBMIT') {
            submit(event.payload);
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <TouchableOpacity style={style.backBtn} onPress={navigation.goBack}>
                    <BackIcon/>
                </TouchableOpacity>
            </View>
           <EphiForm ephi={ephi} onChange={onChange}/>
        </SafeAreaView>
    );
}

export default EphiFormContainer;