"use client";

import TabComponent from '@/themes/components/tabs/tabs';
import React, { useState } from 'react'
import AllHolidays from '../all-holidays/all-holidays';
import IndianHolidays from '../indian-holidays/indian-holidays';
import DubaiHolidays from '../dubai-holidays/dubai-holidays';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ModalComponent from '@/themes/components/modal/modal';
import { closeModal } from '@/redux/slices/modalSlice';
import AddHolidayModal from '../add-holiday-modal/add-holiday-modal';
import YearSelector from '../year-selector/year-selector';
const HolidayTabs = () => {
    const [year,setYear] = useState<string>();
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
            <AllHolidays year={year!} />
          ),
        },
        {
          key: "2",
          label: (
            <>
              Techfriar India
            </>
          ),
          content:<IndianHolidays year={year!}/>,
        },
        {
          key: "3",
          label: (
            <>
              Techfriar Dubai
            </>
          ),
          content: <DubaiHolidays year={year!}/>,
        },
      ];


  
  return (
    <>
      <TabComponent  headings={tabs} subHeading={<YearSelector onChange={setYear}/>}/>

      <ModalComponent isVisible={isOpen} title='Add Holiday' onClose={handleCloseModal} theme='normal' content={<AddHolidayModal/>}/>
    </>

  )
}

export default HolidayTabs;
