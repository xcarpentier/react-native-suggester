import { Dimensions } from 'react-native'
import { isExpo } from './Utils'

export const DURATION = 350

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get(
  'window',
)

const DEFAULT_STATUS_BAR = 20
export const STATUS_BAR_HEIGHT = (() => {
  if (isExpo()) {
    const Expo = require('expo')
    const { Constants } = Expo
    return Constants.statusBarHeight
  }
  return DEFAULT_STATUS_BAR
})()
