import React from 'react'
import './BCard.css';
import Button from '@mui/material/Button'

function BCard({booking, data, handleAccept, handleDecline, handleDelete}) {
    return (
        <div className='card'>
            {data[booking.listingId] && <img src={data[booking.listingId].thumbnail} alt="" />}
            <div className="card__info">
                <h4>{'Status: '+ booking?.status}</h4>
                <h4>{'TotalPrice: $ '+ booking?.totalPrice}</h4>
                {booking.status==="pending"&&<><Button onClick={()=>{handleAccept(booking.id)}}>同意</Button>
                <Button onClick={()=>{handleDecline(booking.id)}}>拒绝</Button></>}
                <Button onClick={()=>{handleDelete(booking.id)}}>删除</Button>
            </div>
        </div>
    )
}

export default BCard