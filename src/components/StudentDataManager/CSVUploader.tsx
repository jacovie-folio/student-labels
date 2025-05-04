import { Input } from '@mui/material';
import Papa from 'papaparse';
import React from 'react';
import { STUDENT_CACHE_KEY } from '../../const';
import { Student } from '../../types/Student';

type Props = {
  onDataLoaded: (data: {
    students: Student[];
    loadedFromCache: boolean;
  }) => void;
};

const CSVUploader: React.FC<Props> = ({ onDataLoaded }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as Student[];
        const parsed = data.map((d, i) => ({
          id: `${i}`,
          name: d.name.trim(),
          homeroom: d.homeroom.trim(),
          grade: d.grade.trim(),
          last: d.last.trim(),
          first: d.first.trim(),
          numCopies: 1,
        }));
        localStorage.setItem(STUDENT_CACHE_KEY, JSON.stringify(parsed));
        onDataLoaded({ students: parsed, loadedFromCache: false });
      },
    });
  };

  return (
    <Input
      type="file"
      slotProps={{ input: { accept: '.csv' } }}
      onChange={handleFileUpload}
    />
  );
};

export default CSVUploader;
