import React from 'react'
import * as Loader from 'react-loader-spinner'

const LoaderSpinner = (props) => {
  return (<div style={{display:"flex", justifyContent:"center", alignItems:"center", height:props.height}}>
    <Loader.TailSpin/>

    {/* <Loader
    type="TailSpin"
    color="rgb(155, 236, 34)"
    height={70}
    width={70}
    timeout={5000}
/> */}
</div>
  )
}

export default LoaderSpinner;