// src/app/data.ts

export const dataForUser1 = {
    projectTimeChart: [
      { project: "One view", hours: 10 },
      { project: "Danti", hours: 8 },
      { project: "Techfriar", hours: 6 },
      { project: "Unutilized", hours: 1 },
      { project: "Soezy", hours: 7 },
      { project: "Votefriar", hours: 3 },
      { project: "Court click", hours: 9 },
    ],
    stats: { saved: 3, approved: 3, rejected: 3 },
    timesheetData: {
      days: [
        {
          dayOfWeek: "SUN",
          date: "2024/11/17",
          hours: "00:00",
          disable: false,
        },
        {
          dayOfWeek: "MON",
          date: "2024/11/18",
          hours: "07:30",
          disable: false,
        },
        {
          dayOfWeek: "THUR",
          date: "2024/11/21",
          hours: "08:00",
          disable: false,
        },
        {
          dayOfWeek: "FRI",
          date: "2024/11/22",
          hours: "07:00",
          disable: false,
        },
      ],
    },
    notifications: [
      {
        id: 1,
        message: "Your project deadline is approaching.",
        time: "14:30",
        origin: "System",
      },
      {
        id: 2,
        message: "New project has been assigned.",
        time: "09:00",
        origin: "Project Manager",
      },
      {
        id: 3,
        message: "Weekly report is due in 2 days.",
        time: "16:15",
        origin: "HR",
      },
    ],
  };
  
  export const dataForUser2 = {
    projectTimeChart: [
      { project: "Project Alpha", hours: 15 },
      { project: "Project Beta", hours: 5 },
      { project: "Project Gamma", hours: 12 },
    ],
    stats: { saved: 5, approved: 2, rejected: 0 },
    timesheetData: {
      days: [
        {
          dayOfWeek: "MON",
          date: "2024/11/18",
          hours: "06:00",
          disable: false,
        },
        {
          dayOfWeek: "WED",
          date: "2024/11/20",
          hours: "07:30",
          disable: false,
        },
        {
          dayOfWeek: "FRI",
          date: "2024/11/22",
          hours: "08:00",
          disable: false,
        },
      ],
    },
    notifications: [
      {
        id: 1,
        message: "Project deadline approaching!",
        time: "13:00",
        origin: "Manager",
      },
      {
        id: 2,
        message: "Team meeting tomorrow.",
        time: "09:30",
        origin: "HR",
      },
    ],
  };
  


 export const HolidayData = [
    {
      id: 1,
      holidayName: "Diwali",
      holidayDate: "Thu, 31 October, 2024",
    },
    {
      id: 2,
      holidayName: "Christmas",
      holidayDate: "Wed, 25 December, 2024",
    },
    {
      id: 3,
      holidayName: "New Year's Day",
      holidayDate: "Wed, 1 January, 2025",
    },
    {
      id: 4,
      holidayName: "Independence Day",
      holidayDate: "Thu, 15 August, 2024",
    },
    {
      id: 5,
      holidayName: "Eid al-Fitr",
      holidayDate: "Mon, 10 June, 2024",
    },
  ];