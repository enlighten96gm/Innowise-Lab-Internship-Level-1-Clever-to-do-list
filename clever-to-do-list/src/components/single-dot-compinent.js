import React, { useEffect, useState } from 'react'

const SingleDotComponent = ({value}) => {
    const [ifActiveDotFlag, setIfActiveDotFlag] = useState(false)
    useEffect(() => {
        if (value.checked === '') {
            setIfActiveDotFlag(true)
        } else {
            setIfActiveDotFlag(false)
        }
    }, [])

    return (
        <div style={ifActiveDotFlag === false ? {fontSize: '30px', color: 'green'} : {fontSize: '30px'}}>.</div>
    )
}

export default SingleDotComponent