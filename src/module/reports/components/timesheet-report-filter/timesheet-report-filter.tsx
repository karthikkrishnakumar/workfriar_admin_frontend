import React, { useState, useEffect } from "react";
import styles from "./timesheet-report-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";
import "react-datepicker/dist/react-datepicker.css"; // Include its styles
import TabbedComponent from "@/themes/components/tabbed-filter/tabbed-filter";
import CustomDatePicker from "@/themes/components/datepicker-calender/datepicker-calender";
import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import RadioComponent from "@/themes/components/radio-button/radio-button";
import { RadioChangeEvent } from "antd";
import UseTimeSheetServices from "../../services/timesheet-report/timesheet-report-services";

interface TimeSheetReportFilterProps {
  onClose: () => void;
  onFilterApply: (filters: {
    startDate?: string | null;
    endDate?: string | null;
    projectIds?: string[] | null;
    userIds?: string[] | null;
    year?: string | null;
    month?: string | null;
  }) => void;
  appliedFilters?: {
    startDate?: string | null;
    endDate?: string | null;
    projectIds: string[] | null;
    userIds: string[] | null;
    year?: string | null;
    month?: string | null;
  };
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TimeSheetReportFilter: React.FC<TimeSheetReportFilterProps> = ({
  onClose,
  onFilterApply,
  appliedFilters,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    appliedFilters?.startDate ? new Date(appliedFilters?.startDate) : null,
    appliedFilters?.endDate ? new Date(appliedFilters?.endDate) : null,
  ]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    appliedFilters?.projectIds || []
  );
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    appliedFilters?.userIds || []
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    appliedFilters?.year ?? ""
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    appliedFilters?.month ?? ""
  );
  const [disabledTabs, setDisabledTabs] = useState<number[]>([]); // Store disabled tabs index
  const [projects, setProjects] = useState<
    { id: string; project_name: string }[]
  >([]); // Array to store projects
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>(
    []
  );

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    // If a date range is selected, disable "Month" and "Year" tabs.
    if (dates[0] || dateRange[0]) {
      setDisabledTabs([2, 3]); // Disable Year, Month, and Period tabs.
    } else {
      // If no date range is selected, reset the disabled tabs.
      setDisabledTabs([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await UseTimeSheetServices().fetchProjectsAndEmployees();
      if (result.status) {
        setProjects(result.data.projects);
        setEmployees(result.data.employees);
        setLoading(false);
      } else {
        console.error(result.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dateRange[0]) {
      setDisabledTabs([2, 3]);
    } else if (selectedMonth || selectedYear) {
      setDisabledTabs([4]);
    } else {
      setDisabledTabs([]);
    }
  }, [dateRange, selectedMonth, selectedYear]);

  const handleProjectChange = (project: string, e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedProjects([...selectedProjects, project]);
    } else {
      setSelectedProjects(selectedProjects.filter((item) => item !== project));
    }
  };

  const handleEmployeeChange = (employee: string, e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedEmployees([...selectedEmployees, employee]);
    } else {
      setSelectedEmployees(
        selectedEmployees.filter((item) => item !== employee)
      );
    }
  };

  const onYearChange = (e: RadioChangeEvent) => {
    setSelectedYear(e.target.value);
    setDisabledTabs(e.target.value || selectedMonth ? [4] : []); // Disable the "Period" tab when Year or Month is selected
  };

  const onMonthChange = (e: RadioChangeEvent) => {
    setSelectedMonth(e.target.value);
    setDisabledTabs(selectedYear || e.target.value ? [4] : []); // Disable the "Period" tab when Year or Month is selected
  };

  const handleApply = () => {
    const [startDate, endDate] = dateRange;
    onFilterApply({
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      projectIds: selectedProjects.length ? selectedProjects : null,
      userIds: selectedEmployees.length ? selectedEmployees : null,
      year: selectedYear || null,
      month: selectedMonth || null,
    });
    onClose();
  };

  const handleClearAll = () => {
    setDateRange([null, null]);
    setSelectedProjects([]);
    setSelectedEmployees([]);
    setSelectedYear("");
    setSelectedMonth("");
    setDisabledTabs([]); // Reset disabled tabs
  };

  const tabs = [
    {
      name: "Project",
      content: (
        <div className={styles.projectFilter}>
          {projects.map((project) => (
            <label key={project.id} className={styles.checkboxLabel}>
              <CheckboxComponent
                checked={selectedProjects.includes(project.id)}
                onChange={(e) => handleProjectChange(project.id, e)}
              />
              {project.project_name}
            </label>
          ))}
        </div>
      ),
    },
    {
      name: "Employee",
      content: (
        <div className={styles.employeeFilter}>
          {employees.map((employee) => (
            <label key={employee.id} className={styles.checkboxLabel}>
              <CheckboxComponent
                checked={selectedEmployees.includes(employee.id)}
                onChange={(e) => handleEmployeeChange(employee.id, e)}
              />
              {employee.name}
            </label>
          ))}
        </div>
      ),
    },
    {
      name: "Year",
      content: (
        <div className={styles.yearFilter}>
          {Array.from(
            { length: new Date().getFullYear() - 2000 + 1 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <label key={year} className={styles.radioLabel}>
              <RadioComponent
                checkedValue={selectedYear}
                value={year}
                onChange={onYearChange}
              />
              {year}
            </label>
          ))}
        </div>
      ),
      disabled: disabledTabs.includes(2),
      tooltipMessage: disabledTabs.includes(2)
        ? "You cannot select a year when period is selected"
        : "",
    },
    {
      name: "Month",
      content: (
        <div className={styles.monthFilter}>
          {months.map((month, index) => (
            <label key={index} className={styles.radioLabel}>
              <RadioComponent
                checkedValue={selectedMonth}
                value={(index + 1).toString()}
                onChange={onMonthChange}
              />
              {month}
            </label>
          ))}
        </div>
      ),
      disabled: disabledTabs.includes(3),
      tooltipMessage: disabledTabs.includes(3)
        ? "You cannot select a month when period is selected"
        : "",
    },
    {
      name: "Period",
      content: (
        <div className={styles.periodFilter}>
          <CustomDatePicker
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onDateChange={handleDateChange}
          />
        </div>
      ),
      disabled: disabledTabs.includes(4),
      tooltipMessage: disabledTabs.includes(4)
        ? "You cannot select a period when year or month is selected."
        : "",
    },
  ];

  return (
    <ModalComponent
      isVisible={true}
      title={"Filter"}
      topButtonContent={
        <ButtonComponent
          label="Clear All"
          theme="golden"
          onClick={handleClearAll}
        />
      }
      content={
        <TabbedComponent
          tabs={tabs}
          disabledTabs={disabledTabs} // Pass disabled tabs
          classTabbedComponent={styles.classTabbedComponent}
        />
      }
      bottomContent={
        <>
          <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
          <ButtonComponent label="Apply" theme="black" onClick={handleApply} />
        </>
      }
      theme="normal"
      onClose={onClose}
      isLoading={loading}
      className={styles.modalDiv}
      classTitle={styles.classTitle}
      classTopButton={styles.classTopButton}
    />
  );
};

export default TimeSheetReportFilter;
