import React from 'react'

const Meeting = ({params}:{params:{id:string}}) => {
  return (
    <div>
      Meeting rooms - #{params.id}
    </div>
  )
}

export default Meeting
