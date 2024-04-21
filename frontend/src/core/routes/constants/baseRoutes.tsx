import { RouteObject } from 'react-router-dom';

import {
  ROUTE_AUTH,
  ROUTE_RATE,
  ROUTE_USER_PROFILE,
  ROUTE_FEEDBACK,
  ROUTE_USER_PROFILE_COMPANY,
  ROUTE_INTEGRATION,
  ROUTE_MAIN_MENU,
  ROUT_FEED,
  ROUTE_USER_PUBLICATION,
  ROUTE_BASE_INFO_UNIVERSITY,
  ROUTE_BASE_INFO_STUDENT,
  ROUTE_BASE_INFO_EMPLOYER,
  ROUTE_FACULTY,
  ROUTE_DEPARTMENT,
  ROUTE_GROUPS,
  ROUTE_RATING,
  ROUTE_PRIVACY_POLICY,
  ROUTE_CONDITIONS_OF_USE,
  ROUTE_OPPORTUNITIES,
} from './routePath.ts';
import { Layout } from '../../../main/components/Layout.tsx';
import { Rates } from '../../../components/Rates.tsx';
import { Feedback } from '../../../components/Feedback.tsx';
import { Company } from '../../../components/Company.tsx';
import { Integration } from '../../../components/Integration.tsx';
import { TestPage } from '../../../test/components/TestPage.tsx';
import { AuthPage } from '../../../auth/components/AuthPage.tsx';
import { UserProfilePage } from '../../../users/components/UserProfilePage.tsx';
import { NotFoundPage } from '../../../uikit/main/components/NotFoundPage.tsx';
import { OPENID_CALLBACK_URL } from '../../config/urls.ts';
import { MainPage } from '../../../components/MainPage/MainPage.tsx';
import { Feed } from '../../../components/Feed/Feed.tsx';
import { UserPublicationPage } from '../../../users/components/UserPublicationPage.tsx';
import { UniversityInfo } from '../../../components/rolesInfo/UniversityInfo.tsx';
import { StudentInfo } from '../../../components/rolesInfo/StudentInfo.tsx';
import { EmployerInfo } from '../../../components/rolesInfo/EmployerInfo.tsx';
import { FacultyPage } from '../../../faculty/components/FacultyPage.tsx';
import { DepartmentPage } from '../../../department/components/DepartmentPage.tsx';
import { GroupsPage } from '../../../groups/components/GroupsPage.tsx';
import { PanoramaPage } from '../../../panorama/components/PanoramaPage.tsx';
import { Rating } from '../../../components/Raiting/Rating.tsx';
import { PrivacyPolicyPage } from '../../../main/components/PrivacyPolicyPage.tsx';
import { ConditionsOfUsePage } from '../../../main/components/ConditionsOfUsePage.tsx';
import { Opportunities } from '../../../components/Opportunities.tsx';

export const BASE_ROUTES: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: ROUTE_AUTH,
        element: <AuthPage />,
      },
      {
        path: ROUTE_RATE,
        element: <Rates />,
      },
      {
        path: ROUTE_MAIN_MENU,
        element: <MainPage />,
      },
      {
        path: ROUTE_FEEDBACK,
        element: <Feedback />,
      },
      {
        path: ROUTE_INTEGRATION,
        element: <Integration />,
      },
      {
        path: ROUTE_USER_PROFILE_COMPANY,
        element: <Company />,
      },
      {
        path: ROUTE_BASE_INFO_UNIVERSITY,
        element: <UniversityInfo />,
      },
      {
        path: ROUTE_BASE_INFO_STUDENT,
        element: <StudentInfo />,
      },
      {
        path: ROUTE_BASE_INFO_EMPLOYER,
        element: <EmployerInfo />,
      },
      {
        path: ROUT_FEED,
        element: <Feed />,
      },
      {
        path: ROUTE_RATING,
        element: <Rating />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: OPENID_CALLBACK_URL,
        element: <>Авторизация</>,
      },

      {
        path: ROUTE_USER_PROFILE,
        element: <UserProfilePage />,
      },
      {
        path: ROUTE_FACULTY,
        element: <FacultyPage />,
      },
      {
        path: ROUTE_DEPARTMENT,
        element: <DepartmentPage />,
      },
      {
        path: ROUTE_GROUPS,
        element: <GroupsPage />,
      },
      {
        path: ROUTE_OPPORTUNITIES,
        element: <Opportunities />,
      },
      {
        path: ROUTE_USER_PUBLICATION,
        element: <UserPublicationPage />,
      },
      {
        path: '/panorama',
        element: <PanoramaPage />,
      },
      {
        path: ROUTE_PRIVACY_POLICY,
        element: <PrivacyPolicyPage />,
      },
      {
        path: ROUTE_CONDITIONS_OF_USE,
        element: <ConditionsOfUsePage />,
      },
    ],
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
