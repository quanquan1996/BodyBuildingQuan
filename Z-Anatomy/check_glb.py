# 检查 GLB 文件中的所有 mesh 名称
# 在 Blender 中运行此脚本

import bpy
import os

# 使用绝对路径
GLB_PATH = r"C:\Code\BodyBuildingQuan\nextjs-app\public\models\muscle-anatomy.glb"

def main():
    print("=" * 50)
    print("Checking mesh names in GLB file")
    print("=" * 50)
    
    # 清空场景
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    
    # 导入 GLB
    print(f"\nImporting: {GLB_PATH}")
    bpy.ops.import_scene.gltf(filepath=GLB_PATH)
    
    # 搜索胸肌相关对象
    print("\n--- Searching for chest/pectoral objects ---")
    chest_keywords = ['pector', 'chest', 'sternocostal', 'clavicular', 'major']
    found_chest = False
    for obj in bpy.data.objects:
        if obj.type == 'MESH':
            name_lower = obj.name.lower()
            for keyword in chest_keywords:
                if keyword in name_lower:
                    print(f"  FOUND: {obj.name}")
                    found_chest = True
                    break
    
    if not found_chest:
        print("  NO chest/pectoral objects found!")
    
    # 列出所有 mesh
    print("\n--- All MESH objects ---")
    mesh_count = 0
    for obj in bpy.data.objects:
        if obj.type == 'MESH':
            mesh_count += 1
            # 只打印前 100 个
            if mesh_count <= 100:
                print(f"  {mesh_count}. {obj.name}")
    
    print(f"\nTotal: {mesh_count} MESH objects")
    
    if mesh_count > 100:
        print("(showing first 100 only)")
    
    print("=" * 50)

if __name__ == "__main__":
    main()
