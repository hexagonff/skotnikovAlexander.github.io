export const contactTooltip = (type, value) => {
  const tooltip = document.createElement('div');
  const tooltipType = document.createElement('span');
  const tooltipValue = document.createElement('a');

  tooltip.classList.add('contact-tooltip', 'tooltip');
  tooltipType.classList.add('contact-tooltip__type');
  tooltipValue.classList.add('contact-tooltip__value');

  tooltipType.textContent = type + ':\u00A0';
  tooltipValue.textContent = value;

  tooltip.append(tooltipType, tooltipValue);

  return {
      tooltip,
      tooltipType,
      tooltipValue
  }
};
