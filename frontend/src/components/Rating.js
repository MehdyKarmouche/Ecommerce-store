import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        {
        value>=1 ? <i style={{color}}><StarIcon/></i>
        : value>=0.5 ? <i style={{color}}><StarHalfIcon/></i>
        : <i style={{color}}><StarBorderIcon/></i>
        
        }
      </span>
      <span>
        {
        value>=2 ? <i style={{color}}><StarIcon/></i>
        : value>=1.5 ? <i style={{color}}><StarHalfIcon/></i>
        : <i style={{color}}><StarBorderIcon/></i>
        
        }
      </span>
      <span>
        {
        value>=3 ? <i style={{color}}><StarIcon/></i>
        : value>=2.5 ? <i style={{color}}><StarHalfIcon/></i>
        : <i style={{color}}><StarBorderIcon/></i>
        
        }
      </span>
      <span>
        {
        value>=4 ? <i style={{color}}><StarIcon/></i>
        : value>=3.5 ? <i style={{color}}><StarHalfIcon/></i>
        : <i style={{color}}><StarBorderIcon/></i>
        
        }
      </span>
      <span>
        {
        value>=5 ? <i style={{color}}><StarIcon/></i>
        : value>=4.5 ? <i style={{color}}><StarHalfIcon/></i>
        : <i style={{color}}><StarBorderIcon/></i>
        
        }
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}


export default Rating