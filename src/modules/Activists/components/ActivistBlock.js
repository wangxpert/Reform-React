import React from 'react';
import { Link } from 'react-router-dom';

export default function ActivistBlock(props) {
  const activist = props.activist;

  return (
    <div key={ activist.activismid }>
      <Link to={ `/activists/${ activist.stateid }/${ activist.city }/${ activist.id }` } className='alert-link'>
        <li className='media list-group-item p-3 mb-2'>
          { activist.images && activist.images[0] &&
            <img className='media-object rounded-circle mr-3 activismview_avatar' src={ `https://${activist.images[0]}` } alt=""/>
          }
          { activist.title }
        </li>
      </Link>
    </div>
  )
}
