import { Component, ReactNode } from 'react';
import { ImageProps, ImageSourcePropType } from 'react-native';
export interface SafeImageProps extends ImageProps {
    fallbackImageSource?: ImageSourcePropType;
    fallbackComponent?: ReactNode;
}
interface State {
    renderImageFail: boolean;
}
export declare class SafeImage extends Component<SafeImageProps, State> {
    state: {
        renderImageFail: boolean;
    };
    handleOnError: () => void;
    render(): {} | null;
}
export {};
