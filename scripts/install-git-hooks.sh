#!/bin/bash

# 安装Git钩子脚本
# 用于在本地推送前检查docs文件夹中的文件是否包含中文

echo "🔧 安装Git钩子..."

# 检查是否存在.git目录
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是Git仓库"
    exit 1
fi

# 确保hooks目录存在
mkdir -p .git/hooks

# 复制pre-push钩子
if [ -f "scripts/pre-push" ]; then
    cp scripts/pre-push .git/hooks/pre-push
    echo "✅ 从scripts目录复制pre-push钩子"
elif [ -f ".git/hooks/pre-push" ]; then
    echo "✅ pre-push钩子已存在"
else
    echo "❌ 错误：找不到pre-push钩子文件"
    exit 1
fi

# 设置执行权限
chmod +x .git/hooks/pre-push

echo "✅ Git钩子安装完成！"
echo ""
echo "📝 说明："
echo "  - 每次推送前会自动检查docs文件夹中的.md和.json文件是否包含中文"
echo "  - 如果发现中文内容，推送将被阻止"
echo "  - 请将中文内容移至 i18n/zh/docusaurus-plugin-content-docs/current/ 目录"
echo ""
echo "🔍 手动检查命令："
echo "  node test-chinese-check.js"
echo ""
echo "🗑️  卸载钩子命令："
echo "  rm .git/hooks/pre-push"