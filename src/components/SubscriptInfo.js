import React from 'react';

const SubscriptInfo = ({ lastModified, lastUpdate, clearDates }) => {
  return (
    <div className="subscript">
      <span className="subscript__info">
        Minimum stay varies
      </span>
      {lastUpdate && (
        <span className="subscript__update">
          Updated {lastUpdate} days ago
        </span>
      )}
      {lastModified && (
        <div className="subscript__clearDates">
          <button className="subscript__clearDates__button" onClick={clearDates}>Clear dates</button>
        </div>
      )}
    </div>
  );
};

export default SubscriptInfo;