import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator } from '../../core/utils';
import Background from '../../components/Background/Background';
import BackButton from '../../components/BackButton/BackButton';
import Logo from '../../components/Logo/Logo';
import Header from '../../components/Header/Header';
import TextInput from '../../components/TextInput/TextInput';
import { theme } from '../../core/theme';
import Button from '../../components/Button/Button';
import { ParamListBase, NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<ParamListBase>;
};

const Recovery = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });

    const _onSendPressed = () => {
        const emailError = emailValidator(email.value);

        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }

        navigation.navigate('LoginScreen');
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />

            <Logo />

            <Header>Restore Password</Header>

            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
                Send Reset Instructions
            </Button>
        </Background>
    );
};

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
});

export default memo(Recovery);
