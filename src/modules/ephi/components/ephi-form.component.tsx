import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {ephiFormStyle as style} from "modules/ephi/components/ephi-form.component.style";
import {IEphi} from "modules/ephi/types/ephi.type";
import {KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import TextField from "core/inputs/text-field/text-field.component";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Joi, {AnySchema} from "joi";

type EphiFormProps = {
    ephi: IEphi | null,
    onChange: (event: IEphiFormEvent) => void
};

export type IEphiFormValues = {
    first_name: string | null,
    last_name: string | null,
    address: string | null,
    birthday: Date,
    health_plan: number | null,
    phone: string | null,
    email: string | null,
    ssn: number | null,
    mrn: number | null,
}

export type IEphiFormEvent = {
    type: "SUBMIT",
    payload: IEphiFormValues
}

type IFormErrors = {
    [Key in keyof IEphiFormValues]?: string
}

type IFormSchema = {
    [Key in keyof IEphiFormValues]?: AnySchema;
}

const schema: IFormSchema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    birthday: Joi.date().required(),
    health_plan: Joi.number().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    ssn: Joi.number().required(),
    mrn: Joi.number().required(),
};

const initialValues: IEphiFormValues = {
    first_name: '',
    last_name: '',
    address: '',
    birthday: new Date(),
    health_plan: null,
    email: '',
    phone: '',
    ssn: null,
    mrn: null,
}

const EphiForm: FC<PropsWithChildren<EphiFormProps>> = (props) => {

    const {
        ephi,
        onChange = (event) => {}
    } = props;


    const [formValues, formValuesSet] = useState<IEphiFormValues>(initialValues);
    const [errorMessages, errorMessagesSet] = useState<IFormErrors>({});


    useEffect(() => {
        if (ephi) {
            const values: IEphiFormValues = {
                address: ephi.address,
                birthday: new Date(ephi.birthday),
                email: ephi.email,
                first_name: ephi.first_name,
                health_plan: ephi.health_plan,
                last_name: ephi.last_name,
                mrn: ephi.mrn,
                phone: ephi.phone,
                ssn: ephi.ssn,

            };
            formValuesSet(values);
        }
    }, []);

    const onFormFieldChange = <K extends keyof IEphiFormValues>(key: K, value: IEphiFormValues[K]) => {

        const _formValues: IEphiFormValues = {
            ...formValues,
            [key]: value
        };

        formValuesSet(_formValues);
        errorMessagesSet((_errors) => ({
            ..._errors,
            [key]: ''
        }));
    }

    const validate = () => {

        const _errors: IFormErrors = {};

        for (let key in formValues) {
            const schemaObject: IFormSchema = {};
            schemaObject[key as keyof IEphiFormValues] = schema[key as keyof IEphiFormValues];
            const {error} = Joi.object(schemaObject).options({ allowUnknown: true, abortEarly: false }).validate(formValues);
            let message = '';
            if (error?.details?.length || error?.message) {
                message = 'Required';
                _errors[key as keyof IEphiFormValues] = message.replace(`"${key}"`, '');
            }
        }

        errorMessagesSet(_errors);
        return !Object.keys(_errors).length;
    }


    const onSavePress = () => {

        if (validate()) {
            onChange({
                type: 'SUBMIT',
                payload: formValues
            });
        }
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={style.content}>
            <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' contentContainerStyle={style.scrollView}>
                <TextField label={'First name'}
                           value={formValues.first_name || ''}
                           errorMessage={errorMessages.first_name}
                           onChangeText={(text) => onFormFieldChange('first_name', text)}/>
                <View style={{height: 10}}/>
                <TextField label={'Last name'}
                           value={formValues.last_name || ''}
                           errorMessage={errorMessages.last_name}
                           onChangeText={(text) => onFormFieldChange('last_name', text)}/>
                <View style={{height: 10}}/>
                <Text style={style.label}>Birthday</Text>
                <RNDateTimePicker
                    mode={'date'}
                    value={formValues.birthday}
                    onChange={(event, date) => onFormFieldChange('birthday', date || new Date())}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                />
                <View style={{height: 10}}/>
                <TextField label={'Phone'}
                           value={formValues.phone || ''}
                           errorMessage={errorMessages.phone}
                           onChangeText={(text) => onFormFieldChange('phone', text)}/>
                <View style={{height: 10}}/>
                <TextField label={'Email'}
                           value={formValues.email || ''}
                           errorMessage={errorMessages.email}
                           onChangeText={(text) => onFormFieldChange('email', text)}/>
                <View style={{height: 10}}/>
                <TextField label={'Social security number'}
                           value={formValues.ssn? (formValues.ssn + ''): ''}
                           errorMessage={errorMessages.ssn}
                           onChangeText={(text) => onFormFieldChange('ssn', parseInt(text) || null)}/>
                <View style={{height: 10}}/>
                <TextField label={'Health plan number'}
                           value={formValues.health_plan? (formValues.health_plan + ''): ''}
                           errorMessage={errorMessages.health_plan}
                           onChangeText={(text) => onFormFieldChange('health_plan', parseInt(text) || null)}/>
                <View style={{height: 10}}/>
                <TextField label={'Medical record number'}
                           value={formValues.mrn? (formValues.mrn + ''): ''}
                           errorMessage={errorMessages.mrn}
                           onChangeText={(text) => onFormFieldChange('mrn', parseInt(text) || null)}/>
                <View style={{height: 10}}/>
                <TextField label={'Address'}
                           value={formValues.address || ''}
                           errorMessage={errorMessages.address}
                           onChangeText={(text) => onFormFieldChange('address', text)}/>
                <View style={{flex: 1, height: 30}} />
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => onSavePress()}
                                  style={style.saveBtn}>
                    <Text style={style.buttonLabel}>
                        {'Save'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EphiForm;