import React from 'react'
import { Link } from 'react-router-dom'
import { BUTTON_TYPES } from './createButtons'

const getClassName = disable => `page ${disable ? 'disable' : ''}`
const PrevButton = ({ to, disable }) => {
  return (
    <Link className={getClassName(disable)} to={to}>
      {'< prev'}
    </Link>
  )
}
const NextButton = ({ to, disable }) => {
  return (
    <Link to={to} className={getClassName(disable)}>
      {'next >'}
    </Link>
  )
}

const Dots = () => {
  return <div className="page">...</div>
}
const NumberButton = ({ to, value, disable }) => {
  return (
    <Link to={to} className={getClassName(disable)}>
      {value}
    </Link>
  )
}

export const buttons = {
  [BUTTON_TYPES.NUMBER]: NumberButton,
  [BUTTON_TYPES.DOTS]: Dots,
  [BUTTON_TYPES.PREV]: PrevButton,
  [BUTTON_TYPES.NEXT]: NextButton
}
