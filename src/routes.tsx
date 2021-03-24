/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { Redirect, Route } from 'react-router-dom';

import Congratulations from 'src/views/Congratulations';

import ErrorLayout from './layouts/Error';
import MainLayout from './layouts/Main';

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/invitation" />,
  },
  {
    path: '/congratulations',
    exact: true,
    component: () => <Route render={() => <Congratulations />} />,
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401')),
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404')),
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500')),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    route: '*',
    component: (props: RouteConfigComponentProps) => <Route render={() => <MainLayout {...props} />} />,
    routes: [
      {
        path: '/invitation',
        exact: true,
        component: lazy(() => import('src/views/TeamInvitation')),
      },
      {
        path: '/import',
        exact: true,
        component: lazy(() => import('src/views/Vehicles')),
      },
      {
        path: '/service',
        exact: true,
        component: lazy(() => import('src/views/ServicePackage')),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
] as RouteConfig[];
