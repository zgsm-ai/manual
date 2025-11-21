import React from 'react';

const mdFiles = import.meta.webpackContext(
  '!!raw-loader!@site/i18n',
  { recursive: true }
);

export default function DownloadMarkdown({ path, filename }) {
  if (!path) {
    return <div style={{ color: 'red' }}>缺少 path 参数</div>;
  }

  const key = path.replace('@site/i18n', '.');

  let content = '';
  try {
    const fileModule = mdFiles(key);
    content = fileModule.default;

    // ⭐ 去掉顶部 import/export
    content = content
      .split('\n')
      .filter(line => !/^import\s/.test(line))
      .filter(line => !/^export\s/.test(line))
      .join('\n');

  } catch (e) {
    return (
      <div style={{ color: 'red' }}>
        找不到 MD 文件：<strong>{path}</strong>
      </div>
    );
  }

  const downloadFile = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename || key.split('/').pop();
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
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
