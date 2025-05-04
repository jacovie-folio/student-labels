import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React from 'react';
import { useStudents } from '../../hooks/useStudents';
import { Student } from '../../types/Student';

const StudentTable: React.FC = () => {
  const { students, onUpdateStudents, onChangeSelectedStudentIds } =
    useStudents();

  const columns: GridColDef[] = [
    {
      field: 'numCopies',
      headerName: 'Copies',
      width: 100,
      editable: true,
      type: 'number',
    },
    { field: 'first', headerName: 'First Name', flex: 1 },
    { field: 'last', headerName: 'Last Name', flex: 1 },
    {
      field: 'homeroom',
      headerName: 'Homeroom',
      flex: 1,
      type: 'singleSelect',
      valueOptions: students.reduce(
        (part, next) => [
          ...part,
          ...(part.includes(next.homeroom) ? [] : [next.homeroom]),
        ],
        [] as string[]
      ),
    },
    {
      field: 'grade',
      headerName: 'Grade',
      type: 'singleSelect',
      valueOptions: students.reduce(
        (part, next) => [
          ...part,
          ...(part.includes(next.grade) ? [] : [next.grade]),
        ],
        [] as string[]
      ),
    },
  ];

  return (
    <DataGrid
      rows={students}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={(selection: GridRowSelectionModel) =>
        onChangeSelectedStudentIds([...selection.ids].map((id) => `${id}`))
      }
      processRowUpdate={(newRow: Student) => {
        onUpdateStudents((students) =>
          students.map((student) =>
            student.id === newRow.id
              ? { ...student, numCopies: newRow.numCopies }
              : student
          )
        );
        return newRow;
      }}
      sx={{ width: '100%', maxHeight: '80vh' }}
    />
  );
};

export default StudentTable;
