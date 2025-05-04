import React from 'react';
import { STUDENT_CACHE_KEY } from '../../const';
import { Student } from '../../types/Student';
import { StudentContext } from './context';

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ students, loadedFromCache }, setStudents] = React.useState<{
    students: Student[];
    loadedFromCache: boolean;
  }>(() => {
    const cache = localStorage.getItem(STUDENT_CACHE_KEY);
    if (cache) {
      return { students: JSON.parse(cache), loadedFromCache: true };
    }

    return { students: [], loadedFromCache: false };
  });
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const onUpdateStudents = React.useCallback(
    (newStudentsFn: (priorStudents: Student[]) => Student[]) =>
      setStudents((priorStudents) => ({
        ...priorStudents,
        students: newStudentsFn(priorStudents.students),
      })),
    []
  );

  const [gap, setGap] = React.useState(0);

  return (
    <StudentContext.Provider
      value={{
        students,
        loadedFromCache,
        onLoadStudents: setStudents,
        onUpdateStudents,
        selectedStudentIds: selectedIds,
        onChangeSelectedStudentIds: setSelectedIds,
        gap,
        setGap,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
