import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EditsContainer from './Filters/EditsContainer'
import FilterSVG from './SVG/FilterSVG'
import OptionSVG from './SVG/OptionSVG'
import BottomSheet from '@gorhom/bottom-sheet';
import FiltersBox from './Filters/FiltersBox'
import OptionsBox from './Filters/OptionsBox'

const FiltersControl = (props) => {
    //props.stay to indicate whether this FiltersControl be able to close completely
    const { stay, filtersControlRef } = props

    const snapPoints = useMemo(
        () => stay ? ["5%", "20%"] : ["20%"], [])

    const filterRef = useRef()
    const optionRef = useRef()
    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }


    return (
        <>
            <BottomSheet
                index={stay ? 0 : -1}
                ref={filtersControlRef}
                snapPoints={snapPoints}
                enablePanDownToClose={stay ? false : true}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <View style={styles.btnsView}>
                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={() => handleOpenSheetModal(filterRef)}
                    >
                        <FilterSVG />
                        <Text style={styles.btnText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={() => handleOpenSheetModal(optionRef)}
                    >
                        <OptionSVG />
                        <Text style={styles.btnText}>Options</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheet>

            <EditsContainer
                sheetRef={filterRef}
                title="Filter"
            >
                <FiltersBox
                   
                />
            </EditsContainer>

            <BottomSheet
                ref={optionRef}
                index={-1}
                snapPoints={["20%"]}
                enablePanDownToClose={true}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <OptionsBox />
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     height: "25%",
    //     width: "100%",
    //     backgroundColor: "#000",
    //     position: "absolute",
    //     bottom: 0,
    //     left: 0,
    // },
    btnsView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    btnWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "500",
        marginTop: 5
    }
})

export default FiltersControl