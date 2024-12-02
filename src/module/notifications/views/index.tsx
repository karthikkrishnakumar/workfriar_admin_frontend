import {NotificationList} from  '../components/notifications/notifications'
import React from 'react';

const notificationData = [
  {
    date: 'Today',
    items: [
      {
        message: 'Your timesheet due pending of last week.',
        time: '12:30 PM'
      },
      {
        message: 'Your time sheet is approved my Maddy.',
        time: '12:30 PM'
      }
    ]
  },
  {
    date: 'Yesterday',
    items: [
      {
        message: 'Your timesheet due pending of last week.',
        time: '12:30 PM'
      },
      {
        message: 'Your time sheet is approved my Maddy.',
        time: '12:30 PM'
      }
    ]
  },
  {
    date: 'Aug 1, 2024',
    items: [
      {
        message: 'Your timesheet due pending of last week.',
        time: '12:30 PM'
      },
      {
        message: 'Your time sheet is approved my Maddy.',
        time: '12:30 PM'
      }
    ]
  }
];

const NotificationView: React.FC = () => {
  return (
    <NotificationList notifications={notificationData}/>
    );
};

export default NotificationView;