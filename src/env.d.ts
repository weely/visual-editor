/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_SHORT_NAME: string
  readonly VITE_PORT: number
  readonly VITE_DROP_CONSOLE: boolean
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
