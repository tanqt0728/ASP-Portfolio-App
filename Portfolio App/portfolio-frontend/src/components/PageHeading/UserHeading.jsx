import Link from 'next/link';

import Div from '../Div';

export default function UserHeading({ title, bgSrc, pageLinkText, profileImg }) {
  return (
    <Div
      className="cs-page_heading cs-style1 cs-center text-center cs-bg"
      style={{ backgroundImage: `url(${bgSrc})` }}
    />
  );
}
