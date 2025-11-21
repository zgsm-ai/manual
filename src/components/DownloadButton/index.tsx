import React from 'react';

interface DownloadMarkdownProps {
  /** MD 文件路径，例如 "@site/docs/react/useEffect.md" */
  path: string;
  /** 下载文件名，不传默认使用原文件名 */
  filename?: string;
  /** 需要忽略的自定义组件名数组 */
  ignoreComponents?: string[];
  /** 是否保留 frontmatter */
  keepFrontmatter?: boolean;
}

export default function DownloadMarkdown({
  path,
  filename,
  ignoreComponents = ['DownloadMarkdown'],
  keepFrontmatter = true,
}: DownloadMarkdownProps) {
  if (!path) {
    return <div style={{ color: 'red' }}>缺少 path 参数</div>;
  }

  const downloadFile = async () => {
    try {
      // ⭐ 动态按需加载 md 文件，首屏不影响性能
      const fileModule = await import(
        /* @vite-ignore */ `!!raw-loader!@site/i18n${path}`
      );
      let content = fileModule.default;

      // -------------------
      // 1️⃣ 去掉顶部 import/export
      // -------------------
      content = content
        .split('\n')
        .filter((line) => !/^import\s/.test(line))
        .filter((line) => !/^export\s/.test(line))
        .join('\n');

      // -------------------
      // 2️⃣ 去掉指定自定义组件的 JSX
      // -------------------
      ignoreComponents.forEach((name) => {
        // <Component ... /> 单标签
        const selfClosing = new RegExp(`<${name}[\\s\\S]*?/>`, 'g');
        content = content.replace(selfClosing, '');
        // <Component>...</Component> 包含内容
        const block = new RegExp(`<${name}[\\s\\S]*?</${name}>`, 'g');
        content = content.replace(block, '');
      });

      // -------------------
      // 3️⃣ 可选：保留 frontmatter
      // -------------------
      if (!keepFrontmatter) {
        content = content.replace(/^---[\s\S]*?---\s*/m, '');
      }

      // -------------------
      // 4️⃣ 生成 Blob 并触发下载
      // -------------------
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename || path.split('/').pop();
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('下载失败，文件可能不存在：', path, e);
      alert('下载失败，文件可能不存在！');
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
      下载 MD 文件
    </button>
  );
}
