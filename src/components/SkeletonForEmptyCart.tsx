import ContentLoader from 'react-content-loader';

export const SkeletonForEmptyCart: React.FC = () => (
  <ContentLoader
    speed={2}
    width={790}
    height={514}
    viewBox="0 0 514 790"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="50" y="15" rx="10" ry="10" width="400" height="40" />
    <rect x="0" y="95" rx="8" ry="8" width="790" height="80" />
    <rect x="30" y="220" rx="15" ry="15" width="455" height="400" />
    <rect x="105" y="710" rx="30" ry="30" width="325" height="80" />
  </ContentLoader>
);
