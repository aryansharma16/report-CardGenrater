import React from 'react'
import './TooltipStyle.css'

const Tooltip = ({data}) => {
    return (
        <div className='tooltipWrap'>
            <ul className="roleCount">
                    <li className="roleData">{data?.role}</li>
            </ul>
        </div>
    )
}

export default Tooltip