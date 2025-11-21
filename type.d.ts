declare interface ImportMeta {
  webpackContext: (
    directory: string,
    options?: {
      recursive?: boolean;
      regExp?: RegExp;
      mode?: string;
    }
  ) => {
    (key: string): { default: string };   // ⭐ 可调用函数
    keys(): string[];                    // ⭐ 列出所有 key
  };
}
