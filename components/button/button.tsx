'use client';

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export interface ButtonProps {
  className?: string;

  onClick?: JSX.IntrinsicElements['button']['onClick'];
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const defaultClassName =
    'rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black';

  return (
    <button
      className={cn(defaultClassName, props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
