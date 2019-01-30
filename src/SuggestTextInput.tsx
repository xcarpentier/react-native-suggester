import React, { Component, RefObject } from 'react'
import PropTypes from 'prop-types'
import {
  Easing,
  StyleSheet,
  TextInput,
  TextInputProps,
  Animated,
} from 'react-native'
import { SuggesterContext, SuggesterContextParam } from './SuggesterContext'
import { DURATION } from './Constants'
import { IData } from './IData'

interface Props extends TextInputProps {
  data: IData[]
}

interface State {
  value?: string
}

export class SuggestTextInput extends Component<Props, State> {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }
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
    statusBarHeight,
  }: SuggesterContextParam) => async () => {
    const { data } = this.props
    const { inputY, inputHeight } = await this.measureAsync(this.textInputRef)

    await setDataAsync!(data)

    await setMarginTopAsync!(inputHeight)

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

  handleBlur = ({ handleBlurProvider }: SuggesterContextParam) => () => {
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
    const { value } = this.state
    const { translateY, opacity } = this
    return (
      <SuggesterContext.Consumer>
        {({
          setMarginTopAsync,
          handleFocusProvider,
          handleBlurProvider,
          setDataAsync,
          statusBarHeight,
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
                {...this.props}
                ref={this.textInputRef}
                value={value}
                onChangeText={this.handleChange}
                onFocus={this.handleFocus({
                  setMarginTopAsync,
                  handleFocusProvider,
                  setDataAsync,
                  statusBarHeight,
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
      </SuggesterContext.Consumer>
    )
  }
}
