import React from 'react'
import { getButtons } from './createButtons'
import { buttons } from './view'
import './style.scss'

export const Pagination = ({ perPage, currentPage, total, nextPageUrl }) => {
  const pages = getButtons(currentPage, perPage, total)
  return (
    <div className="d-flex">
      {pages.map(({ type, value, disabled }, i) => {
        const Button = buttons[type]
        return (
          <Button
            disable={disabled}
            to={nextPageUrl(value)}
            value={value}
            key={i}
          />
        )
      })}
    </div>
  )
}
