# 项目结构

```
lib/
├── main.dart              # 应用入口，MaterialApp 配置
├── models/                # 数据模型
│   ├── pose_landmark.dart # 单个关键点 (x, y, z, visibility)
│   └── pose_result.dart   # 完整姿态，包含 33 个关键点和骨架连接
├── pages/                 # 全屏页面组件
│   └── home_page.dart     # 主页面，包含上传和对比 UI
├── services/              # 业务逻辑和外部集成
│   ├── alignment_service.dart    # 骨架对齐/缩放计算
│   ├── mediapipe_interop.dart    # MediaPipe 的 JS interop 封装
│   └── pose_detection_service.dart # 高层姿态检测 API
└── widgets/               # 可复用 UI 组件
    ├── comparison_result_widget.dart # 显示对比叠加层
    ├── image_upload_widget.dart      # 拖拽上传图片
    └── pose_overlay_painter.dart     # 骨架渲染 CustomPainter

web/
├── index.html             # HTML 外壳，包含 MediaPipe CDN 引入
├── manifest.json          # PWA manifest
└── mediapipe_bridge.js    # 暴露 MediaPipe 给 Dart 的 JS 桥接
```

## 约定

- Models 是不可变数据类，使用 factory 构造函数
- Services 是有状态类，处理业务逻辑
- Widgets 遵循 Flutter 的 StatelessWidget/StatefulWidget 模式
- JS interop 使用 `@JS()` 注解配合 `dart:js_interop`
- 用户界面文字使用中文
- 代码、注释和文档使用英文
