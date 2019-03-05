import React, { Component, RefObject } from 'react'
import PropTypes from 'prop-types'
import {
  Easing,
  TextInput,
  TextInputProps,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from 'react-native'
import { SuggesterContext, SuggesterContextParam } from './SuggesterContext'
import { DURATION, WINDOW_WIDTH } from './Constants'
import { IData } from './IData'
import { SuggesterEventEmitter } from './SuggesterEventEmitter'
import { setStateAsync } from './SetStateAsync'

export interface SuggestTextInputProps extends TextInputProps {
  data: IData[]
  name: string
}

interface State {
  value: string | undefined
  focused: boolean
  inputY: number
}

export class SuggestTextInput extends Component<SuggestTextInputProps, State> {
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

  state = {
    value: this.props.value,
    focused: false,
    inputY: 0,
  }

  translateY = new Animated.Value(0)

  textInputRef?: RefObject<TextInput> = undefined

  constructor(props: SuggestTextInputProps) {
    super(props)
    this.textInputRef = React.createRef()
  }

  componentDidUpdate(prevProps: SuggestTextInputProps) {
    if (
      prevProps.value !== this.props.value &&
      this.state.value !== this.props.value
    ) {
      this.setState({ value: this.props.value })
      if (this.props.onChangeText) {
        this.props.onChangeText(this.props.value || '')
      }
    }
  }

  onSelect = async (value: string) => {
    await setStateAsync({ component: this, state: { value } })
    const { onChangeText, onSubmitEditing } = this.props

    if (onChangeText) {
      onChangeText(value)
    }

    if (onSubmitEditing) {
      onSubmitEditing({ nativeEvent: { text: value } } as NativeSyntheticEvent<
        TextInputFocusEventData
      >)
    }

    this.textInputRef!.current!.blur()
  }

  componentDidMount() {
    const { name } = this.props
    SuggesterEventEmitter.on(`selectFromList-${name}`, this.onSelect)
  }

  componentWillUnmount() {
    const { name } = this.props
    SuggesterEventEmitter.off(`selectFromList-${name}`, this.onSelect)
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

    this.setState({ inputY })

    await setDataAsync!(name, data)

    await setMarginTopAsync!(inputHeight)

    await setPaddingHorizontalAsync!((WINDOW_WIDTH - inputWidth) / 2)

    handleFocusProvider!()
    this.setState({ focused: true })

    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: -inputY + statusBarHeight! || 0,
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
    ]).start(({ finished }) => {
      if (finished) {
        this.setState({ focused: false })
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

    this.setState({ value })
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

  handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const { onSubmitEditing, onChangeText } = this.props
    if (onSubmitEditing) {
      onSubmitEditing(e)
    }
    if (onChangeText) {
      onChangeText(this.state.value!)
    }
  }

  render() {
    const { translateY } = this
    const { value, focused } = this.state
    const opacity = translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
    return (
      <SuggesterContext.Consumer>
        {({
          setMarginTopAsync,
          handleFocusProvider,
          handleBlurProvider,
          setDataAsync,
          statusBarHeight,
          backgroundColor,
          setValueAsync,
          setPaddingHorizontalAsync,
        }) => (
          <Animated.View
            style={[
              {
                transform: [{ translateY }],
              },
              focused
                ? {
                    backgroundColor,
                    opacity,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : { backgroundColor: 'transparent' },
            ]}
          >
            <TextInput
              autoCorrect={false}
              {...this.props}
              autoFocus={false}
              ref={this.textInputRef}
              value={value}
              onChangeText={this.handleChange({ setValueAsync })}
              onFocus={this.handleFocus({
                setMarginTopAsync,
                handleFocusProvider,
                setDataAsync,
                statusBarHeight,
                setPaddingHorizontalAsync,
              })}
              onSubmitEditing={this.handleSubmit}
              onBlur={this.handleBlur({ handleBlurProvider })}
            />
          </Animated.View>
        )}
      </SuggesterContext.Consumer>
    )
  }
}
