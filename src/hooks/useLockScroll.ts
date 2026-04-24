import { useEffect } from 'react'

const lockAttribute = 'data-scroll-locked'
const getCurrentUseCounter = () => {
  const counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10)

  return Number.isFinite(counter) ? counter : 0
}

export function useLockScroll() {
  useEffect(() => {
    document.body.setAttribute(
      lockAttribute,
      (getCurrentUseCounter() + 1).toString(),
    )

    return () => {
      const newCounter = getCurrentUseCounter() - 1

      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute)
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString())
      }
    }
  }, [])
}
