"use client";
import React, { useState, useEffect } from 'react';
import { Avatar as AntAvatar, Skeleton } from 'antd';
import { AvatarProps } from 'antd/es/avatar';
import { UserOutlined } from '@ant-design/icons';

interface CustomAvatarProps extends AvatarProps {
  name?: string;
  profile?: string;
  src?: string | undefined;
  size?: number;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  name = '',
  src,
  style = {},
  size = 40,
  ...restProps
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [loading, setLoading] = useState(!!src);

  const handleImageError = () => {
    setImageFailed(true);
    setLoading(false);
    return false; // Prevent Ant Design from showing the default broken image
  };

  useEffect(() => {
    setImageFailed(false); // Reset the imageFailed state on src change
    setLoading(!!src); // Reset the loading state when src changes

    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => setLoading(false);
      image.onerror = handleImageError;

      return () => {
        image.onload = null;
        image.onerror = null;
      };
    } else {
      setLoading(false); // If no src, stop loading immediately
    }
  }, [src]);

  if (loading) {
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
    return (
      <AntAvatar
        icon={<UserOutlined />}
        style={style}
        size={size}
        {...restProps}
      />
    );
  }

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
