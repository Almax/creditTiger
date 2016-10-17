/**
 * This is just a wrapper for easy use of tooltip.
 */
import React from 'react';
import tooltip from 'react-toolbox/lib/tooltip';
import omit from 'lodash/omit';
import theme from './TooltipWrapper.scss';

function Div(props) {
  const rest = omit(props,
    ['theme', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick']);
  return (<div {...rest} />);
}

const Tooltip = tooltip(Div);

/**
 * This wrapper add theme style and default delay, and disable tooltip when `tooltip` is empty.
 * @param props
 * @constructor
 */
export default function TooltipWrapper(props) {
  if (props.tooltip) {
    return (<Tooltip
      tooltipDelay={400}
      {...props}
      theme={Object.assign({}, theme, props.theme || {})} />);
  }
  return <Div {...props} />;
}

TooltipWrapper.propTypes = {
  tooltip: React.PropTypes.any,
  theme: React.PropTypes.object,
};
