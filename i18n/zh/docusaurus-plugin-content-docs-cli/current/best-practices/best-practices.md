---
sidebar_position: 15
---

# 最佳实践

## 环境
**Windows 10/11环境：**

1. 安装CoStrictCLI (`npm install -g @costrict/cs`)
2. 为了在windows上体验更好，需要安装
    a) WindowsTerminal
    因为CLI的文本绘制方式，在windows默认带的CMD和Powershell终端上，都有兼容性问题，所以需要最新的WindowsTerminal来解决这个问题。
    下载位置： [GitHub - microsoft/terminal: The new Windows Terminal and the original Windows console host, all in the same place! ](https://github.com/microsoft/terminal)
    注意，安装好之后，安装目录下有OpenConsole.exe，有WindowsTerminal.exe，应该运行WindowsTerminal.exe
    b) 微信输入法，貌似搜狗也可以，大家可以先测试一下
    因为WindowsTerminal不支持搜狗输入法，支持的微软拼音输入法又比较难用，所以，推荐用微信输入法，非常好用。
    下载位置： [微信输入法-简洁好用打字快 ](https://z.weixin.qq.com/)
    c) Powershell 7
    如果默认的Powershell是5.x（执行powershell $PSVersionTable）而模型的语法很多是7.x的，所以要更新一下Powershell。
    下载位置： [在 Windows 上安装 PowerShell - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.5) 
3. 启动
    a) 打开WindowsTerminal，新建一个新装的PowerShell，注意不是Windows PowerShell，打开后会在第一行显示版本号，比如PowerShell 7.5.4
    b) 然后cd到你的工程目录
    c) 再输入 cs 启动
4. 使用
   a) 在 cs 对话窗口输入/connect并回车，选择CoStrict登录方式登录。 随即会让你选择模型。
   b) 如果后续要修改模型，可以输入/models 选择
   c) 如果要体验Costrict的Plan模式，需要按tab键，选择StrictPlan，否则的话默认是Build模式（类似Vibe对话模式）

## 使用建议
- centos 7 用户推荐使用高版本linux容器方式使用；
- 执行 /init  初始化项目知识文档到 AGENTS.md 中有利于AI理解项目；
