import * as fs from 'fs';
import * as path from 'path';
import React, { useState } from "react";

import type { SensorData } from '../(SensorNode)/SensorNodesComponent';
import type { Path } from '../(Path)/AnimalPathComponent';

import { useDateTimeContext } from '@/providers/DateTimeListProvider';
import { useSelectedDataContext } from '@/providers/SelectedDataProvider';

interface DateTimeSelectorProps {
  children?: React.ReactNode;
  onAnalyze: (selectedFile: string) => void;
}



const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ children, onAnalyze }) => {

  const { isLoading, list, refreshList } = useDateTimeContext();
  const { update } = useSelectedDataContext();


  const handleRefresh = () => {
    refreshList();
  };

  const handleSelect = (datetime: string) => {
    update(datetime);
  };

  if(isLoading) {
    return <div>loading..........</div>
  }

  return (
      <div>
        {children}
        <h2>ファイルリスト</h2>
        <ul>
          { list.length !== 0 ? (
          list.map((datetime, index) => (
            <li
              key={index}
              onClick={() => handleSelect(datetime)}
              style={{
                cursor: 'pointer',
                // backgroundColor: datetime === selectedFile ? '#e0e0e0' : 'transparent'
              }}
            >
              {datetime}
            </li>
          ))
          ) : (
            <>
              {console.log(list)}
              <div>nothing found....</div>
            </>
          )
          }
        </ul>
        <button
          onClick={handleRefresh}
        >
          更新
        </button>
      </div>

  );
};


export default DateTimeSelector;