import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    LayoutAnimation,
    View,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Image,
    Text
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Util from "./utils";

class ReminderContainer extends Component {
    static defaultProps = {
        lsitData: {
            title: "Notifications",
            numOfItems: 0,
            theme: "#fe952b",
            list: []
        }
    };

    static propTypes = {
        listData: PropTypes.object,
        switch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            listData: this.props.listData,
            numOfItems: this.props.listData.numOfItems
        };
        this.animation = {
            duration: 200,
            create: {
                type: LayoutAnimation.Types.linear
            },
            update: {
                type: LayoutAnimation.Types.linear,
                springDamping: 0.7
            }
        };

        this._done = this._done.bind(this);
        this._addList = this._addList.bind(this);
    }

    _done(index) {
        const listData = this.state.listData;
        listData.list[index].selected = !listData.list[index].selected;
        const numOfItems = listData.list[index].selected
            ? this.state.numOfItems - 1
            : this.state.numOfItems + 1;
        this.setState({
            listData,
            numOfItems
        });
        LayoutAnimation.configureNext(this.animation);
    }

    _addList(text) {
        const listData = this.state.listData;
        const numOfItems = this.state.numOfItems + 1;
        listData.list.push({
            selected: false,
            text
        });
        this.setState({
            listData,
            numOfItems
        });
        this.refs["addList"].setNativeProps({
            text: " "
        });
    }

    render() {
        const listData = this.state.listData;
        const list = listData.list.map((elm, index) => {
            return (
                <View
                    ref={"list" + index}
                    key={index}
                    style={[
                        styles.reminderList,
                        { opacity: elm.selected ? 0.5 : 1 }
                    ]}
                >
                    <TouchableHighlight
                        onPress={() => this._done(index)}
                        underlayColor="transparent"
                        style={[
                            styles.check,
                            {
                                borderColor: elm.selected
                                    ? listData.theme
                                    : "#c6c6c6"
                            }
                        ]}
                    >
                        <View
                            style={
                                elm.selected
                                    ? [
                                          styles.fill,
                                          { backgroundColor: listData.theme }
                                      ]
                                    : null
                            }
                        />
                    </TouchableHighlight>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            defaultValue={elm.text}
                        />
                    </View>
                </View>
            );
        });

        list.push(
            <View key="add" style={styles.reminderList}>
                <View style={styles.add}>
                    <Icon
                        name="md-add"
                        style={styles.addIcon}
                        size={22}
                        color="#c6c6c6"
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        ref="addList"
                        onBlur={event => this._addList(event.nativeEvent.text)}
                    />
                </View>
            </View>
        );

        return (
            <View style={styles.reminderContainer}>
                <Image style={styles.reminderBg} source={{ uri: "packed" }} />
                <View style={styles.reminderContent}>
                    <TouchableHighlight>
                        <View style={styles.reminderTitleContainer}>
                            <Text
                                style={[
                                    styles.reminderTitle,
                                    { color: listData.theme }
                                ]}
                            >
                                {listData.title}
                            </Text>
                            <Text
                                style={[
                                    styles.reminderTitle,
                                    { color: listData.theme }
                                ]}
                            >
                                {this.state.numOfItems}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.reminderListContainer}>{list}</View>
                </View>
            </View>
        );
    }
}

export default ReminderContainer;

const styles = StyleSheet.create({
    reminderList: {
        flexDirection: "row",
        paddingLeft: 15,
        height: 45,
        width: Util.size.width,
        justifyContent: "space-between",
        alignItems: "center"
    },
    check: {
        borderWidth: 1,
        borderColor: "#c6c6c6",
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
        width: 22,
        height: 22
    },
    fill: {
        width: 16,
        height: 16,
        borderRadius: 8
    },
    input: {
        height: 45,
        width: Util.size.width - 50,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    inputText: {
        height: 43,
        color: "#363636"
    },
    addIcon: {
        paddingLeft: 5
    },
    reminderContainer: {
        height: Util.size.height - 65,
        width: Util.size.width,
        borderRadius: 10,
        position: "absolute",
        top: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: -1,
            width: 0
        }
    },
    reminderBg: {
        height: Util.size.height - 65,
        opacity: 0.5,
        resizeMode: "cover",
        borderRadius: 10
    },
    reminderContent: {
        height: Util.size.height - 65,
        backgroundColor: "transparent",
        position: "absolute"
    },
    reminderTitleContainer: {
        height: 65,
        width: Util.size.width,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center"
    },
    reminderTitle: {
        fontSize: 28,
        fontWeight: "300",
        textShadowColor: "#ccc",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1
    },
    reminderListContainer: {
        flex: 1,
        borderTopColor: "#ccc",
        borderTopWidth: 1
    }
});
