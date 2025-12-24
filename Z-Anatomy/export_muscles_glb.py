# Z-Anatomy 肌肉模型导出脚本
# 在 Blender 中运行此脚本，将肌肉系统导出为 GLB 格式
#
# 使用方法：
# 1. 打开 Blender，加载 Startup.blend
# 2. 切换到 Scripting 工作区
# 3. 打开此脚本并运行
# 4. GLB 文件将导出到同目录下

import bpy
import os

# 导出路径
EXPORT_PATH = os.path.join(os.path.dirname(bpy.data.filepath), "..", "nextjs-app", "public", "models", "muscle-anatomy.glb")

# 主要肌肉关键词（用于筛选）
MUSCLE_KEYWORDS = [
    # 上肢
    "deltoid", "bicep", "tricep", "brachialis", "forearm",
    "brachioradialis", "extensor", "flexor",
    # 躯干
    "pectoral", "latissimus", "trapezius", "rhomboid",
    "serratus", "rectus abdominis", "oblique", "erector",
    "intercostal",
    # 下肢
    "gluteus", "quadricep", "vastus", "rectus femoris",
    "hamstring", "biceps femoris", "semitendinosus", "semimembranosus",
    "gastrocnemius", "soleus", "tibialis", "adductor",
    # 通用
    "muscle", "muscular"
]

def is_muscle_object(obj):
    """检查对象是否是肌肉"""
    name_lower = obj.name.lower()
    return any(keyword in name_lower for keyword in MUSCLE_KEYWORDS)

def select_muscles():
    """选择所有肌肉对象"""
    bpy.ops.object.select_all(action='DESELECT')
    
    muscle_count = 0
    for obj in bpy.data.objects:
        if obj.type == 'MESH' and is_muscle_object(obj):
            obj.select_set(True)
            obj.hide_set(False)
            muscle_count += 1
    
    print(f"找到 {muscle_count} 个肌肉对象")
    return muscle_count

def simplify_meshes(ratio=0.5):
    """简化选中的 mesh（降低面数）"""
    for obj in bpy.context.selected_objects:
        if obj.type == 'MESH':
            # 添加 Decimate modifier
            modifier = obj.modifiers.new(name="Decimate", type='DECIMATE')
            modifier.ratio = ratio
            
            # 应用 modifier
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_apply(modifier="Decimate")

def export_glb():
    """导出为 GLB 格式"""
    # 确保导出目录存在
    export_dir = os.path.dirname(EXPORT_PATH)
    if not os.path.exists(export_dir):
        os.makedirs(export_dir)
    
    # 导出设置
    bpy.ops.export_scene.gltf(
        filepath=EXPORT_PATH,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_materials='EXPORT',
        export_colors=True,
    )
    
    print(f"导出完成: {EXPORT_PATH}")
    
    # 检查文件大小
    if os.path.exists(EXPORT_PATH):
        size_mb = os.path.getsize(EXPORT_PATH) / (1024 * 1024)
        print(f"文件大小: {size_mb:.2f} MB")

def main():
    print("=" * 50)
    print("Z-Anatomy 肌肉模型导出脚本")
    print("=" * 50)
    
    # 1. 选择肌肉对象
    muscle_count = select_muscles()
    
    if muscle_count == 0:
        print("警告: 未找到肌肉对象！")
        print("请手动检查模型中的肌肉命名")
        return
    
    # 2. 简化 mesh（可选，如果模型太大）
    # simplify_meshes(ratio=0.5)
    
    # 3. 导出 GLB
    export_glb()
    
    print("=" * 50)
    print("完成！")

if __name__ == "__main__":
    main()
