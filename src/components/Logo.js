import React from "react";
import { View } from "react-native";
import { Image, StyleSheet } from "react-native";

const Logo = () => (

    <
    Image source = { require("../../assets/blood.png") }
    style = { styles.image }
    />

);

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginVertical: 100,

    },
    dot: {
        height: 120,
        width: 120,
        backgroundColor: "#fff",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",

        //bord: "50%",
        //display: inline-block,
    }
});

export default Logo;