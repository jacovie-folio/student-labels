import React from 'react';
import { Student } from '../../types/Student';

const nullFunc = () => null;

export const StudentContext = React.createContext<{
  students: Student[];
  onLoadStudents: React.Dispatch<React.SetStateAction<Student[]>>;

  selectedStudentIds: string[];
  onChangeSelectedStudentIds: (ids: string[]) => void;
}>({
  students: [],
  onLoadStudents: nullFunc,

  selectedStudentIds: [],
  onChangeSelectedStudentIds: nullFunc,
});
