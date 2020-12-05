import React, { useRef, useState, useEffect, useCallback } from 'react'
import { render } from 'react-dom'
import { useTransition, animated } from 'react-spring'
import '../style/style.css'

const HomeAnimation = () => {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, null, {
    from: { opacity: 0, height: 0, innerHeight: 0, transform: 'perspective(1000px) rotateX(0deg)', color: '#8fa5b6' },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#5e35b1' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#5e35b1' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#263238' },
  })

  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(['The', 'Best', 'Gear']), 2000))
    ref.current.push(setTimeout(() => set(['The', 'Cheapest', 'Gear']), 5000))
    ref.current.push(setTimeout(() => set(['Take', 'Your', 'Gear With You', 'Now']), 8000))
  }, [])

  useEffect(() => void reset(), [])

  return (
    <div>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
          <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default HomeAnimation