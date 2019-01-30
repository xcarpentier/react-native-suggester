[![NPM version](https://badge.fury.io/js/react-native-safe-image.svg)](http://badge.fury.io/js/react-native-safe-image)

# react-native-safe-image

Really light React-Native package to handle fallback when image is on error

- fallback to **other image**
- fallback to **a component**

## How to use it ?

```jsx
import { SafeImage } from 'react-native-safe-image'

// ...
render() {
  return (
    <SafeImage
      source={{ uri: 'http://Normal-Image-Maybe-OnError.jpg' }}
      fallbackImageSource={require('./Path-To/FallbackImage.jpg')}
      style={{ width: 30, height: 30 }}
      resizeMode="contain"
    />
  )
}
// ... or ...
const noImg = <View><Text>No Img</Text></View>
render() {
  return (
    <SafeImage
      source={{ uri: 'http://Normal-Image-Maybe-OnError.jpg' }}
      fallbackComponent={noImg}
      style={{ width: 30, height: 30 }}
      resizeMode="contain"
    />
  )
}

```

## Todos

- [x] add `fallbackComponent` prop
