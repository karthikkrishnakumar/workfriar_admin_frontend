"use client";

import TabComponent from '@/themes/components/tabs/tabs';
import React, { useEffect, useState } from 'react'
import AllHolidays from '../all-holidays/all-holidays';
import IndianHolidays from '../indian-holidays/indian-holidays';
import DubaiHolidays from '../dubai-holidays/dubai-holidays';

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
          content:<IndianHolidays year={num}/>,
        },
        {
          key: "3",
          label: (
            <>
              Techfriar Dubai
            </>
          ),
          content: <DubaiHolidays year={num}/>,
        },
      ];

      useEffect(() => {
        
      }, []);

  
  return (
    <>
      <TabComponent  headings={tabs}/>
    </>
  )
}

export default HolidayTabs;
