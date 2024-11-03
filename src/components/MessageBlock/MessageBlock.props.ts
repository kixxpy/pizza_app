import { HTMLAttributes, ReactNode } from 'react';

export interface MessageBlockProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}
