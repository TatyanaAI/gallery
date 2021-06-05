import React from 'react';
import './backDrop.css'
import Preloader from '../Preloader/preloader'

const BackDrop = ({ loading }) => {
    return (<>
        <div className='BackDrop' style={{ display: loading ===true ? 'block' : 'none' }} >
            <Preloader loading={loading} />
        </div>
    </>
    )
}


export default BackDrop;