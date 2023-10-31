import React from 'react'
import {BiFilterAlt} from 'react-icons/bi'

const FilterIcon = (props) => {
  return (
    <div className='filterIcon' onClick={()=>props.onShow()}><BiFilterAlt/></div>
  )
}

export default FilterIcon