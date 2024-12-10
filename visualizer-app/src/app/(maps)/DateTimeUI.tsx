import React, { useState } from "react";

import { useDateTimeContext } from '@/providers/DateTimeListProvider';
import { useDisplayDataContext } from '@/providers/SelectedDataProvider';

import './DateTimeUI.css';

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

  const formatDate = (dateString: string): string => {
    const [year, month, day, hour, minute, second] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, hour, minute, second);

    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }


  if(isLoading) {
    return <div>loading..........</div>
  }

  return (
      <div>
        {children}
        <ul className='date-time-fixed-container'>
          <h2>検出時刻</h2>
          { list.length !== 0 ? (
          list.map((datetime, index) => (
            <li
              key={index}
              onClick={() => handleSelect(datetime)}
              className="button"
              style={{
                cursor: 'pointer',
                // backgroundColor: datetime === selectedFile ? '#e0e0e0' : 'transparent'
              }}
            >
              {formatDate(datetime)}
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