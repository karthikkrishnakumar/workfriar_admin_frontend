"use client";
import React, { useState } from 'react';
import { Avatar as AntAvatar } from 'antd';
import { AvatarProps } from 'antd/es/avatar';
import { UserOutlined } from '@ant-design/icons';

interface CustomAvatarProps extends AvatarProps {
  name?: string;
  profile?: string;
  src?: string | undefined;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ 
  name, 
  profile,
  src, 
  style, 
  size = 40, 
  ...restProps 
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageError = () => {
    setImageFailed(true);
    return false; // Prevents Ant Design from showing the default broken image
  };

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
        {name ? name.charAt(0).toUpperCase():""}
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