import React from "react";
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import PortfolioSlider from '../Slider';
import Spacing from '../Spacing';
import Button from '../Button';

const PortfoliosExplore = ({ title, subtitle, variant, btnLink, btnText }) => {
  return (
    <Div>
      <Div className="container">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          variant={variant}
        />
        <Div className="cs-center" >
          <Spacing lg="90" md="45" />
          <Button btnLink={btnLink} btnText={btnText}/>
        </Div>
      </Div>
      <PortfolioSlider />
    </Div>
  )
}

export default PortfoliosExplore
