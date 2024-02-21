import Div from '../Div';

export default function UserHeading({ bgSrc }) {
  return (
    <Div
      className="cs-page_heading cs-style1 cs-center text-center cs-bg"
      style={{ backgroundImage: `url(${bgSrc})` }}
    />
  );
}
