"use client";
import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import { AvatarProps } from 'antd/es/avatar';

interface CustomAvatarProps extends AvatarProps {
  name?: string;
  profile?:string
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ 
  name, 
  profile,
  src, 
  style, 
  size = 40, 
  ...restProps 
}) => {
  // If no image is provided, generate an avatar with the first letter
  if (!src && name) {
    return (
      <AntAvatar 
        style={{
          backgroundColor: '#FFE3B8',
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...style
        }}
        size={size}
        {...restProps}
      >
        {name.charAt(0).toUpperCase()}
      </AntAvatar>
    );
  }

  // If image is provided, render with the image
  return (
    <AntAvatar 
      src={src}
      size={size}
      style={style}
      {...restProps}
    />
  );
};

export default CustomAvatar;