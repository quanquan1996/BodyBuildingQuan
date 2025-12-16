# 实现计划

- [x] 1. 项目初始化和基础配置

  - [x] 1.1 创建 Flutter Web 项目结构


    - 创建 lib/models、lib/services、lib/widgets、lib/pages 目录
    - 配置 pubspec.yaml 添加依赖: file_picker, image
    - _需求: 5.1_

  - [x] 1.2 配置 MediaPipe JS 环境

    - 在 web/index.html 中引入 MediaPipe Tasks Vision CDN
    - 创建 web/mediapipe_bridge.js 桥接文件
    - _需求: 2.2_

- [x] 2. 数据模型实现

  - [x] 2.1 创建姿态关键点数据模型


    - 实现 lib/models/pose_landmark.dart (PoseLandmark 类)
    - 实现 lib/models/pose_result.dart (PoseResult 类，包含 33 个关键点索引常量)
    - _需求: 2.2, 3.1_

- [x] 3. JavaScript Interop 实现

  - [x] 3.1 实现 MediaPipe JS 桥接

    - 在 mediapipe_bridge.js 中实现 initializePoseLandmarker() 函数
    - 在 mediapipe_bridge.js 中实现 detectPose() 函数
    - _需求: 2.2_
  - [x] 3.2 创建 Dart JS 调用接口


    - 创建 lib/services/mediapipe_interop.dart
    - 使用 dart:js_interop 声明外部 JS 函数
    - _需求: 2.2_

- [x] 4. 姿态检测服务实现

  - [x] 4.1 实现 PoseDetectionService


    - 创建 lib/services/pose_detection_service.dart
    - 实现 initialize() 方法调用 MediaPipe 初始化
    - 实现 detectPose() 方法处理图片并返回 PoseResult
    - 实现错误处理：未检测到人体时返回错误
    - _需求: 2.1, 2.2, 2.3, 2.4_

- [x] 5. 骨架对齐服务实现

  - [x] 5.1 实现 AlignmentService


    - 创建 lib/services/alignment_service.dart
    - 实现 calculateTorsoCenter() 计算躯干中心
    - 实现 calculateScaleFactor() 计算缩放因子（含除零保护）
    - 实现 transformToGhostPoints() 转换参考骨架坐标
    - _需求: 3.1, 3.2, 3.3, 3.4_

- [x] 6. UI 组件实现

  - [x] 6.1 实现图片上传组件


    - 创建 lib/widgets/image_upload_widget.dart
    - 实现点击上传功能
    - 实现拖拽上传功能
    - 实现加载状态显示
    - 实现图片预览
    - _需求: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 6.2 实现骨架绘制器


    - 创建 lib/widgets/pose_overlay_painter.dart (CustomPainter)
    - 实现 Layer 1: 用户骨架绘制 (绿色实线)
    - 实现 Layer 2: 幽灵骨架绘制 (青色半透明)
    - 实现 Layer 3: 误差向量绘制 (红色连线)
    - 定义骨骼连接关系常量
    - _需求: 4.2, 4.3, 4.4_

  - [x] 6.3 实现对比结果组件

    - 创建 lib/widgets/comparison_result_widget.dart
    - 集成 PoseOverlayPainter 在用户图片上绘制
    - 实现缩放和平移交互 (InteractiveViewer)
    - 保持图片正确宽高比
    - _需求: 4.1, 4.5, 5.2, 5.4_

- [x] 7. 主页面实现

  - [x] 7.1 实现 HomePage


    - 创建 lib/pages/home_page.dart
    - 布局两个图片上传区域（参考图、用户图）
    - 实现响应式布局适配不同窗口尺寸
    - 添加重置按钮
    - _需求: 5.1, 5.3, 5.5_
  - [x] 7.2 集成完整流程

    - 连接图片上传 → 姿态检测 → 对齐计算 → 结果显示
    - 实现处理状态指示器
    - 实现错误提示显示
    - _需求: 2.1, 2.4, 5.2_

- [x] 8. 应用入口


  - [x] 8.1 配置 main.dart


    - 创建 lib/main.dart
    - 配置 MaterialApp 和主题
    - 设置 HomePage 为首页
    - _需求: 5.1_

- [ ]* 9. 测试
  - [ ]* 9.1 编写单元测试
    - 测试 AlignmentService 的躯干中心计算
    - 测试 AlignmentService 的缩放因子计算
    - 测试 AlignmentService 的坐标转换
    - _需求: 3.1, 3.2, 3.3, 3.4_
