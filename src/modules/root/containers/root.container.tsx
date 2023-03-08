import React from 'react';
import Root from "modules/root/components/root.component";
import {rootContainerStyle as style} from './root.container.style';
import {View} from "react-native";

const RootContainer = () => {

    return (
        <View style={style.container}>
            <Root/>
        </View>
    );
};

export default RootContainer;