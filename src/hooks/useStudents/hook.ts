import React from 'react';
import { StudentContext } from './context';

export const useStudents = () => {
  const context = React.useContext(StudentContext);

  if (!context) {
    throw new Error(
      '`useStudents` must be used in a component under a `StudentsProvider`!'
    );
  }

  return context;
};
