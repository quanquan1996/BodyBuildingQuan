# Implementation Plan

## 架构重构任务

- [x] 1. 创建模块化翻译文件结构



  - [x] 1.1 创建中文上肢肌肉详情模块 (zh/muscle-details-upper.ts)

    - 创建文件并导出 muscleDetailsUpper 对象
    - 包含三角肌、二头肌、三头肌、前臂、手部肌肉
    - _Requirements: 1.2, 2.1_
  
  - [x] 1.2 创建中文躯干肌肉详情模块 (zh/muscle-details-torso.ts)


    - 创建文件并导出 muscleDetailsTorso 对象
    - 包含胸、背、腹、颈、面部肌肉
    - _Requirements: 1.2, 2.2_
  

  - [x] 1.3 创建中文下肢肌肉详情模块 (zh/muscle-details-lower.ts)

    - 创建文件并导出 muscleDetailsLower 对象
    - 包含臀、腿、小腿、足部肌肉
    - _Requirements: 1.2, 2.3_
  
  - [x] 1.4 创建英文上肢肌肉详情模块 (en/muscle-details-upper.ts)


    - 创建文件并导出 muscleDetailsUpper 对象
    - 迁移现有英文详情并补充缺失内容
    - _Requirements: 1.2, 3.1_
  
  - [x] 1.5 创建英文躯干肌肉详情模块 (en/muscle-details-torso.ts)


    - 创建文件并导出 muscleDetailsTorso 对象
    - 迁移现有英文详情并补充缺失内容
    - _Requirements: 1.2, 3.2_
  
  - [x] 1.6 创建英文下肢肌肉详情模块 (en/muscle-details-lower.ts)


    - 创建文件并导出 muscleDetailsLower 对象
    - 迁移现有英文详情并补充缺失内容
    - _Requirements: 1.2, 3.3_


- [x] 2. 更新主翻译文件

  - [x] 2.1 更新中文主文件 (zh/muscle-anatomy.ts)


    - 导入三个详情模块
    - 合并到 muscleDetails 对象
    - 移除原有的 muscleDetails（如有）
    - _Requirements: 1.4_
  
  - [x] 2.2 更新英文主文件 (en/muscle-anatomy.ts)


    - 导入三个详情模块
    - 合并到 muscleDetails 对象
    - 移除原有的 muscleDetails
    - _Requirements: 1.4_

- [ ] 3. 更新模块索引
  - [ ] 3.1 更新 zh/index.ts 导出新模块
    - _Requirements: 1.4_
  
  - [ ] 3.2 更新 en/index.ts 导出新模块
    - _Requirements: 1.4_

- [ ] 4. 类型检查验证
  - [x] 4.1 运行 TypeScript 类型检查


    - 确保所有导入导出正确
    - 确保类型定义匹配
    - _Requirements: 1.5_

## 第一批翻译填充：主要训练肌群

- [ ] 5. 填充上肢主要肌群详情
  - [ ] 5.1 填充中文三角肌详情
    - deltoid_anterior, deltoid_lateral, deltoid_posterior
    - _Requirements: 2.1, 2.4_
  
  - [ ] 5.2 填充中文二头肌详情
    - biceps_brachii, long_head_of_biceps_brachii, short_head_of_biceps_brachii
    - _Requirements: 2.1, 2.4_
  
  - [ ] 5.3 填充中文三头肌详情
    - triceps_brachii, long_head, lateral_head, medial_head
    - _Requirements: 2.1, 2.4_
  
  - [ ] 5.4 填充英文三角肌详情（补充缺失）
    - _Requirements: 3.1, 3.4_
  
  - [ ] 5.5 填充英文二头肌详情（补充缺失）
    - _Requirements: 3.1, 3.4_
  
  - [ ] 5.6 填充英文三头肌详情（补充缺失）
    - _Requirements: 3.1, 3.4_

- [ ] 6. 填充躯干主要肌群详情
  - [ ] 6.1 填充中文胸肌详情
    - pectoralis_major, clavicular_head, sternocostal_head, pectoralis_minor
    - _Requirements: 2.2, 2.4_
  
  - [ ] 6.2 填充中文背肌详情
    - latissimus_dorsi, trapezius (3部分), rhomboids
    - _Requirements: 2.2, 2.4_
  
  - [ ] 6.3 填充中文核心肌群详情
    - rectus_abdominis, external_oblique, internal_oblique, erector_spinae
    - _Requirements: 2.2, 2.4_
  
  - [ ] 6.4 填充英文胸肌详情（补充缺失）
    - _Requirements: 3.2, 3.4_
  
  - [ ] 6.5 填充英文背肌详情（补充缺失）
    - _Requirements: 3.2, 3.4_
  
  - [ ] 6.6 填充英文核心肌群详情（补充缺失）
    - _Requirements: 3.2, 3.4_

- [ ] 7. 填充下肢主要肌群详情
  - [ ] 7.1 填充中文臀腿肌群详情
    - gluteus_maximus, quadriceps (4头), hamstrings (3块)
    - _Requirements: 2.3, 2.4_
  
  - [ ] 7.2 填充中文小腿肌群详情
    - gastrocnemius, soleus, tibialis_anterior
    - _Requirements: 2.3, 2.4_
  
  - [ ] 7.3 填充英文臀腿肌群详情（补充缺失）
    - _Requirements: 3.3, 3.4_
  
  - [ ] 7.4 填充英文小腿肌群详情（补充缺失）
    - _Requirements: 3.3, 3.4_

## 第二批翻译填充：次要肌群

- [ ] 8. 填充次要肌群详情
  - [ ] 8.1 填充中文肩袖肌群详情
    - supraspinatus, infraspinatus, teres_minor, teres_major, subscapularis
    - _Requirements: 2.2, 2.4_
  
  - [ ] 8.2 填充中文前臂肌群详情
    - brachialis, brachioradialis, forearm_flexors, forearm_extensors
    - _Requirements: 2.1, 2.4_
  
  - [ ] 8.3 填充中文臀部次要肌群详情
    - gluteus_medius, gluteus_minimus, piriformis, tensor_fasciae_latae
    - _Requirements: 2.3, 2.4_
  
  - [ ] 8.4 填充中文内收肌群详情
    - adductors, adductor_magnus, adductor_longus, gracilis, pectineus
    - _Requirements: 2.3, 2.4_
  
  - [ ] 8.5 填充英文次要肌群详情（补充缺失）
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

## 第三批翻译填充：辅助肌群

- [ ] 9. 填充辅助肌群详情
  - [ ] 9.1 填充中文颈部肌群详情
    - sternocleidomastoid, scalenes, platysma
    - _Requirements: 2.2, 2.4_
  
  - [ ] 9.2 填充中文深层核心肌群详情
    - transverse_abdominis, serratus_anterior, multifidus, iliopsoas
    - _Requirements: 2.2, 2.4_
  
  - [ ] 9.3 填充中文小腿次要肌群详情
    - peroneus_longus, tibialis_posterior, flexor_hallucis_longus
    - _Requirements: 2.3, 2.4_
  
  - [ ] 9.4 填充英文辅助肌群详情（补充缺失）
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

## 验证任务

- [ ] 10. 最终验证
  - [ ] 10.1 运行完整类型检查
    - _Requirements: 1.5_
  
  - [ ] 10.2 运行构建验证
    - _Requirements: 1.5_
  
  - [ ] 10.3 验证中英文键一致性
    - _Requirements: 3.4_

