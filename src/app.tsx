import '@/assets/styles/global.css';
import PageLoading from '@/components/page-loading';
import NProgressBar from '@/components/progress-bar';
import { GlobalStyles } from '@/global';
import { generateRoutes } from '@/router';
import asyncRoutes from '@/router/routes';
import { ThemeProvider } from '@/proviers/theme';
import React, { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  ConfigProvider,
} from 'antd';
interface AppToken {
  headerHeight: number; // 导航栏高度
}
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends AppToken {}
}

const App: React.FC = () => {
  // 如需远程加载路由
  // const { routes: asyncRoutes } = useAppSelector(state => state.user)

  // 构造路由
  const routes = useMemo(() => {
    return generateRoutes(asyncRoutes);
  }, []);

  const router = createBrowserRouter(routes);

  return (
    <ConfigProvider locale={zhCN}>
    <ThemeProvider>
      <GlobalStyles />
      <NProgressBar />
      <RouterProvider router={router} fallbackElement={<PageLoading />} />
    </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
