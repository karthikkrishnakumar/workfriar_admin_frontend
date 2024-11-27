import React from 'react';
import styles from './task-selector.module.scss';
import SearchBar from '@/themes/components/search-bar/search-bar';
import Icons from '@/themes/images/icons/icons';

const TaskSelector = () => {
    const projects = [
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

    return (
        <div className={styles.projectSelectorWrapper}>
            <h2>Projects</h2>
            <SearchBar placeholder="Search" />
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        {project.name}
                        <span>{Icons.arrowRightGrey}</span>
                    </li>
                ))}
            </ul>
            <button className={styles.addProjectButton}><span>{Icons.plusGold}</span> Add Project</button>
        </div>
    );
};

export default TaskSelector;
