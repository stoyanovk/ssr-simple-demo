import React from 'react'
import './style.scss'

const Counter = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div className="ui-counter">
      <p className="ui-counter__title">Counter Widget</p>

      <div className="ui-counter__body">
        <p className="ui-counter__body__name">some count</p>
        <p className="ui-counter__body__count">{count}</p>
        <button
          className="ui-counter__body__button"
          onClick={() => setCount(c => c + 1)}
          disabled={count === 3}
        >
          Increment
        </button>
      </div>
    </div>
  )
}

export default Counter
