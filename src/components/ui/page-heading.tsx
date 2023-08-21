import { PropsWithChildren } from 'react';

interface IPageHeading extends PropsWithChildren {
  title: string;
  description?: string;
}

export function PageHeading({ children, title, description }: IPageHeading) {
  return (
    <div className="mb-6">
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex flex-shrink-0 gap-2 mt-4 md:mt-0 md:ml-4">
          {children}
        </div>
      </div>
    </div>
  );
}
