"use client";
import React, { useState, useEffect } from 'react';
import { Avatar as AntAvatar, Skeleton } from 'antd';
import { AvatarProps } from 'antd/es/avatar';
import { UserOutlined } from '@ant-design/icons';

interface CustomAvatarProps extends AvatarProps {
  name?: string;
  profile?: string;
  src?: string | undefined;
  size?:number;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ 
  name, 
  src, 
  style, 
  size = 40, 
  ...restProps 
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    setImageFailed(true);
    setLoading(false); // Stop loading if the image fails to load
    return false; // Prevent Ant Design from showing the default broken image
  };

  useEffect(() => {
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => setLoading(false);
      image.onerror = handleImageError;
    } else {
      setLoading(false); // If no `src`, stop loading immediately
    }
  }, [src]);

  if (loading) {
    // Show shimmer effect while loading
    return (
      <Skeleton.Avatar 
        active 
        size={size} 
        style={{ ...style }} 
        shape="circle" 
      />
    );
  }

  if ((!src || imageFailed) && name) {
    // Display the first letter of the name
    return (
      <AntAvatar
        style={{
          backgroundColor: '#FFE3B8',
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}
        size={size}
        {...restProps}
      >
        {name.charAt(0).toUpperCase()}
      </AntAvatar>
    );
  }

  if ((!src || imageFailed) && !name) {
    // Display the default user icon
    return (
      <AntAvatar
        icon={<UserOutlined />}
        style={style}
        size={size}
        {...restProps}
      />
    );
  }

  // Render the image if it exists and hasn't failed to load
  return (
    <AntAvatar
      src={src}
      onError={handleImageError}
      size={size}
      style={style}
      {...restProps}
    />
  );
};

export default CustomAvatar;
