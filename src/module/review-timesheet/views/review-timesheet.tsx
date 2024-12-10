import React from 'react'
import ReviewTabs from '../components/review-tabs/review-tabs';
import styles from './review-timesheet.module.scss';

const ReviewTimesheet = () => {
  return (
    <div className={styles.reviewTimesheetWrapper}>
      <ReviewTabs />
    </div>
  )
}

export default ReviewTimesheet;
