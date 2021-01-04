import { Component, createElement, ReactElement } from "react";
import { Alert, Button, View, ViewStyle } from "react-native";

import Parallax from "./components/Parallax";

import { Style, mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { ParallaxHeaderProps } from "../typings/ParallaxHeaderProps";
import { defaultParallaxHeaderStyle } from "./ui/styles";

export interface CustomStyle extends Style {
    container: ViewStyle;
    header: {
        backgroundColor?: string;
        minHeight?: number;
        maxHeight?: number;
    };
}

export class ParallaxHeader extends Component<ParallaxHeaderProps<CustomStyle>> {
    private readonly styles = mergeNativeStyles(defaultParallaxHeaderStyle, this.props.style);

    renderHeader = this._renderHeader.bind(this);
    renderOverlay = this._renderOverlay.bind(this);

    _renderHeader(): ReactElement {
        return <View>{this.props.headerArea}</View>;
    }

    _renderOverlay(): ReactElement {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Button title="I'm in the overlay" onPress={(): void => Alert.alert("Hey!")} />
            </View>
        );
    }

    render(): ReactElement {
        return (
            <Parallax
                maxHeight={this.props.uiMaxHeight}
                minHeight={this.props.uiMinHeight}
                renderHeader={this.renderHeader}
                style={this.styles}
                startCollapsed={this.props.uiStartCollapsed}
            >
                {this.props.contentArea}
            </Parallax>
        );
    }
}
