import ContentLoader from 'react-content-loader';

export const SkeletonForPizzaComponent: React.FC = () => (
  <ContentLoader
    speed={2}
    width={285}
    height={449}
    viewBox="0 0 285 449"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="115" r="112" />
    <rect x="50" y="252" rx="10" ry="10" width="180" height="25" />
    <rect x="0" y="295" rx="8" ry="8" width="285" height="88" />
    <rect x="0" y="412" rx="15" ry="15" width="90" height="27" />
    <rect x="135" y="405" rx="25" ry="25" width="151" height="45" />
  </ContentLoader>
);
