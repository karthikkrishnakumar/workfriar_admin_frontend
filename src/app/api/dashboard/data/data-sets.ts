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
  stats: [
    {
      year: 2023,
      saved: 2,
      approved: 1,
      rejected: 0,
      months: [
        { month: "November", saved: 1, approved: 0, rejected: 0 },
        { month: "December", saved: 1, approved: 1, rejected: 0 },
      ],
    },
    {
      year: 2024,
      saved: 3,
      approved: 1,
      rejected: 3,
      months: [
        { month: "January", saved: 2, approved: 0, rejected: 0 },
        { month: "February", saved: 1, approved: 1, rejected: 3 },
      ],
    },
  ],
  timesheetData: {
    days: [
      {
        dayOfWeek: "SUN",
        date: "2024/10/27",
        hours: "05:30", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "MON",
        date: "2024/10/28",
        hours: "06:00", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "TUE",
        date: "2024/10/29",
        hours: "07:30", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "WED",
        date: "2024/10/30",
        hours: "02:30", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "THUR",
        date: "2024/10/31",
        hours: "08:00", // Example hours, adjust as needed
        disable: false,
      },
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
        dayOfWeek: "TUE",
        date: "2024/11/19",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "WED",
        date: "2024/11/20",
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
      {
        dayOfWeek: "SAT",
        date: "2024/11/23",
        hours: "07:00",
        disable: false,
      },

      {
        dayOfWeek: "SUN",
        date: "2024/12/01",
        hours: "00:00",
        disable: false,
      },
      {
        dayOfWeek: "MON",
        date: "2024/12/02",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "TUE",
        date: "2024/12/03",
        hours: "00:00",
        disable: false,
      },
      {
        dayOfWeek: "WED",
        date: "2024/12/04",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "THU",
        date: "2024/12/05",
        hours: "00:00",
        disable: false,
      },
      {
        dayOfWeek: "FRI",
        date: "2024/12/06",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "SAT",
        date: "2024/12/07",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "SUN",
        date: "2024/11/24",
        hours: "05:30", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "MON",
        date: "2024/11/25",
        hours: "06:00", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "TUE",
        date: "2024/11/26",
        hours: "07:30", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "WED",
        date: "2024/11/27",
        hours: "02:30", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "THUR",
        date: "2024/11/28",
        hours: "08:00", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "FRI",
        date: "2024/11/29",
        hours: "01:00", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "SAT",
        date: "2024/11/30",
        hours: "03:00", // Example hours, adjust as needed
        disable: false,
      },
      {
        dayOfWeek: "TUE",
        date: "2024/12/03",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "WED",
        date: "2024/12/04",
        hours: "02:30",
        disable: false,
      },
      {
        dayOfWeek: "THUR",
        date: "2024/12/05",
        hours: "08:00",
        disable: false,
      },
      {
        dayOfWeek: "FRI",
        date: "2024/12/06",
        hours: "01:00",
        disable: false,
      },
      {
        dayOfWeek: "SAT",
        date: "2024/12/07",
        hours: "03:00",
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
  stats: [
    {
      year: 2023,
      saved: 2,
      approved: 1,
      rejected: 0,
      months: [
        { month: "November", saved: 1, approved: 0, rejected: 0 },
        { month: "December", saved: 1, approved: 1, rejected: 0 },
      ],
    },
    {
      year: 2024,
      saved: 3,
      approved: 1,
      rejected: 3,
      months: [
        { month: "January", saved: 2, approved: 0, rejected: 0 },
        { month: "February", saved: 1, approved: 1, rejected: 3 },
      ],
    },
  ],
  timesheetData: {
    days: [
      {
        dayOfWeek: "MON",
        date: "2023/11/20",
        hours: "06:00",
        disable: false,
      },
      {
        dayOfWeek: "WED",
        date: "2023/12/15",
        hours: "07:30",
        disable: false,
      },
      {
        dayOfWeek: "FRI",
        date: "2024/01/12",
        hours: "08:00",
        disable: false,
      },
      {
        dayOfWeek: "MON",
        date: "2024/02/10",
        hours: "04:00",
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
