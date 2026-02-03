---
sidebar_position: 15
---

# Best Practices

## Environment
**Windows 10/11 Environment:**

1. Install CoStrictCLI (`npm install -g @costrict/cs`)
2. For a better experience on Windows, you need to install:
    a) Windows Terminal
    Due to the CLI's text rendering method, there are compatibility issues with both CMD and PowerShell terminals that come with Windows by default, so you need the latest Windows Terminal to solve this problem.
    Download location: [GitHub - microsoft/terminal: The new Windows Terminal and the original Windows console host, all in the same place!](https://github.com/microsoft/terminal)
    Note: After installation, there are OpenConsole.exe and WindowsTerminal.exe in the installation directory. You should run WindowsTerminal.exe.
    b) WeChat Input Method (Sogou might also work, you can test it first)
    Because Windows Terminal does not support Sogou Input Method, and the supported Microsoft Pinyin Input Method is difficult to use, it is recommended to use WeChat Input Method, which is very easy to use.
    Download location: [WeChat Input Method - Simple, Easy to Use, Fast Typing](https://z.weixin.qq.com/)
    c) PowerShell 7
    If the default PowerShell is 5.x (execute `powershell $PSVersionTable`) and the model's syntax is mostly 7.x, you need to update PowerShell.
    Download location: [Install PowerShell on Windows - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.5)
3. Startup
    a) Open Windows Terminal, create a new PowerShell (the newly installed one, note it's not Windows PowerShell). After opening, the version number will be displayed on the first line, such as PowerShell 7.5.4.
    b) Then cd to your project directory.
    c) Then enter `cs` to start.
4. Usage
   a) In the cs dialog window, enter /connect and press Enter, select CoStrict login method to log in. You will then be asked to select a model.
   b) If you need to change the model later, you can enter /models to select.
   c) If you want to experience Costrict's Plan mode, you need to press the Tab key and select StrictPlan, otherwise the default is Build mode (similar to Vibe conversation mode).

## Usage Recommendations
- CentOS 7 users are recommended to use high-version Linux containers.
- Execute /init to initialize project knowledge documents into AGENTS.md, which helps AI understand the project.
