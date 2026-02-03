---
sidebar_position: 3
---

# 基本功能入门

## 启动
- tui：

```bash
cs
```

![img](img/feature/main.png)

- 命令行：

```bash
cs run  --agent build  --model costrict/GLM-4.7   "你好"
# 你好！有什么可以帮助你的吗？
```

- web:

```bash
cs web     # 可以通过--hostname  --port 指定ip、端口
```

然后在浏览器中打开地址，默认 http://127.0.0.1:4096/  

![img](img/feature/png-17700885881302.png)

- 容器

```bash
docker pull zgsm/costrict-cli:latest
docker run -it zgsm/costrict-cli:latest
```

## 选择模型

在cli内部，输入 `/models` 选择模型

## 开始新会话
在cli内部，输入 `/new`

## 继续上次会话

```
cs  --continue
```

或者输入 `/session`， 选择对应会话确认即可。

## 切换Agent

● 父Agent: 在对话框，使用Tab键进行切换，默认内置Build/StrictPlan Agent。

● 子Agent：@名字 方式使用。

## 进入/退出子Agent对话

- 进入：双击子Agent对话，可进入子Agent内部；

- 退出：按页面上方提示的快捷键操作，如果快捷键冲突，可使用鼠标点击左上角的Parent退出。

## 其它命令

请使用 `cs --help ` 查看。