var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Component } from 'react';
import { Image } from 'react-native';
export class SafeImage extends Component {
    constructor() {
        super(...arguments);
        this.state = { renderImageFail: false };
        this.handleOnError = () => this.setState({ renderImageFail: true });
    }
    render() {
        const _a = this.props, { fallbackImageSource, fallbackComponent } = _a, imageProps = __rest(_a, ["fallbackImageSource", "fallbackComponent"]);
        const { renderImageFail } = this.state;
        if (renderImageFail) {
            if (fallbackImageSource) {
                return <Image {...imageProps} source={fallbackImageSource}/>;
            }
            if (fallbackComponent) {
                return fallbackComponent;
            }
            return null;
        }
        return <Image {...imageProps} onError={this.handleOnError}/>;
    }
}
//# sourceMappingURL=index.js.map