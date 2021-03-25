import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

import ScrollToTop from './ScrollToTop';

interface PageProps {
  title: string;
  className?: string;
  children: ReactNode;
}

function Page({ title, children, ...rest }: PageProps) {
  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ScrollToTop />
      {children}
    </div>
  );
}

export default Page;
