import { PersonCastCredit } from '@customTypes/PersonTypes'
import React from 'react'

const PersonTest = ({ stuff }: { stuff: PersonCastCredit[] }) => {
  return (
    <div>
      {stuff.map((credit: PersonCastCredit) => {
        return <div key={credit.id}>{credit.title}</div>
      })}
    </div>
  )
}

export default PersonTest
