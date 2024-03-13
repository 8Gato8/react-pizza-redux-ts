import ContentLoader from 'react-content-loader';

export const SkeletonForSinglePizzaPage: React.FC = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={582}
    viewBox="0 0 500 582"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="250" cy="135" r="130" />
    <rect x="130" y="290" rx="10" ry="10" width="255" height="30" />
    <rect x="10" y="358" rx="8" ry="8" width="490" height="70" />
    <rect x="215" y="468" rx="15" ry="15" width="65" height="27" />
    <rect x="135" y="532" rx="25" ry="25" width="230" height="52" />
  </ContentLoader>
);
