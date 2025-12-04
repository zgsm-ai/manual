#!/bin/bash

# 项目初始化脚本
# 用于新克隆项目后的初始化设置

echo "🚀 初始化项目..."

# 检查是否存在.git目录
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是Git仓库"
    echo "请先克隆仓库或初始化Git仓库"
    exit 1
fi

echo "📦 安装Git钩子..."
./scripts/install-git-hooks.sh

echo "📋 检查项目依赖..."
if [ -f "package.json" ]; then
    if command -v npm &> /dev/null; then
        echo "安装npm依赖..."
        npm install
    else
        echo "⚠️ 未找到npm，请手动安装依赖"
    fi
fi

echo "✅ 项目初始化完成！"
echo ""
echo "📝 下一步："
echo "1. 阅读README.md了解项目结构"
echo "2. 查看local-chinese-check-guide.md了解中文检查规则"
echo "3. 开始开发工作"
echo ""
echo "🔍 中文内容检查说明："
echo "- 本地提交时会自动检查docs文件夹中的文件是否包含中文"
echo "- 推送前会触发pre-push钩子进行检查"
echo "- GitHub Action会在远程仓库进行最终检查"