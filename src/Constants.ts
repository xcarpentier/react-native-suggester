import { Dimensions } from 'react-native'
import { isExpo } from './Utils'

export const DURATION = 350

export const { height: WINDOW_HEIGHT } = Dimensions.get('window')

const DEFAULT_STATUS_BAR = 27
export const STATUS_BAR_HEIGHT = (() => {
  if (isExpo()) {
    const Expo = require('expo')
    const { Constants } = Expo
    return Constants.statusBarHeight
  }
  return DEFAULT_STATUS_BAR
})()
