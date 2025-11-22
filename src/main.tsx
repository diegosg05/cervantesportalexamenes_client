import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Register } from './features/User/ui/pages/Register/Register.tsx'
import { Login } from './features/User/ui/pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import App from './App.tsx'
import { ProtectedRoutes } from './security/ProtectedRoutes.tsx'
import { Welcome } from './pages/Admin/Welcome/Welcome.tsx'
import { Profile } from './features/User/ui/pages/Profile/Profile.tsx'
import { ResetPassword } from './features/User/ui/pages/ResetPassword/ResetPassword.tsx'
import { ExamList } from './features/Exam/ui/pages/ExamList.tsx'
import { QuestionList } from './features/Question/ui/pages/Question/QuestionList.tsx'
import { CategoryList } from './features/Category/ui/pages/CategoryList.tsx'
import { ProtectedRoleRoutes } from './security/ProtectedRoleRoutes.tsx'
import { Dashboard } from './pages/Admin/Dashboard/Dashboard.tsx'
import { Platform } from './pages/student/Platform/Platform.tsx'
import { PlatformMenu } from './pages/student/PlatformMenu/PlatformMenu.tsx'
import { PlatformByExamMenu } from './pages/student/PlatformByExamMenu/PlatformByExamMenu.tsx'
import { ExamInstructions } from './pages/student/ExamInstructions/ExamInstructions.tsx'
import { StartExam } from './pages/student/StartExam/StartExam.tsx'
import { ProtectedExamStartRoutes } from './security/ProtectedExamStartRoutes.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/',
            element: <ProtectedRoleRoutes />,
            children: [
              {
                path: '/',
                element: <Dashboard />,
                children: [
                  {
                    path: '/',
                    element: <Welcome />
                  },
                  {
                    path: '/profile',
                    element: <Profile />
                  },
                  {
                    path: '/reset-password',
                    element: <ResetPassword />
                  },
                  {
                    path: '/categories',
                    element: <CategoryList />
                  },
                  {
                    path: '/quizzes',
                    element: <ExamList />
                  },
                  {
                    path: '/quizzes/view-questions/:id/:title',
                    element: <QuestionList />
                  }
                ]
              }
            ],
          },
          {
            path: '/platform-exam',
            element: <Platform />,
            children: [
              {
                path: '/platform-exam',
                element: <PlatformMenu />
              },
              {
                path: '/platform-exam/:id/:title',
                element: <PlatformByExamMenu />
              },
              {
                path: '/platform-exam/exam/:id/instructions',
                element: <ExamInstructions />
              },
            ]
          },
          {
            path: '/start-exam/exam/:id',
            element: <ProtectedExamStartRoutes />,
            children: [
              {
                path: '/start-exam/exam/:id',
                element: <StartExam />
              }
            ]
          },
        ]
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Register />
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
