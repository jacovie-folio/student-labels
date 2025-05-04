import React from 'react';
import { Student } from '../../types/Student';
import { StudentContext } from './context';

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  return (
    <StudentContext.Provider
      value={{
        students,
        onLoadStudents: setStudents,
        selectedStudentIds: selectedIds,
        onChangeSelectedStudentIds: setSelectedIds,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
