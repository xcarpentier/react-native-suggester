import React, { Component, RefObject, ReactNode, ReactChild } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native'
import { InputFilterContext, InputContext } from './InputFilterContext'
import { DURATION } from './Constants'
import { IData } from 'IData'

interface Props {
  children: ReactChild & { props: TextInputProps }
  data: IData[]
}

interface State {
  value?: string
}

export class InputFilterWrapper extends Component<Props, State> {
  state = { value: '' }

  translateY = new Animated.Value(0)

  opacity = new Animated.Value(0)

  textInputRef?: RefObject<TextInput> = undefined

  constructor(props: Props) {
    super(props)
    this.textInputRef = React.createRef()
  }

  handleFocus = ({
    setMarginTopAsync,
    handleFocusProvider,
    setDataAsync,
  }: InputContext) => async () => {
    const { data } = this.props
    const { inputY, inputHeight } = await this.measureAsync(this.textInputRef)

    await setDataAsync!(data)

    await setMarginTopAsync!(inputHeight)

    handleFocusProvider!()

    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: -inputY, // TODO: + this.statusBarHeight,
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

  handleBlur = ({ handleBlurProvider }: InputContext) => () => {
    handleBlurProvider!()
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

    if (this.textInputRef && this.textInputRef.current) {
      setTimeout(this.textInputRef.current.blur, DURATION)
    }
  }

  handleChange = (value: string) => this.setState({ value })

  measureAsync = (
    ref?: RefObject<TextInput>,
  ): Promise<{
    inputY: number
    inputHeight: number
    inputWidth: number
  }> =>
    new Promise(resolve => {
      if (ref && ref.current) {
        ref.current.measure((_fx, _fy, width, height, _px, py) => {
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
        {({
          setMarginTopAsync,
          handleFocusProvider,
          handleBlurProvider,
          setDataAsync,
        }) => (
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
                ref={this.textInputRef}
                value={value}
                onChangeText={this.handleChange}
                onFocus={this.handleFocus({
                  setMarginTopAsync,
                  handleFocusProvider,
                  setDataAsync,
                })}
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
