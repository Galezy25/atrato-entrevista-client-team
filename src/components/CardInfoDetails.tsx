import moment from 'moment';
import { CardInfo } from '../types/cardInfo';
import { Card } from './Card';

export interface CardInfoDetailsProps extends CardInfo {
  className?: string;
}

export function CardInfoDetails({
  className = '',
  cardNumber,
  cvv,
  date,
  pin,
  fullName,
}: CardInfoDetailsProps) {
  return (
    <Card
      className={
        'bg-gray-500 max-w-fit p-5 grid grid-cols-1 gap-6 ' + className
      }
    >
      <div>
        <p className="text-neutral-400">FULL NAME</p>
        <p>{fullName}</p>
      </div>
      <div>
        <p className="text-neutral-400">CARD NUMBER</p>
        <p>{cardNumber}</p>
      </div>
      <div className="grid grid-cols-3 gap-5 ">
        <div>
          <p className="text-neutral-400">CVV</p>
          <p>{cvv}</p>
        </div>
        <div>
          <p className="text-neutral-400">PIN</p>
          <p>{pin}</p>
        </div>
        <div>
          <p className="text-neutral-400">EXP</p>
          <p>{moment(date).format('YY/MM')}</p>
        </div>
      </div>
    </Card>
  );
}

export default CardInfoDetails;
