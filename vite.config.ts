import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tsconfigPaths(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@commons': path.resolve(__dirname, './src/components/commons'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        '@layouts': path.resolve(__dirname, './src/components/layouts'),
        '@providers': path.resolve(__dirname, './src/providers'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@router': path.resolve(__dirname, './src/router'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@configs': path.resolve(__dirname, './src/configs'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
        '@lib': path.resolve(__dirname, './src/lib'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
