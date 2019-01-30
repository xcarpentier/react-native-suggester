import * as React from 'react'

interface ISetStateAsync {
  component: React.Component
  state: object
}

export const setStateAsync = ({
  component,
  state,
}: ISetStateAsync): Promise<void> =>
  new Promise(resolve => component.setState(state, resolve))
