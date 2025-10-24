import React from 'react'

  const CardImage = ({ src, alt }) => {
    return (
      <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
    )
  };


export default CardImage
