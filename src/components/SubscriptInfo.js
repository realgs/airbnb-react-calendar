import React from 'react';

const SubscriptInfo = ({ lastupdate }) => {
  return (
    <div className="subscript">
      <span className="subscript__info">
        Minimum stay varies
      </span>
      <span className="subscript__update">
        Updated {lastupdate} days ago
      </span>
    </div>
  );
};


export default SubscriptInfo;