import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="192" cy="145" r="2" />
    <circle cx="135" cy="132" r="121" />
    <rect x="0" y="273" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="323" rx="11" ry="11" width="280" height="79" />
    <rect x="0" y="427" rx="10" ry="10" width="95" height="30" />
    <rect x="132" y="418" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
