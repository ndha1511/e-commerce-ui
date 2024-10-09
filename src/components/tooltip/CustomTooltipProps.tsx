import React from 'react';
import { Tooltip, TooltipProps } from 'react-bootstrap';

interface CustomTooltipProps extends TooltipProps {
  text: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ text, ...props }) => (
  <Tooltip id="custom-tooltip" {...props} className="custom-tooltip">
    {text}
  </Tooltip>
);

export default CustomTooltip;
