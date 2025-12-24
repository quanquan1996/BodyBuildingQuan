# Z-Anatomy 命令行导出脚本
# 
# 使用方法（在命令行运行）：
# blender Startup.blend --background --python export_cli.py
#
# 或者指定输出路径：
# blender Startup.blend --background --python export_cli.py -- --output ../nextjs-app/public/models/muscle-anatomy.glb

import bpy
import os
import sys

def get_output_path():
    """获取输出路径"""
    # 检查命令行参数
    argv = sys.argv
    if "--" in argv:
        args = argv[argv.index("--") + 1:]
        for i, arg in enumerate(args):
            if arg == "--output" and i + 1 < len(args):
                return args[i + 1]
    
    # 默认路径
    blend_dir = os.path.dirname(bpy.data.filepath)
    return os.path.join(blend_dir, "..", "nextjs-app", "public", "models", "muscle-anatomy.glb")

def is_muscle_object(obj):
    """检查对象是否是肌肉"""
    muscle_keywords = [
        "muscle", "deltoid", "bicep", "tricep", "pectoral", "latissimus",
        "trapezius", "rectus", "oblique", "gluteus", "quadricep", "vastus",
        "hamstring", "gastrocnemius", "soleus", "tibialis", "serratus",
        "rhomboid", "erector", "teres", "infraspinatus", "adductor",
        "brachialis", "forearm", "flexor", "extensor", "femoris",
        "semitendinosus", "semimembranosus", "tensor", "abdominis"
    ]
    name_lower = obj.name.lower()
    return any(keyword in name_lower for keyword in muscle_keywords)

def main():
    print("=" * 60)
    print("Z-Anatomy 肌肉模型导出脚本")
    print("=" * 60)
    
    output_path = get_output_path()
    print(f"输出路径: {output_path}")
    
    # 确保输出目录存在
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"创建目录: {output_dir}")
    
    # 取消选择所有对象
    bpy.ops.object.select_all(action='DESELECT')
    
    # 统计信息
    total_objects = 0
    muscle_objects = 0
    
    # 遍历所有对象，选择肌肉
    for obj in bpy.data.objects:
        total_objects += 1
        if obj.type == 'MESH' and is_muscle_object(obj):
            obj.select_set(True)
            obj.hide_set(False)
            muscle_objects += 1
            print(f"  选中: {obj.name}")
    
    print(f"\n总对象数: {total_objects}")
    print(f"肌肉对象数: {muscle_objects}")
    
    if muscle_objects == 0:
        print("\n警告: 未找到肌肉对象！")
        print("请检查模型中的对象命名")
        
        # 列出所有 mesh 对象名称供参考
        print("\n所有 MESH 对象:")
        for obj in bpy.data.objects:
            if obj.type == 'MESH':
                print(f"  - {obj.name}")
        return
    
    # 导出 GLB
    print(f"\n正在导出...")
    
    try:
        # Blender 5.0 兼容的导出参数
        bpy.ops.export_scene.gltf(
            filepath=output_path,
            export_format='GLB',
            use_selection=True,
            export_apply=True,
            export_draco_mesh_compression_enable=True,
            export_draco_mesh_compression_level=6,
            export_materials='EXPORT',
        )
        
        # 检查文件大小
        if os.path.exists(output_path):
            size_bytes = os.path.getsize(output_path)
            size_mb = size_bytes / (1024 * 1024)
            print(f"\n导出成功!")
            print(f"文件大小: {size_mb:.2f} MB ({size_bytes:,} bytes)")
            
            if size_mb > 10:
                print("\n警告: 文件较大，建议使用 Decimate 简化模型")
        else:
            print("\n错误: 导出文件未创建")
            
    except Exception as e:
        print(f"\n导出失败: {e}")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
