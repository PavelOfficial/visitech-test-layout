import { Visitation } from './data/types';

type Props = {
  visitation: Visitation,
};

export const VisitationComponent = ({ visitation }: Props) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>{visitation.zone_name}</td>
      <td>{visitation.time_begin}</td>
      <td>{visitation.time_end}</td>
      <td>{visitation.duration_in}</td>
    </tr>
  );
};
