import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import autoprefixer from 'autoprefixer';
import dts from 'vite-plugin-dts';
import postcsspxtoviewport from 'postcss-px-to-viewport-8-plugin';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    dts({
      entryRoot: path.resolve(__dirname, 'src/components'),
      outDir: ['es', 'lib'],
      exclude: ['node_modules/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/components/_shared'),
    },
  },
  server: {
    port: 4090,
    open: true,
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'YcUI',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
          globals: {
            vue: 'Vue',
          },
        },
        // {
        //   format: 'umd',
        //   dir: 'dist',
        //   entryFileNames: 'index.umd.js',
        //   name: 'YcUI',
        //   exports: 'named',
        //   globals: {
        //     vue: 'Vue',
        //   },
        // },
      ],
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            'last 2 versions',
          ],
          grid: true,
        }),
        postcsspxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-', 'ifont'],
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          exclude: [],
          include: undefined,
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 1920,
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
