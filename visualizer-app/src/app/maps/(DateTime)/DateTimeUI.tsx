import React, { useState } from "react";

import { useDateTimeContext } from '@/providers/DateTimeListProvider';
import { useDisplayDataContext } from '@/providers/SelectedDataProvider';

interface DateTimeSelectorProps {
  children?: React.ReactNode;
}


const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ children }) => {

  const { isLoading, list, refreshList } = useDateTimeContext();
  const { update } = useDisplayDataContext();


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