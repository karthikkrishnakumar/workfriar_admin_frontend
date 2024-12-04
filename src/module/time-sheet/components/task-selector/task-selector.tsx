import React from 'react';
import styles from './task-selector.module.scss';
import SearchBar from '@/themes/components/search-bar/search-bar';
import Icons from '@/themes/images/icons/icons';

interface TaskSelectorProps {
  setSelectedTask: (task: string) => void;
}

const TaskSelector: React.FC<TaskSelectorProps> = ({ setSelectedTask }) => {
  const tasks = [
    { id: 1, name: 'Bug analysis' },
    { id: 2, name: 'UI/UX Design' },
    { id: 3, name: 'Project Meeting' },
    { id: 4, name: 'R&D' },
    { id: 5, name: 'Social media' },
    { id: 6, name: 'Product Development' },
    { id: 7, name: 'QA' },
    { id: 8, name: 'Documentation' },
    { id: 9, name: 'Training' },
    { id: 10, name: 'Internal Review' },
  ];

  const handleTaskClick = (taskName: string) => {
    setSelectedTask(taskName); // Set the selected task
  };

  return (
    <div className={styles.taskSelectorWrapper}>
      <h2>Task category</h2>
      <SearchBar placeholder="Search" />
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => handleTaskClick(task.name)} // Attach click handler
            className={styles.taskItem} // Optional: Add a class for styling
          >
            {task.name}
          </li>
        ))}
      </ul>
      <button className={styles.addTaskButton}>
        <span>{Icons.plusGold}</span> Add task category
      </button>
    </div>
  );
};

export default TaskSelector;
