import React, { ReactElement, createElement, Fragment, PropsWithChildren, useMemo, useRef, useEffect } from "react";
import { Animated, View, StyleSheet, ScrollView } from "react-native";
import { ParallaxHeaderStyle } from "../ui/styles";

export interface RenderOverlayParameters {
    scrollPositionY?: Animated.Value;
    scrollDistance?: number;
    maxHeight?: number;
}

export interface ParallaxHeaderProps {
    startCollapsed?: boolean;
    maxHeight?: number;
    minHeight?: number;
    style?: ParallaxHeaderStyle;
    renderOverlay?: ({ scrollPositionY, scrollDistance, maxHeight }: RenderOverlayParameters) => ReactElement;
    renderHeader?: () => ReactElement;
}

const Parallax: React.FC<PropsWithChildren<ParallaxHeaderProps>> = ({
    startCollapsed,
    maxHeight,
    minHeight,
    children,
    style,
    renderOverlay,
    renderHeader
}: PropsWithChildren<ParallaxHeaderProps>) => {
    const scrollPositionY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<Animated.AnimatedComponent<ScrollView>>(null);

    const HEADER_MAX_HEIGHT = useMemo(
        () => (maxHeight ? maxHeight : style?.header.maxHeight ? style.header.maxHeight : 550),
        [maxHeight, style]
    );
    const HEADER_MIN_HEIGHT = useMemo(
        () => (minHeight ? minHeight : style?.header.minHeight ? style.header.minHeight : 170),
        [minHeight, style]
    );
    const BG_COLOR = useMemo(() => style?.header.backgroundColor || "rgba(255,255,255,1)", [style]);

    const HEADER_SCROLL_DISTANCE = useMemo(() => HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, [
        HEADER_MAX_HEIGHT,
        HEADER_MIN_HEIGHT
    ]);

    // We're applying this dirty trick, because we can't use scrollOffSet in Android before RN 0.64 (MX uses 0.61 currently)
    useEffect(() => {
        if (startCollapsed && scrollViewRef.current && scrollViewRef.current.getNode) {
            const node = scrollViewRef.current.getNode();
            if (node) {
                setTimeout(() => {
                    node.scrollTo({ x: 0, y: HEADER_SCROLL_DISTANCE, animated: false });
                }, 1);
            }
        }
    }, []);

    const headerTranslate = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: "clamp"
    });

    const imageOpacity = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: "clamp"
    });

    const imageTranslate = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: "clamp"
    });

    return (
        <Fragment>
            <Animated.ScrollView
                // @ts-ignore
                ref={scrollViewRef}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPositionY } } }], {
                    useNativeDriver: true
                })}
            >
                <View
                    style={{
                        marginTop: HEADER_MAX_HEIGHT
                    }}
                >
                    {children}
                </View>
            </Animated.ScrollView>
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(200, 1, 200, 1)",
                        overflow: "hidden"
                    },
                    { height: HEADER_MAX_HEIGHT, backgroundColor: BG_COLOR },
                    { transform: [{ translateY: headerTranslate }] }
                ]}
            >
                {renderHeader && (
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                resizeMode: "cover"
                            },
                            {
                                opacity: imageOpacity,
                                height: HEADER_MAX_HEIGHT,
                                transform: [{ translateY: imageTranslate }]
                            }
                        ]}
                    >
                        {React.cloneElement(renderHeader(), {
                            style: {
                                ...StyleSheet.absoluteFillObject,
                                height: HEADER_MAX_HEIGHT
                            }
                        })}
                    </Animated.View>
                )}
            </Animated.View>
            {renderOverlay && (
                <Fragment>
                    {React.cloneElement(
                        renderOverlay({
                            scrollPositionY,
                            scrollDistance: HEADER_SCROLL_DISTANCE,
                            maxHeight: HEADER_MAX_HEIGHT
                        }),
                        {
                            style: {
                                ...StyleSheet.absoluteFillObject,
                                height: HEADER_MAX_HEIGHT,
                                ...renderOverlay({}).props.style
                            }
                        }
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Parallax;
