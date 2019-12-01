import React, {Component} from 'react';
import {Animated, ActivityIndicator, StyleSheet} from 'react-native';
import * as PropTypes from 'prop-types';

export default class Spinner extends Component {

    /**
     *
     * @type {object}
     */
    static propTypes = {
        visible: PropTypes.bool,
        color: PropTypes.string,
        overlayColor: PropTypes.string,
        size: PropTypes.oneOf(['small', 'large']),
        style: PropTypes.object,
        showDuration: PropTypes.number,
        hideDuration: PropTypes.number,
    };

    /**
     *
     * @type {object}
     */
    static defaultProps = {
        visible: false,
        color: '#fff',
        size: 'small',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        showDuration: 200,
        hideDuration: 200,
    };

    /**
     *
     * @type {object}
     */
    state = {
        visible: this.props.visible,
    };

    /**
     *
     * @type {AnimatedValue}
     * @private
     */
    _animation = new Animated.Value(+this.props.visible);

    /**
     *
     * @type {boolean}
     */
    _mount = false;

    /**
     * Register actions
     */
    componentDidMount() {
        this._mount = true;
    }

    /**
     * Unregister actions
     */
    componentWillUnmount() {
        this._mount = false;
    }

    /**
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.visible !== this.props.visible) {
            this.props.visible ? this.show() : this.hide();
        }
    }

    /**
     * Render component
     *
     * @returns {*}
     */
    render() {

        const {color, size, overlayColor, style} = this.props;
        const {visible} = this.state;

        if (!visible) {
            return null;
        }

        return (
            <Animated.View
                style={[
                    style || styles.containerView,
                    {
                        backgroundColor: overlayColor,
                        opacity: this._animation,
                    },
                ]}
            >
                <ActivityIndicator size={size} color={color}/>
            </Animated.View>
        )
    }

    /**
     * Show spinner
     */
    show = () => {
        this._animation.stopAnimation(() => {
            this.setState({
                visible: true,
            }, () => {
                Animated.timing(this._animation, {
                    toValue: 1,
                    duration: this.props.showDuration,
                    useNativeDriver: true,
                }).start();
            });
        });
    };

    /**
     * Hide spinner
     */
    hide = () => {
        this._animation.stopAnimation(() => {
            Animated.timing(this._animation, {
                toValue: 0,
                duration: this.props.hideDuration,
                useNativeDriver: true,
            }).start(({finished}) => {
                if (finished) {
                    this.setState({
                        visible: false,
                    });
                }
            });
        });
    };

    /**
     * Set state
     *
     * @param args
     * @private
     */
    setState = (...args) => {
        if (this._mount) {
            super.setState(...args);
        }
    };

}

const styles = StyleSheet.create({
    containerView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 999,
    },
});
