import React from 'react';

const OfficeAreas = props => (

    <div className='form-row section'>
        {props.officeAreas.map(item => 
        <div className='form-group col-sm-6'>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label">{item}</label>
            </div>
        </div>
        )}
    </div>
)

export default OfficeAreas