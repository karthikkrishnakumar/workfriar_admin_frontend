"use client";

import TabComponent from '@/themes/components/tabs/tabs';
import React, { useEffect, useState } from 'react'
import AllHolidays from '../all-holidays/all-holidays';
import IndianHolidays from '../indian-holidays/indian-holidays';
import DubaiHolidays from '../dubai-holidays/dubai-holidays';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ModalComponent from '@/themes/components/modal/modal';
import { closeModal } from '@/redux/slices/modalSlice';
import AddHolidayModal from '../add-holiday-modal/add-holiday-modal';

const HolidayTabs = () => {
    const [num,setNum] = useState('2024');
    const dispatch = useDispatch();


    const { isOpen, modalType } = useSelector((state: RootState) => state.modal);

    const handleCloseModal = () => {
        dispatch(closeModal());
      };

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

      <ModalComponent isVisible={isOpen} title='Add Holiday' onClose={handleCloseModal} theme='normal' content={<AddHolidayModal/>}/>
    </>

  )
}

export default HolidayTabs;
