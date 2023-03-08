import React, {FC, PropsWithChildren} from "react";
import {Text, TextInput, TextInputProps, View} from "react-native";

import {textFieldStyle as style} from './text-field.component.style';

export type TextFieldProps =  TextInputProps & {
    label?: string,
    errorMessage?: string,
};

const TextField: FC<PropsWithChildren<TextFieldProps>> = (props) => {

    const {
        label = '',
        errorMessage = '',
        multiline = false,
        ...rest
    } = props;

    return (
      <View>
          <View style={style.head}>
              {
                (label !== '') &&
                <Text style={style.label}>{label}</Text>
              }
              {
                (errorMessage !== '') &&
                <View style={style.errorMessageView}>
                    <Text style={style.errorMessage}>{errorMessage}</Text>
                </View>
              }
          </View>
          <View style={{height: 5}}/>
          <View style={[style.textFieldView, {height: multiline ? 90: 45}]}>
              <TextInput
                style={[style.textField, {height: multiline ? 90: 45}]}
                multiline={multiline}
                {...rest}
              />
          </View>

      </View>
    );
};

export default TextField;
