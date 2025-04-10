import React, { useState } from 'react'

interface functions {
    setCondition:  React.Dispatch<React.SetStateAction<string>>
}

const CourtConditionModalComponent = ({setCondition}: functions) => {
    const [conditionToAdd, setConditionToAdd] = useState<string>('');
  return (
    <div>
        <button>X</button>
        <h1>CourtConditionModalComponent</h1>
        <input type="text" onChange={(e)=>{setConditionToAdd(e.target.value)}}/>
        <button onClick={()=>setCondition(conditionToAdd)}>add</button>
    </div>
  )
}

export default CourtConditionModalComponent