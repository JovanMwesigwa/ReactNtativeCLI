import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { useFormikContext } from 'formik'
import AppText from '../AppText'
import { GlobalStyles } from '../../styles/GlobalStyles'


const AppTextInput = ({ name, placeholder, value=null, flexAll, placeholderColor="#777" ,isInline, title, icon, ...otherProps}) => {
    const {handleChange, setFieldTouched, touched, errors } = useFormikContext()
    if(!errors) return null
    return (
        <>
            <View style={{ flex: flexAll ? 1 : 0 }}>
                {
                    title &&
                    <AppText fontSize={16} color={GlobalStyles.blue.color}>{title}</AppText>
                }
                <TextInput style={styles.inputContainer} 
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    {...otherProps}
                    onBlur={() => setFieldTouched(name)}
                    onChangeText={handleChange(name)}
                />
                {
                    icon &&
                    <FontAwesome name={icon} color="#05375a" size={18} style={styles.iconStyles} />
                }
            </View>
            {
                !errors ? 
                <View style={isInline && styles.inline}>
                    {touched[name] && <Text style={{ color: "red" }}>{errors[name]}</Text>}
                </View> : 
                null
            }
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 15,
        fontSize: 16,
        padding: 10,
        paddingLeft: 30,
        borderColor: "#ddd",
        borderRadius: 8,
        borderBottomWidth: 0.9,
        marginBottom: 18,
        flex: 1
      },
      inline: {
          position: 'absolute',
          bottom: 0,
          left: 8
      },
      iconStyles: {
        position: 'absolute',
        top: 30,
        left: 10,
        bottom: 33
    }
})

export default AppTextInput
