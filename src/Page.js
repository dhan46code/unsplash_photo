import React from 'react';

function Page({
  urls: { full },
  id,
  likes,
  user: {
    name,
    profile_image: { medium },
  },
}) {
  return (
    <article className='photo_' key={id}>
      <img src={full} alt='' />
      <div className='photo_info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} like</p>
        </div>
        <img src={medium} alt={name} className='user_img' />
      </div>
    </article>
  );
}

export default Page;
