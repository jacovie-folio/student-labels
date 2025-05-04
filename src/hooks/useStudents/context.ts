import React from 'react';
import { Student } from '../../types/Student';

const nullFunc = () => null;

export const StudentContext = React.createContext<{
  students: Student[];
  loadedFromCache: boolean;
  onLoadStudents: React.Dispatch<
    React.SetStateAction<{ students: Student[]; loadedFromCache: boolean }>
  >;
  onUpdateStudents: (
    studentUpdateFn: (priorStudents: Student[]) => Student[]
  ) => void;

  selectedStudentIds: string[];
  onChangeSelectedStudentIds: (ids: string[]) => void;

  gap: number;
  setGap: (gap: number) => void;
}>({
  students: [],
  loadedFromCache: false,
  onLoadStudents: nullFunc,
  onUpdateStudents: nullFunc,

  selectedStudentIds: [],
  onChangeSelectedStudentIds: nullFunc,
  gap: 0,
  setGap: nullFunc,
});
