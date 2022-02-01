import React, { PropsWithChildren } from 'react';

export type CardProps = PropsWithChildren<{
  className?: string;
}>;

export const Card = ({ className, children }: CardProps) => (
  <div className={`rounded-md shadow-lg ${className}`}>{children}</div>
);
