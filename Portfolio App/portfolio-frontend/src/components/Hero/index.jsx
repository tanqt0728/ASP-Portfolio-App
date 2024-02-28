import parse from "html-react-parser";
import Div from "../Div";

export default function Hero({ title, subtitle, bgImageUrl }) {
  return (
    <Div
      className="cs-bg cs-fixed_bg"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <Div className="cs-hero cs-style1 cs-shape_wrap_1">
        <Div className="cs-shape_1" />
        <Div className="cs-shape_1" />
        <Div className="cs-shape_1" />
        <Div className="container">
          <Div className="cs-hero_text">
            <h1 className="cs-hero_title">{parse(title)}</h1>
            <Div className="cs-hero_info">
              <Div>
                <Div className="cs-hero_subtitle">{subtitle}</Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
