import React from 'react';

export default function DownloadMarkdown({ path, filename }) {
  if (!path) {
    return <div style={{ color: 'red' }}>缺少 path 参数</div>;
  }

  const downloadFile = async () => {
    try {
      // ⭐ 动态加载 MD 内容
      const fileModule = await import(
        /* @vite-ignore */ `!!raw-loader!@site/i18n${path}`
      );

      let content = fileModule.default;

      // ------------------------------------
      // 1. 去掉 import/export
      // ------------------------------------
      content = content
        .split('\n')
        .filter((line) => !/^import\s/.test(line))
        .filter((line) => !/^export\s/.test(line))
        .join('\n');

      // ------------------------------------
      // 2. ⭐ 只删除 CopyMarkdown 组件
      // ------------------------------------

      // 单标签形式：
      // <CopyMarkdown />
      // <CopyMarkdown title="xxx" abc />
      content = content.replace(
        /<CopyMarkdown[\s\S]*?\/>/g,
        ''
      );

      // 块标签形式：
      // <CopyMarkdown> ... </CopyMarkdown>
      content = content.replace(
        /<CopyMarkdown[\s\S]*?<\/CopyMarkdown>/g,
        ''
      );

      // ------------------------------------
      // 3. 下载成 markdown
      // ------------------------------------
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename || path.split('/').pop();
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('下载失败，文件不存在');
    }
  };

  return (
    <button
      onClick={downloadFile}
      style={{
        padding: '8px 16px',
        background: '#3578e5',
        borderRadius: 6,
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginBottom: 12,
      }}
    >
      下载文件
    </button>
  );
}
