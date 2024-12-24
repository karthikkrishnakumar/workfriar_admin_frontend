import React, { useState } from 'react';
import { Select, Input, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const CustomSelect = ({ options, placeholder, value, onChange, style }) => {
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  const filteredOptions = options?.filter((option: { label: string; }) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const dropdownRender = () => (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-2 border-b">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full"
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="py-1 max-h-60 overflow-auto">
        {filteredOptions?.map((option: { value: React.Key ; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode>; }) => (
          <div
            key={option.value}
            className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const newValue = value?.includes(option.value)
                ? value.filter((v: React.Key) => v !== option.value)
                : [...(value || []), option.value];
              onChange?.(newValue);
            }}
          >
            <Checkbox
              checked={value?.includes(option.value)}
              className="w-full"
            >
              {option.label}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Select
      mode="multiple"
      open={open}
      onDropdownVisibleChange={setOpen}
      style={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      dropdownRender={dropdownRender}
      dropdownStyle={{ padding: 0 }}
      showArrow
      showSearch={false}
      className="custom-checkbox-select"
    />
  );
};