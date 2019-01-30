import React, { Component } from 'react'
import { TextInput, Animated, Easing, Dimensions, StyleSheet } from 'react-native'
import { InputFilterContext } from './InputFilterContext'
import { Constants as ExpoConstants } from 'expo'
import { DURATION } from './Constants'

const { width } = Dimensions.get('window')

// export interface Props {}

export class InputFilterWrapper extends Component {
  state = { value: '' }

  constructor(props) {
    super(props)
    this.statusBarHeight = ExpoConstants.statusBarHeight
  }

  translateY = new Animated.Value(0)
  opacity = new Animated.Value(0)

  containerRef = undefined

  setRef = ref => (this.containerRef = ref)

  handleFocus = ({ setMarginTopAsync, handleFocusProvider, setDataAsync }) => async () => {
    const { data } = this.props
    const { inputY, inputHeight, inputWidth } = await this.measureAsync(this.containerRef)

    await setDataAsync(data)

    await setMarginTopAsync(inputHeight)

    handleFocusProvider()
    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: -inputY + this.statusBarHeight,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start()
  }

  handleBlur = ({ handleBlurProvider }) => () => {
    handleBlurProvider()
    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start()

    if (this.containerRef) {
      setTimeout(this.containerRef.blur, DURATION)
    }
  }

  handleChange = text => this.setState({ value: text })

  measureAsync = ref =>
    new Promise(resolve => {
      if (ref) {
        ref.measure((_fx, _fy, width, height, _px, py) => {
          resolve({
            inputY: py,
            inputHeight: height,
            inputWidth: width,
          })
        })
      }
    })

  render() {
    const { children } = this.props
    const { value } = this.state
    const { translateY, opacity } = this

    const childProps = children.props
    return (
      <InputFilterContext.Consumer>
        {({ setMarginTopAsync, handleFocusProvider, handleBlurProvider, setDataAsync }) => (
          <>
            <Animated.View
              style={{
                backgroundColor: '#fff',
                transform: [{ translateY }],
                zIndex: 2,
              }}
            >
              <TextInput
                autoCorrect={false}
                {...childProps}
                ref={this.setRef}
                value={value}
                onChangeText={this.handleChange}
                onFocus={this.handleFocus({ setMarginTopAsync, handleFocusProvider, setDataAsync })}
                onBlur={this.handleBlur({ handleBlurProvider })}
              />
            </Animated.View>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: '#fff',
                opacity,
                zIndex: 1,
              }}
            />
          </>
        )}
      </InputFilterContext.Consumer>
    )
  }
}
