import React from 'react';

const Selector  = ({exchange, currency, result}) => {
    const handleChange = (e) => {
        currency(e.target.value);
        result('')
    }
    return ( 
      <div className='selector'> 
        <label for={exchange}>{exchange}:</label>
        <select id={exchange} name={exchange} onChange={handleChange}>
        <option value="gbp">British Pound</option>
            <option value="usd">US Dollar</option>
            <option value="eur">Euro</option>
            <option value="pln">Polish Zloty</option>
            <option value="chf">Swiss Franc</option>
        </select>
      </div>
     );
}
 
export default Selector ;