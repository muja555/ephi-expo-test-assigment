import React, {FC, type PropsWithChildren, useContext, useEffect, useState} from 'react';
import {ephiPreviewContainerStyle as style} from "./ephi-preview.container.style";
import PlusIcon from 'assets/svgs/plus.svg';
import EditIcon from 'assets/svgs/edit.svg';
import {Text, TouchableOpacity, View} from 'react-native';
import {UserContext} from "modules/user/contexts/user.context";
import {IUserContextType} from "modules/user/types/user.type";
import {IEphi} from "modules/ephi/types/ephi.type";
import {SafeAreaView} from "react-native-safe-area-context";
import EphiGetRequest from "modules/ephi/requests/ephi-get.request";
import {MainStackNavs} from "modules/navigator/types/navigator.module.types";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    MainStackNavigatorParamList
} from "modules/navigator/components/main-stack-navigator/main-stack-navigator.component";
import {formatDate} from "core/others/utils";

type EphiPreviewContainerProps = {};

const EphiPreviewContainer: FC<PropsWithChildren<EphiPreviewContainerProps>> = (props) => {

    const navigation = useNavigation<NativeStackNavigationProp<MainStackNavigatorParamList>>();
    const {user} = useContext(UserContext) as IUserContextType;
    const [ephi, ephiSet] = useState<IEphi | null>(null);


    useEffect(() => {
        (async () => {

            if (!user || user.ephi_id === null) {
                return;
            }

            try {
                const request = new EphiGetRequest();
                request.ephi_id = user.ephi_id;
                const _ephi = await request.send();

                ephiSet(_ephi);
            } catch (e) {
                console.warn(e);
            }
        })();
    }, [user]);


    const onAddNewPress = () => {
        navigation.push(MainStackNavs.EPHI_FORM, {ephi: null});
    }

    const onPress = () => {
        navigation.push(MainStackNavs.EPHI_FORM, {ephi: ephi});
    }


    const birthdayFormatted = formatDate(ephi?.birthday);

    return (
        <SafeAreaView style={style.container}>
            {
                (!ephi) &&
                <View style={style.emptyView}>
                    <Text style={style.emptyViewTitle}>
                        Add your info to get diagnosed
                    </Text>
                    <View style={{height: 20}}/>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={() => onAddNewPress()}
                                      style={style.addNewBtn}>
                        <PlusIcon width={10}/>
                        <View style={{width: 10}}/>
                        <Text style={style.addNewBtnLabel}>
                            {'Add'}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {
                (!!ephi) &&
                <TouchableOpacity onPress={onPress}>
                    <View style={style.card}>
                        <EditIcon style={style.editIcon}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                First name:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.first_name}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Last name:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.last_name}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Birthday:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {birthdayFormatted}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Phone:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.phone}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Email:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.email}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Social security number:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.ssn}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Health plan number:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.health_plan}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Medical record number:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.mrn}
                            </Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.cardTextBold}>
                                Address:
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text>
                                {ephi.address}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }
        </SafeAreaView>
    );
}

export default EphiPreviewContainer;