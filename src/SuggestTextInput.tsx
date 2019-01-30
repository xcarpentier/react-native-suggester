import React, { Component, RefObject } from 'react'
import PropTypes from 'prop-types'
import {
  Easing,
  StyleSheet,
  TextInput,
  TextInputProps,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'
import { SuggesterContext, SuggesterContextParam } from './SuggesterContext'
import { DURATION, WINDOW_HEIGHT, WINDOW_WIDTH } from './Constants'
import { IData } from './IData'

interface Props extends TextInputProps {
  data: IData[]
  name: string
}

export class SuggestTextInput extends Component<Props> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }

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
    statusBarHeight,
    setPaddingHorizontalAsync,
  }: SuggesterContextParam) => async (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    const { onFocus } = this.props
    if (onFocus) {
      onFocus(e)
    }

    const { name, data } = this.props
    const { inputY, inputHeight, inputWidth } = await this.measureAsync(
      this.textInputRef,
    )

    await setDataAsync!(name, data)

    await setMarginTopAsync!(inputHeight)

    await setPaddingHorizontalAsync!((WINDOW_WIDTH - inputWidth) / 2)

    handleFocusProvider!()

    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: -inputY + statusBarHeight! || 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }

  handleBlur = ({ handleBlurProvider }: SuggesterContextParam) => (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    const { onBlur } = this.props
    if (onBlur) {
      onBlur(e)
    }
    handleBlurProvider!()
    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished && this.textInputRef && this.textInputRef.current) {
        setTimeout(this.textInputRef.current.blur, DURATION)
      }
    })
  }

  handleChange = ({ setValueAsync }: SuggesterContextParam) => (
    value: string,
  ) => {
    const { name, onChangeText } = this.props
    if (onChangeText) {
      onChangeText(value)
    }
    setValueAsync!(name, value)
  }

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
    const { translateY, opacity } = this
    return (
      <SuggesterContext.Consumer>
        {({
          values,
          setMarginTopAsync,
          handleFocusProvider,
          handleBlurProvider,
          setDataAsync,
          statusBarHeight,
          backgroundColor,
          setValueAsync,
          setPaddingHorizontalAsync,
        }) => (
          <>
            <Animated.View
              style={{
                backgroundColor,
                transform: [{ translateY }],
                zIndex: 2,
              }}
            >
              <TextInput
                autoCorrect={false}
                {...this.props}
                ref={this.textInputRef}
                value={values![this.props.name]}
                onChangeText={this.handleChange({ setValueAsync })}
                onFocus={this.handleFocus({
                  setMarginTopAsync,
                  handleFocusProvider,
                  setDataAsync,
                  statusBarHeight,
                  setPaddingHorizontalAsync,
                })}
                onBlur={this.handleBlur({ handleBlurProvider })}
              />
            </Animated.View>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor,
                opacity,
                zIndex: 1,
              }}
            />
          </>
        )}
      </SuggesterContext.Consumer>
    )
  }
}
