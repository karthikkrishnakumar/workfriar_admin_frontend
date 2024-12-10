export const departmentOptions = [
  { label: "Management", value: "Management" },
  { label: "Operations", value: "Operations" },
  { label: "Finance", value: "Finance" },
  { label: "Technical", value: "Technical" },
  { label: "HR", value: "HR" },
];

export const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const CATEGORIES = [
  "Timesheet",
  "Projects",
  "Task category",
  "Project Team",
  "Clients",
  "Users",
  "Project Forecast",
];


export const MOCK_PERMISSIONS = {
  data: [
    {
      category: "Timesheet",
      actions: {
        view: true,
        edit: true,
        review: false,
        delete: true,
      },
    },
    {
      category: "Projects",
      actions: {
        view: true,
        edit: true,
        review: true,
        delete: true, 
      },
    },
    {
      category: "Clients",
      actions: {
        view: true,
        edit: true,
        review: false,
        delete: false,
      },
    },
    {
      category: "Users",
      actions: {
        view: true,
        edit: false,
        review: false,
        delete: true,
      },
    },
  ],
};


export const MOCK_USERS = {
  data: [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user3", name: "Bob Johnson" },
    { id: "user4", name: "Jacob Johnson" },
    { id: "user5", name: "Yadhu Johnson" },
    { id: "user6", name: "Jishnu Johnson" },
    { id: "user7", name: "Arya Raj" },
  ],
};


export const MOCK_MAPPED_USERS = {
  data: [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user6", name: "Jishnu Johnson" },
  ],
};