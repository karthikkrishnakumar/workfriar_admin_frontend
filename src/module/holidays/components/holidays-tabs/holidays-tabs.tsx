"use client";

import TabComponent from '@/themes/components/tabs/tabs';
import React, { useEffect, useState } from 'react'
import AllHolidays from '../all-holidays/all-holidays';

const HolidayTabs = () => {
    const [num,setNum] = useState('2024');
    const tabs = [
        {
          key: "1",
          label: <>All</>,
          content: (
            <AllHolidays year={num} />
          ),
        },
        {
          key: "2",
          label: (
            <>
              Techfriar India
            </>
          ),
          content:<></>,
        },
        {
          key: "3",
          label: (
            <>
              Techfriar Dubai
            </>
          ),
          content: <></>,
        },
      ];

      useEffect(() => {
        
      }, []);

  
  return (
    <div>
      <TabComponent  headings={tabs}/>
    </div>
  )
}

export default HolidayTabs;
