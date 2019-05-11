import React from 'react'
import Mathjax from 'react-mathjax'

export const MathEQ = ({ eq }) => {
  return (
    <Mathjax.Provider>
      <Mathjax.Node inline formula={eq} />
    </Mathjax.Provider>
  )
}
