import React, { Component, ReactNode } from 'react'
import { SuggesterContext } from './SuggesterContext'
import { StyleSheet, Easing, Animated } from 'react-native'
import { SuggesterModal } from './SuggesterModal'
import { DURATION, WINDOW_HEIGHT, STATUS_BAR_HEIGHT } from './Constants'
import { setStateAsync } from './SetStateAsync'
import { IData } from './IData'
import Fuse from 'fuse.js'

interface Props {
  children: ReactNode
  statusBarHeight?: number
  backgroundColor?: string
  textColor?: string
  textFont?: string
  textWhenEmpty?: string
}

interface State {
  data: IData[]
  currentName?: string
  marginTop: number
  paddingHorizontal: number
  values: { [name: string]: string }
}

export class SuggesterProvider extends Component<Props, State> {
  static defaultProps = {
    statusBarHeight: STATUS_BAR_HEIGHT,
    backgroundColor: 'white',
    textColor: 'black',
  }

  state = {
    data: [],
    currentName: undefined,
    marginTop: 30,
    paddingHorizontal: 15,
    values: {},
  }

  translateY = new Animated.Value(WINDOW_HEIGHT)

  fuse?: Fuse<IData>

  setDataAsync = async (name: string, data: IData[]) => {
    await setStateAsync({ component: this, state: { data, currentName: name } })
    this.fuse = new Fuse(data, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['value'],
    })
  }

  setValueAsync = (name: string, value: string) =>
    setStateAsync({
      component: this,
      state: { values: { ...this.state.values, [name]: value } },
    })

  setMarginTopAsync = (marginTop: number) =>
    setStateAsync({ component: this, state: { marginTop } })

  handleFocus = () => {
    const { marginTop } = this.state
    Animated.timing(this.translateY, {
      toValue: marginTop + this.props.statusBarHeight!,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  handleBlur = () => {
    Animated.timing(this.translateY, {
      toValue: WINDOW_HEIGHT,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  selectFromList = (name: string, value: string) =>
    this.setValueAsync(name, value)

  getData = () => {
    const { values, currentName } = this.state
    return this.fuse && currentName
      ? this.fuse!.search(values[currentName!])
      : []
  }

  setPaddingHorizontalAsync = (paddingHorizontal: number) =>
    setStateAsync({ component: this, state: { paddingHorizontal } })

  render() {
    const {
      children,
      backgroundColor,
      statusBarHeight,
      textWhenEmpty,
      textColor,
      textFont,
    } = this.props
    const { values, currentName, paddingHorizontal } = this.state
    const {
      setDataAsync,
      setMarginTopAsync,
      selectFromList,
      handleFocus: handleFocusProvider,
      handleBlur: handleBlurProvider,
      translateY,
      setValueAsync,
      setPaddingHorizontalAsync,
    } = this

    return (
      <SuggesterContext.Provider
        value={{
          backgroundColor,
          statusBarHeight,
          values,
          setDataAsync,
          setMarginTopAsync,
          setValueAsync,
          handleFocusProvider,
          handleBlurProvider,
          setPaddingHorizontalAsync,
        }}
      >
        {children}
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
            transform: [{ translateY }],
          }}
        >
          <SuggesterModal
            {...{
              data: this.getData(),
              selectFromList,
              textWhenEmpty,
              backgroundColor,
              textColor,
              textFont,
              currentName,
              paddingHorizontal,
            }}
          />
        </Animated.View>
      </SuggesterContext.Provider>
    )
  }
}
