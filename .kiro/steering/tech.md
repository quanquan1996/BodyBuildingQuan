# 技术栈

## 框架与语言

- Flutter 3.x (Web 目标平台)
- Dart SDK >=3.0.0 <4.0.0

## 主要依赖

- `file_picker: ^6.1.1` - 图片文件选择
- `flutter_lints: ^3.0.0` - 代码检查

## 外部库 (CDN)

- MediaPipe Tasks Vision v0.10.8 - 通过 JavaScript interop 进行姿态检测

## 架构

- Flutter Web 配合 JavaScript interop 调用 MediaPipe
- 使用 `dart:js_interop` 进行 Dart-JS 通信
- 使用 CustomPainter 绘制骨架可视化

## 常用命令

```bash
# 启动开发服务器
flutter run -d chrome

# 构建生产版本
flutter build web

# 代码分析
flutter analyze

# 运行测试
flutter test
```

## Linting 规则

在 `analysis_options.yaml` 中配置：
- `prefer_const_constructors: true`
- `prefer_const_declarations: true`
- 基于 `package:flutter_lints/flutter.yaml`
