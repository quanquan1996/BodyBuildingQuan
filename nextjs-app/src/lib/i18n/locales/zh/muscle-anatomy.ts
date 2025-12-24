// 3D肌肉解剖 - 中文翻译

export const muscleAnatomy = {
  title: '3D肌肉解剖图',
  description: '交互式3D人体肌肉解剖展示，点击查看每块肌肉的名称',
  metaDescription: '免费在线3D人体肌肉解剖图，交互式展示人体肌肉结构，点击查看肌肉名称，支持旋转缩放，帮助健身爱好者了解肌肉解剖知识。',
  controls: {
    frontView: '正面',
    backView: '背面',
    reset: '重置视角',
  },
  loading: '加载3D模型中...',
  webglError: '您的浏览器不支持WebGL，无法显示3D模型。请使用Chrome、Firefox或Edge等现代浏览器。',
  clickToView: '点击肌肉查看名称',
  selectedMuscle: '选中的肌肉',
  muscleGroups: {
    upper: '上肢',
    torso: '躯干',
    lower: '下肢',
  },
  explanation: {
    title: '关于3D肌肉解剖图',
    whatIs: '什么是肌肉解剖学？',
    whatIsContent: '肌肉解剖学是研究人体肌肉系统结构的学科。了解肌肉的位置、形态和功能，对于健身训练、运动康复和医学研究都至关重要。通过3D可视化，您可以更直观地了解人体600多块肌肉的分布和层次关系。',
    benefits: '学习肌肉解剖的好处',
    benefitsList: [
      '精准定位目标肌群，提高训练效率',
      '理解肌肉协同作用，优化动作模式',
      '预防运动损伤，科学安排训练计划',
      '加深对人体结构的认识，提升健身素养',
    ],
    howToUse: '如何使用',
    howToUseList: [
      '拖动鼠标旋转模型，从不同角度观察',
      '滚动鼠标滚轮缩放视图',
      '点击肌肉查看中英文名称',
      '使用顶部按钮快速切换正面/背面视图',
    ],
  },
  // 肌肉名称翻译
  muscles: {
    // === 上肢 Upper Body ===
    // 三角肌 Deltoid
    deltoid_anterior: '三角肌前束',
    deltoid_lateral: '三角肌中束',
    deltoid_posterior: '三角肌后束',
    clavicular_part_of_deltoid: '三角肌锁骨部',
    acromial_part_of_deltoid: '三角肌肩峰部',
    scapular_spinal_part_of_deltoid: '三角肌肩胛棘部',
    
    // 上臂 Upper Arm
    biceps: '肱二头肌',
    biceps_brachii: '肱二头肌',
    long_head_of_biceps_brachii: '肱二头肌长头',
    short_head_of_biceps_brachii: '肱二头肌短头',
    triceps: '肱三头肌',
    triceps_brachii: '肱三头肌',
    long_head_of_triceps_brachii: '肱三头肌长头',
    lateral_head_of_triceps_brachii: '肱三头肌外侧头',
    medial_head_of_triceps_brachii: '肱三头肌内侧头',
    brachialis: '肱肌',
    coracobrachialis: '喙肱肌',
    anconeus: '肘肌',
    
    // 前臂 Forearm
    forearm_flexors: '前臂屈肌群',
    forearm_extensors: '前臂伸肌群',
    flexor_carpi_radialis: '桡侧腕屈肌',
    flexor_carpi_ulnaris: '尺侧腕屈肌',
    flexor_digitorum_superficialis: '指浅屈肌',
    flexor_digitorum_profundus: '指深屈肌',
    palmaris_longus: '掌长肌',
    extensor_carpi_radialis_longus: '桡侧腕长伸肌',
    extensor_carpi_radialis_brevis: '桡侧腕短伸肌',
    extensor_carpi_ulnaris: '尺侧腕伸肌',
    extensor_digitorum: '指伸肌',
    pronator_teres: '旋前圆肌',
    pronator_quadratus: '旋前方肌',
    supinator: '旋后肌',
    brachioradialis: '肱桡肌',
    
    // 手部 Hand
    abductor_pollicis_brevis: '拇短展肌',
    abductor_pollicis_longus: '拇长展肌',
    adductor_pollicis: '拇收肌',
    opponens_pollicis: '拇对掌肌',
    flexor_pollicis_brevis: '拇短屈肌',
    flexor_pollicis_longus: '拇长屈肌',
    abductor_digiti_minimi: '小指展肌',
    flexor_digiti_minimi_brevis: '小指短屈肌',
    opponens_digiti_minimi: '小指对掌肌',
    lumbricals: '蚓状肌',
    interossei: '骨间肌',
    palmar_interossei: '掌侧骨间肌',
    dorsal_interossei: '背侧骨间肌',
    
    // === 躯干 Torso ===
    // 胸部 Chest
    pectoralis_major: '胸大肌',
    sternocostal_head_of_pectoralis_major: '胸大肌胸肋部',
    clavicular_head_of_pectoralis_major: '胸大肌锁骨部',
    abdominal_part_of_pectoralis_major: '胸大肌腹部',
    pectoralis_minor: '胸小肌',
    serratus_anterior: '前锯肌',
    subclavius: '锁骨下肌',
    intercostal_muscles: '肋间肌',
    external_intercostal: '肋间外肌',
    internal_intercostal: '肋间内肌',
    
    // 背部 Back
    latissimus_dorsi: '背阔肌',
    trapezius: '斜方肌',
    descending_part_of_trapezius: '斜方肌上部（降部）',
    transverse_part_of_trapezius: '斜方肌中部（横部）',
    ascending_part_of_trapezius: '斜方肌下部（升部）',
    rhomboids: '菱形肌',
    rhomboid_major: '大菱形肌',
    rhomboid_minor: '小菱形肌',
    levator_scapulae: '肩胛提肌',
    
    // 肩袖 Rotator Cuff
    teres_major: '大圆肌',
    teres_minor: '小圆肌',
    infraspinatus: '冈下肌',
    supraspinatus: '冈上肌',
    subscapularis: '肩胛下肌',
    
    // 脊柱肌群 Spinal Muscles
    erector_spinae: '竖脊肌',
    iliocostalis: '髂肋肌',
    longissimus: '最长肌',
    spinalis: '棘肌',
    multifidus: '多裂肌',
    rotatores: '回旋肌',
    semispinalis: '半棘肌',
    quadratus_lumborum: '腰方肌',
    
    // 腹部 Abdomen
    rectus_abdominis: '腹直肌',
    external_oblique: '腹外斜肌',
    external_abdominal_oblique: '腹外斜肌',
    internal_oblique: '腹内斜肌',
    internal_abdominal_oblique: '腹内斜肌',
    transverse_abdominis: '腹横肌',
    transversus_abdominis: '腹横肌',
    pyramidalis: '锥状肌',
    
    // 颈部 Neck
    sternocleidomastoid: '胸锁乳突肌',
    scalene_muscles: '斜角肌',
    scalenus_anterior: '前斜角肌',
    scalenus_medius: '中斜角肌',
    scalenus_posterior: '后斜角肌',
    longus_colli: '颈长肌',
    longus_capitis: '头长肌',
    platysma: '颈阔肌',
    
    // 舌骨肌群 Hyoid Muscles
    omohyoid: '肩胛舌骨肌',
    sternohyoid: '胸骨舌骨肌',
    thyrohyoid: '甲状舌骨肌',
    digastric: '二腹肌',
    mylohyoid: '下颌舌骨肌',
    geniohyoid: '颏舌骨肌',
    stylohyoid: '茎突舌骨肌',
    
    // 面部 Face
    masseter: '咬肌',
    temporalis: '颞肌',
    lateral_pterygoid: '翼外肌',
    medial_pterygoid: '翼内肌',
    orbicularis_oculi: '眼轮匝肌',
    orbicularis_oris: '口轮匝肌',
    zygomaticus_major: '颧大肌',
    zygomaticus_minor: '颧小肌',
    frontalis: '额肌',
    occipitalis: '枕肌',
    nasalis: '鼻肌',
    mentalis: '颏肌',
    risorius: '笑肌',
    procerus: '降眉间肌',
    buccinator: '颊肌',
    levator_labii_superioris: '上唇提肌',
    depressor_labii_inferioris: '下唇降肌',
    depressor_anguli_oris: '口角降肌',
    
    // === 下肢 Lower Body ===
    // 臀部 Gluteal
    gluteus_maximus: '臀大肌',
    gluteus_medius: '臀中肌',
    gluteus_minimus: '臀小肌',
    tensor_fasciae_latae: '阔筋膜张肌',
    piriformis: '梨状肌',
    
    // 髋部深层 Deep Hip
    iliopsoas: '髂腰肌',
    iliacus: '髂肌',
    psoas_major: '腰大肌',
    psoas_minor: '腰小肌',
    obturator_internus: '闭孔内肌',
    obturator_externus: '闭孔外肌',
    gemellus_superior: '上孖肌',
    gemellus_inferior: '下孖肌',
    quadratus_femoris: '股方肌',
    
    // 大腿前侧 Anterior Thigh
    quadriceps: '股四头肌',
    quadriceps_femoris: '股四头肌',
    rectus_femoris: '股直肌',
    vastus_lateralis: '股外侧肌',
    vastus_medialis: '股内侧肌',
    vastus_intermedius: '股中间肌',
    sartorius: '缝匠肌',
    
    // 大腿后侧 Posterior Thigh (Hamstrings)
    hamstrings: '腘绳肌',
    biceps_femoris: '股二头肌',
    long_head_of_biceps_femoris: '股二头肌长头',
    short_head_of_biceps_femoris: '股二头肌短头',
    semitendinosus: '半腱肌',
    semimembranosus: '半膜肌',
    
    // 大腿内侧 Medial Thigh (Adductors)
    adductors: '内收肌群',
    adductor_magnus: '大收肌',
    adductor_longus: '长收肌',
    adductor_brevis: '短收肌',
    gracilis: '股薄肌',
    pectineus: '耻骨肌',
    
    // 小腿后侧 Posterior Leg
    gastrocnemius: '腓肠肌',
    lateral_head_of_gastrocnemius: '腓肠肌外侧头',
    medial_head_of_gastrocnemius: '腓肠肌内侧头',
    soleus: '比目鱼肌',
    plantaris: '跖肌',
    popliteus: '腘肌',
    tibialis_posterior: '胫骨后肌',
    flexor_digitorum_longus: '趾长屈肌',
    flexor_hallucis_longus: '拇长屈肌',
    
    // 小腿前侧和外侧 Anterior and Lateral Leg
    tibialis_anterior: '胫骨前肌',
    extensor_digitorum_longus: '趾长伸肌',
    extensor_hallucis_longus: '拇长伸肌',
    peroneus_longus: '腓骨长肌',
    fibularis_longus: '腓骨长肌',
    peroneus_brevis: '腓骨短肌',
    fibularis_brevis: '腓骨短肌',
    peroneus_tertius: '第三腓骨肌',
    fibularis_tertius: '第三腓骨肌',
    
    // 足部 Foot
    extensor_digitorum_brevis: '趾短伸肌',
    extensor_hallucis_brevis: '拇短伸肌',
    abductor_hallucis: '拇展肌',
    flexor_digitorum_brevis: '趾短屈肌',
    flexor_hallucis_brevis: '拇短屈肌',
    quadratus_plantae: '足底方肌',
    foot_lumbricals: '足蚓状肌',
    foot_interossei: '足骨间肌',
    plantar_interossei: '足底骨间肌',
    dorsal_interossei_foot: '足背骨间肌',
    adductor_hallucis: '拇收肌',
    abductor_digiti_minimi_foot: '小趾展肌',
    flexor_digiti_minimi_brevis_foot: '小趾短屈肌',
  },
};
