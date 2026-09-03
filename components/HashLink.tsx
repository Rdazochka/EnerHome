'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { handleHashLinkClick } from '@/lib/smoothScroll';

type HashLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  delay?: number;
  children: ReactNode;
};

export default function HashLink({ href, delay = 0, onClick, children, ...props }: HashLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    handleHashLinkClick(event, href, delay);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
