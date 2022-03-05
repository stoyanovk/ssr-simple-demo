import React from 'react'
import s from './style.css'

const Counter = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div className={s.counter}>
      <p className={s.title}>Counter Widget</p>

      <div className={s.body}>
        <p className={s.description}>some count</p>
        <p className={s.description}>{count}</p>
        <button onClick={() => setCount(c => c + 1)} disabled={count === 3}>
          Increment
        </button>
      </div>
    </div>
  )
}

export default Counter
