import { alpha, useTheme } from '@mui/material/styles';
import { useCallback } from 'react';

const percentColors = [
  { percentage: 0, color: { r: 255, g: 99, b: 71 } }, // tomato
  { percentage: 0.2, color: { r: 255, g: 99, b: 71 } }, // tomato
  { percentage: 0.4, color: { r: 255, g: 165, b: 0 } }, // orange
  { percentage: 0.6, color: { r: 46, g: 139, b: 87 } }, // seagreen
  { percentage: 1, color: { r: 46, g: 139, b: 87 } }, // seagreen
];

export const useCustomColor = () => {
  // const theme = useTheme()

  // console.log(theme.vars.palette.grey[400], 'theme.vars.palette.grey[400]')

  const getColorByText = useCallback((text: string): string => {
    switch (text) {
      case 'Empty':
        return '#bdbdbd';

      case 'Not In Use':
      case 'None':
        return '#FFFFFF';

      case 'New':
      case 'Created':
      case 'Info':

      case 'Document Type':
      case 'Putaway':
      case 'Current Putaway':
      case 'Job No.':
      case 'Scheduled':
      case 'Normal':

      case 'New Additional Items':
        return '#1E90FF'; // dodgerblue

      case 'In Progress':
      case 'Defected':
      case 'Warning':
      case 'Obstacle':
      case 'In Transit':
      case 'Pending':
      case 'In Use':
      case 'Hold':
      case 'Partial Full':
      case 'Last Scanned Compartment':
      case 'Current Operating':
      case 'Not Full':
      case 'Picking':
      case 'Waiting Snapshot':
      case 'Creating':
      case 'Refreshing':
      case 'Starting':
      case 'Idle':
      case 'Source':
      case 'Adjusting - Shortage':
      case 'Adjusting - Missing':
      case 'Splitting':
      case 'Inbounding':
      case 'Outbounding':
        return '#FFB325'; // orange

      case 'Unoccupied':
      case 'Cycle':
        return '#FFD9AB';

      case 'Closed':
      case 'Occupied':
      case 'Moving Rack':

      case 'Maintenance':
      case 'Transfer to TB Bin':
        return '#7B68EE'; // mediumslateblue

      case 'Arrived':
      case 'Arrived (Drop Point)':
      case 'Arrived (Work Point)':
      case 'Putaway  (Pick  Point)':
      case 'Available':
      case 'Active':
      case 'Partial Received':
      case 'Received':

      case 'Partial Allocated':
      case 'Allocated':
      case 'Fully Allocated':
      case 'Partial Sorted':
      case 'Sorted':
      case 'Partial Picked':
      case 'Picked':
      case 'Fully Picked':

      case 'Picking Job No.':
      case 'Completed':
      case 'MRF':
      case 'Last Scanned':
      case 'Success':
      case 'Current Operation':
      case 'Ready':
      case 'Resolved':
      case 'Start':
      case 'Deactivate Estop':
      case 'Running':
      case 'PKS Boost Mode':
      case 'Boost Mode':
      case 'Power Up and Start':
      case 'Charge In Item':
      case `Total Charge In Activities`:
      case 'Transferred':
      case 'Splitted':
      case 'Inbounded':
      case 'Outbounded':
        return '#2E8B57'; // seagreen

      case 'Cancelled':
      case 'Canceled':
      case 'Failed':
      case 'Unfulfilled':
      case 'Suspended':
      case 'Inactive':
      case 'Error':
      case 'Failed Allocated':
      case 'Fail Allocated':
      case 'Not Fulfilled':
      case 'Fail to Pick':
      case 'Fail to Create PKS':
      case 'Quarantine':
      case 'Damaged':
      case 'Exception':
      case 'Operation Before':
      case 'Slow Moving':
      case 'Slow Moving Item':
      case 'Create Failed':
      case 'Stop':
      case 'Stopped':
      case 'Activate Estop':
      case 'Emergency Stop Activated':
      case 'Power Down':
      case 'Charge Out Item':
      case `Total Charge Out Activities`:
        return '#FF87CA';

      case 'Full':
        return '#FF6347'; // tomato

      default:
        return alpha('#bdbdbd', 0.5);
      // alpha(theme.vars.palette.grey[400], 0.5)
    }
  }, []);

  /**
   *
   * @param percentageDecimal 0 to 1
   */
  const getColorByPercentageDecimal = useCallback((percentageDecimal: number): string => {
    let i = 1;

    for (i; i < percentColors.length - 1; i++) {
      if (percentageDecimal < percentColors[i].percentage) break;
    }

    const lowerColor = percentColors[i - 1];
    const upperColor = percentColors[i];

    const range = upperColor.percentage - lowerColor.percentage;
    const rangePercentage = (percentageDecimal - lowerColor.percentage) / range;

    const lowerPercentage = 1 - rangePercentage;
    const upperPercentage = rangePercentage;

    const color = {
      r: Math.floor(lowerColor.color.r * lowerPercentage + upperColor.color.r * upperPercentage),
      g: Math.floor(lowerColor.color.g * lowerPercentage + upperColor.color.g * upperPercentage),
      b: Math.floor(lowerColor.color.b * lowerPercentage + upperColor.color.b * upperPercentage),
    };

    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }, []);

  // const getColorByDiscrepancy = useCallback(
  //   (value: number) => {
  //     if (value < 0 || value > 0) {
  //       return theme.vars.palette.error.main
  //     }
  //   },
  //   [theme.vars.palette.error.main]
  // )

  return { getColorByText, getColorByPercentageDecimal };
};
