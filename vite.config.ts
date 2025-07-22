import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173, // Vite 기본 포트 사용
    host: true, // 모든 네트워크 인터페이스에서 접속 허용
    open: false, // 자동으로 브라우저 열지 않음
    cors: true, // CORS 허용
    strictPort: false, // 포트가 사용 중이면 다른 포트 사용
    hmr: {
      port: 5174 // HMR용 별도 포트
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // terser 대신 esbuild 사용
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  esbuild: {
    // TypeScript 타입 체크를 ESBuild에서 처리하도록 설정
    target: 'esnext'
  }
})
