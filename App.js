import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";

import ReminderContainer from "./src/ReminderContainer";
import Util from "./src/utils";

export default class extends Component {
    constructor() {
        super();
        this.listData = {
            title: "Development",
            numOfItems: 6,
            theme: "#fe952b",
            list: [
                {
                    selected: false,
                    text: "day20"
                },
                {
                    selected: false,
                    text: "day21"
                },
                {
                    selected: false,
                    text: "day22"
                },
                {
                    selected: false,
                    text: "day23"
                },
                {
                    selected: false,
                    text: "day24"
                },
                {
                    selected: false,
                    text: "day25"
                }
            ]
        };
    }

    render() {
        return (
            <View>
                <Image style={styles.container} source={{ uri: "desktop" }} />
                <ReminderContainer listData={this.listData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width
  }
});
