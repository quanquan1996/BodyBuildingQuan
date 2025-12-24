# 3D 模型目录

## 肌肉解剖模型

将人体肌肉 GLTF/GLB 模型放置在此目录下，命名为 `muscle-anatomy.glb`。

### 模型要求

1. **格式**: GLTF 或 GLB（推荐 GLB，单文件更方便）
2. **大小**: 压缩后小于 10MB（理想 < 5MB）
3. **结构**: 每块肌肉应为独立的 mesh，便于点击交互
4. **命名**: mesh 名称应包含肌肉关键词（如 deltoid, biceps, pectoralis 等）

### 从 Z-Anatomy 导出

项目根目录下的 `Z-Anatomy/` 文件夹包含完整的人体解剖 Blender 模型。

#### 方法一：命令行导出（推荐）

```bash
# 在项目根目录运行
blender Z-Anatomy/Startup.blend --background --python Z-Anatomy/export_cli.py
```

#### 方法二：Blender GUI 导出

1. 打开 Blender，加载 `Z-Anatomy/Startup.blend`
2. 参考 `Z-Anatomy/EXPORT_GUIDE.md` 进行手动导出

### 支持的肌肉命名

代码会自动识别以下关键词的 mesh：

- **上肢**: deltoid, biceps, triceps, brachialis, forearm, flexor, extensor
- **躯干**: pectoralis, latissimus, trapezius, rectus, oblique, serratus, rhomboid, erector, teres, infraspinatus
- **下肢**: gluteus, quadriceps, vastus, hamstring, femoris, gastrocnemius, soleus, tibialis, adductor

### 当前状态

如果 `muscle-anatomy.glb` 不存在，页面会显示简化的占位人体轮廓。
