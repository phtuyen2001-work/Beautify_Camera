import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Slider from '@react-native-community/slider'

import CloseSVG from '../../SVG/CloseSVG'
import CheckSVG from '../../SVG/CheckSVG'

/**
 * SliderBox - jsx
 * @prop {object} sheetRef - The ref of the sheet that contains the SliderBox
 * @prop {string} title - The title for the SliderBox
 * @prop {number} initialValue
 * @prop {number} minimumValue
 * @prop {number} maximumValue
 * @prop {number} step
 * @prop {number} value - the value that needs to change
 * @prop {function} setValueFunction - the function for setting the value
 */

const SliderBox = (props) => {
    const {
        sheetRef,
        title,
        initialValue = 1,
        minimumValue = 0,
        maximumValue = 2,
        step = 0.05,
        setValueFunction,
    } = props

    //to show value under the slider
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        //Use props.value to distinguish this value and parent's value
        setValue(props.value)
    }, [title])

    const handleValueChange = (e) => {
        setValue(e)
    }

    const handleClose = () => {
        sheetRef.current?.close()
    }

    const handleCheck = () => {
        setValueFunction(value)
        sheetRef.current?.close()
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={handleClose}>
                    <CloseSVG />
                </TouchableOpacity>
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                <TouchableOpacity onPress={handleCheck}>
                    <CheckSVG />
                </TouchableOpacity>
            </View>

            <View style={[styles.bottom]}>
                <Slider
                    style={{ width: 200, height: 30 }}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#808080"
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    step={step}
                    value={value}
                    onValueChange={handleValueChange}
                />
                <Text style={styles.text}>{value?.toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default SliderBox

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    title: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 17,
    },
    bottom: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700"
    }
})