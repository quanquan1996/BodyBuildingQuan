# Z-Anatomy 模型导出指南

## 目标

将 Z-Anatomy 的肌肉系统导出为 Web 可用的 GLB 格式，用于 3D 肌肉解剖展示工具。

## 要求

- 文件大小：< 10MB（理想 < 5MB）
- 格式：GLB（带 Draco 压缩）
- 结构：每块肌肉为独立 mesh，便于点击交互

## 方法一：使用导出脚本（推荐）

1. 打开 Blender
2. 加载 `Startup.blend`
3. 切换到 **Scripting** 工作区
4. 点击 **Open** 打开 `export_muscles_glb.py`
5. 点击 **Run Script** 运行
6. 检查输出的 `nextjs-app/public/models/muscle-anatomy.glb`

## 方法二：手动导出

### 步骤 1: 识别肌肉 Collection

Z-Anatomy 通常按系统组织：
- Muscular System（肌肉系统）
- Skeletal System（骨骼系统）
- Cardiovascular System（心血管系统）
- 等等...

在 Outliner 中找到 **Muscular System** 或类似命名的 Collection。

### 步骤 2: 隐藏非肌肉对象

1. 在 Outliner 中，点击其他 Collection 的眼睛图标隐藏
2. 只保留肌肉系统可见

### 步骤 3: 选择要导出的肌肉

按 `A` 选择所有可见对象，或手动选择以下主要肌肉群：

**上肢：**
- Deltoid（三角肌）
- Biceps Brachii（肱二头肌）
- Triceps Brachii（肱三头肌）
- Brachialis（肱肌）
- Forearm muscles（前臂肌群）

**躯干：**
- Pectoralis Major/Minor（胸大肌/胸小肌）
- Latissimus Dorsi（背阔肌）
- Trapezius（斜方肌）
- Rectus Abdominis（腹直肌）
- External/Internal Oblique（腹斜肌）
- Erector Spinae（竖脊肌）
- Serratus Anterior（前锯肌）

**下肢：**
- Gluteus Maximus/Medius/Minimus（臀肌）
- Quadriceps（股四头肌）
- Hamstrings（腘绳肌）
- Gastrocnemius（腓肠肌）
- Soleus（比目鱼肌）
- Adductors（内收肌群）

### 步骤 4: 简化模型（如果太大）

1. 选择所有肌肉 mesh
2. 进入 Edit Mode (`Tab`)
3. 选择所有面 (`A`)
4. Mesh → Clean Up → Decimate Geometry
5. 设置 Ratio 为 0.3-0.5
6. 返回 Object Mode

或者使用 Modifier：
1. 选择 mesh
2. 添加 Decimate Modifier
3. 设置 Ratio
4. Apply

### 步骤 5: 重命名 Mesh（重要！）

为了让代码能识别肌肉，需要按以下规则命名：

| 肌肉 | Mesh 名称 |
|------|-----------|
| 三角肌前束 | deltoid_anterior |
| 三角肌中束 | deltoid_lateral |
| 三角肌后束 | deltoid_posterior |
| 肱二头肌 | biceps |
| 肱三头肌 | triceps |
| 胸大肌 | pectoralis_major |
| 背阔肌 | latissimus_dorsi |
| 斜方肌 | trapezius |
| 腹直肌 | rectus_abdominis |
| 腹外斜肌 | external_oblique |
| 臀大肌 | gluteus_maximus |
| 股四头肌 | quadriceps |
| 腘绳肌 | hamstrings |
| 腓肠肌 | gastrocnemius |
| 比目鱼肌 | soleus |

在 Outliner 中双击 mesh 名称即可重命名。

### 步骤 6: 导出 GLB

1. File → Export → glTF 2.0 (.glb/.gltf)
2. 设置：
   - Format: **glTF Binary (.glb)**
   - Include: **Selected Objects** ✓
   - Transform: 保持默认
   - Geometry:
     - Apply Modifiers ✓
     - Compression: **Draco** ✓
     - Compression Level: 6
   - Animation: 取消勾选（不需要动画）
3. 导出路径: `nextjs-app/public/models/muscle-anatomy.glb`
4. 点击 **Export glTF 2.0**

### 步骤 7: 验证

1. 检查文件大小（应 < 10MB）
2. 启动开发服务器测试：
   ```bash
   cd nextjs-app
   npm run dev
   ```
3. 访问 http://localhost:3000/zh/tools/muscle-anatomy

## 方法三：只导出简化版本

如果完整模型太大，可以只导出主要肌肉群的简化版本：

1. 只选择 10-15 块主要肌肉
2. 使用更激进的 Decimate（ratio 0.2）
3. 合并对称肌肉（左右合并为一个 mesh）

## 常见问题

### Q: 导出的文件太大？
A: 使用 Decimate 降低面数，或只导出主要肌肉。

### Q: 肌肉点击不响应？
A: 检查 mesh 命名是否与 `muscles.ts` 中的 ID 匹配。

### Q: 模型位置/大小不对？
A: 在 Blender 中调整模型位置和缩放，确保模型居中且大小适中。

### Q: 材质/颜色丢失？
A: 确保导出时勾选了 Materials 选项。

## 参考

- [Z-Anatomy 官网](https://www.z-anatomy.com/)
- [glTF 导出文档](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
- [Draco 压缩](https://google.github.io/draco/)
