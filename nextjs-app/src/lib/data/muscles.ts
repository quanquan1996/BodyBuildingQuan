// 肌肉数据定义
// 肌肉名称通过 i18n 翻译系统获取，这里只存储 ID 和分组信息

export type MuscleLayer = 'superficial' | 'deep';

export interface MuscleInfo {
  id: string;           // 肌肉 ID（用于翻译键）
  group: 'upper' | 'torso' | 'lower';  // 身体部位分组
}

// ============================================
// 肌肉层级分类
// ============================================

// 表层肌肉 - 位于身体表面，可以直接看到或触摸到
export const SUPERFICIAL_MUSCLES: string[] = [
  // 上肢表层
  'deltoid_anterior', 'deltoid_lateral', 'deltoid_posterior',
  'clavicular_part_of_deltoid', 'acromial_part_of_deltoid', 'scapular_spinal_part_of_deltoid',
  'biceps', 'biceps_brachii', 'long_head_of_biceps_brachii', 'short_head_of_biceps_brachii',
  'triceps', 'triceps_brachii', 'long_head_of_triceps_brachii', 'lateral_head_of_triceps_brachii',
  'forearm_flexors', 'forearm_extensors', 'flexor_carpi_radialis', 'flexor_carpi_ulnaris',
  'palmaris_longus', 'extensor_carpi_radialis_longus', 'extensor_carpi_ulnaris',
  'extensor_digitorum', 'brachioradialis',
  
  // 躯干表层 - 胸部
  'pectoralis_major', 'sternocostal_head_of_pectoralis_major',
  'clavicular_head_of_pectoralis_major', 'abdominal_part_of_pectoralis_major',
  
  // 躯干表层 - 背部（从背面可见）
  'latissimus_dorsi', 'trapezius', 'descending_part_of_trapezius',
  'transverse_part_of_trapezius', 'ascending_part_of_trapezius',
  'teres_major',  // 大圆肌 - 从背部可见
  'infraspinatus',  // 冈下肌 - 从背部可见
  'rhomboid_major', 'rhomboid_minor', 'rhomboids',  // 菱形肌 - 斜方肌下可见
  'erector_spinae', 'iliocostalis', 'longissimus', 'spinalis',  // 竖脊肌 - 从背部可见
  
  // 躯干表层 - 腹部
  'rectus_abdominis', 'external_oblique', 'external_abdominal_oblique',
  'serratus_anterior', 'sternocleidomastoid', 'platysma',
  
  // 面部表层
  'masseter', 'temporalis', 'orbicularis_oculi', 'orbicularis_oris',
  'zygomaticus_major', 'zygomaticus_minor', 'frontalis', 'occipitalis',
  'nasalis', 'mentalis', 'risorius', 'procerus', 'buccinator',
  
  // 下肢表层
  'gluteus_maximus', 'gluteus_medius',  // 臀中肌从侧面可见
  'tensor_fasciae_latae',
  'quadriceps', 'quadriceps_femoris', 'rectus_femoris', 'vastus_lateralis', 'vastus_medialis',
  'sartorius', 'hamstrings', 'biceps_femoris', 'long_head_of_biceps_femoris',
  'semitendinosus', 'semimembranosus', 'adductors', 'adductor_longus', 'gracilis',
  'gastrocnemius', 'lateral_head_of_gastrocnemius', 'medial_head_of_gastrocnemius',
  'tibialis_anterior', 'extensor_digitorum_longus', 'peroneus_longus', 'fibularis_longus',
  'peroneus_brevis', 'fibularis_brevis',
];

// 深层肌肉 - 位于表层肌肉下方，需要移除表层才能看到
export const DEEP_MUSCLES: string[] = [
  // 上肢深层
  'medial_head_of_triceps_brachii', 'brachialis', 'coracobrachialis', 'anconeus',
  'flexor_digitorum_superficialis', 'flexor_digitorum_profundus',
  'extensor_carpi_radialis_brevis', 'pronator_teres', 'pronator_quadratus', 'supinator',
  
  // 躯干深层 - 胸部
  'pectoralis_minor', 'subclavius', 'intercostal_muscles', 'external_intercostal', 'internal_intercostal',
  
  // 躯干深层 - 背部/肩袖
  'levator_scapulae',
  'teres_minor',  // 小圆肌 - 在冈下肌下方
  'supraspinatus',  // 冈上肌 - 在斜方肌下方
  'subscapularis',  // 肩胛下肌 - 在肩胛骨前面
  'multifidus', 'rotatores', 'semispinalis', 'quadratus_lumborum',
  
  // 躯干深层 - 腹部
  'internal_oblique', 'internal_abdominal_oblique', 'transverse_abdominis', 'transversus_abdominis', 'pyramidalis',
  
  // 躯干深层 - 颈部
  'scalene_muscles', 'scalenus_anterior', 'scalenus_medius', 'scalenus_posterior',
  'longus_colli', 'longus_capitis',
  
  // 下肢深层
  'gluteus_minimus', 'piriformis',
  'iliopsoas', 'iliacus', 'psoas_major', 'psoas_minor',
  'obturator_internus', 'obturator_externus', 'gemellus_superior', 'gemellus_inferior', 'quadratus_femoris',
  'vastus_intermedius', 'short_head_of_biceps_femoris', 'adductor_magnus', 'adductor_brevis', 'pectineus',
  'soleus', 'plantaris', 'popliteus', 'tibialis_posterior',
  'flexor_digitorum_longus', 'flexor_hallucis_longus', 'extensor_hallucis_longus',
];

// 判断肌肉属于哪个层级
export function getMuscleLayer(muscleId: string): MuscleLayer {
  if (SUPERFICIAL_MUSCLES.includes(muscleId)) return 'superficial';
  if (DEEP_MUSCLES.includes(muscleId)) return 'deep';
  // 默认返回表层（对于未分类的肌肉）
  return 'superficial';
}

// 所有肌肉列表（按身体部位分组）
export const muscleData: MuscleInfo[] = [
  // === 上肢 Upper Body ===
  // 三角肌
  { id: 'deltoid_anterior', group: 'upper' },
  { id: 'deltoid_lateral', group: 'upper' },
  { id: 'deltoid_posterior', group: 'upper' },
  { id: 'clavicular_part_of_deltoid', group: 'upper' },
  { id: 'acromial_part_of_deltoid', group: 'upper' },
  { id: 'scapular_spinal_part_of_deltoid', group: 'upper' },
  
  // 上臂
  { id: 'biceps', group: 'upper' },
  { id: 'biceps_brachii', group: 'upper' },
  { id: 'long_head_of_biceps_brachii', group: 'upper' },
  { id: 'short_head_of_biceps_brachii', group: 'upper' },
  { id: 'triceps', group: 'upper' },
  { id: 'triceps_brachii', group: 'upper' },
  { id: 'long_head_of_triceps_brachii', group: 'upper' },
  { id: 'lateral_head_of_triceps_brachii', group: 'upper' },
  { id: 'medial_head_of_triceps_brachii', group: 'upper' },
  { id: 'brachialis', group: 'upper' },
  { id: 'coracobrachialis', group: 'upper' },
  { id: 'anconeus', group: 'upper' },
  
  // 前臂
  { id: 'forearm_flexors', group: 'upper' },
  { id: 'forearm_extensors', group: 'upper' },
  { id: 'flexor_carpi_radialis', group: 'upper' },
  { id: 'flexor_carpi_ulnaris', group: 'upper' },
  { id: 'flexor_digitorum_superficialis', group: 'upper' },
  { id: 'flexor_digitorum_profundus', group: 'upper' },
  { id: 'palmaris_longus', group: 'upper' },
  { id: 'extensor_carpi_radialis_longus', group: 'upper' },
  { id: 'extensor_carpi_radialis_brevis', group: 'upper' },
  { id: 'extensor_carpi_ulnaris', group: 'upper' },
  { id: 'extensor_digitorum', group: 'upper' },
  { id: 'pronator_teres', group: 'upper' },
  { id: 'pronator_quadratus', group: 'upper' },
  { id: 'supinator', group: 'upper' },
  { id: 'brachioradialis', group: 'upper' },
  
  // 手部
  { id: 'abductor_pollicis_brevis', group: 'upper' },
  { id: 'abductor_pollicis_longus', group: 'upper' },
  { id: 'adductor_pollicis', group: 'upper' },
  { id: 'opponens_pollicis', group: 'upper' },
  { id: 'flexor_pollicis_brevis', group: 'upper' },
  { id: 'flexor_pollicis_longus', group: 'upper' },
  { id: 'abductor_digiti_minimi', group: 'upper' },
  { id: 'flexor_digiti_minimi_brevis', group: 'upper' },
  { id: 'opponens_digiti_minimi', group: 'upper' },
  { id: 'lumbricals', group: 'upper' },
  { id: 'interossei', group: 'upper' },
  { id: 'palmar_interossei', group: 'upper' },
  { id: 'dorsal_interossei', group: 'upper' },

  // === 躯干 Torso ===
  // 胸部
  { id: 'pectoralis_major', group: 'torso' },
  { id: 'sternocostal_head_of_pectoralis_major', group: 'torso' },
  { id: 'clavicular_head_of_pectoralis_major', group: 'torso' },
  { id: 'abdominal_part_of_pectoralis_major', group: 'torso' },
  { id: 'pectoralis_minor', group: 'torso' },
  { id: 'serratus_anterior', group: 'torso' },
  { id: 'subclavius', group: 'torso' },
  { id: 'intercostal_muscles', group: 'torso' },
  { id: 'external_intercostal', group: 'torso' },
  { id: 'internal_intercostal', group: 'torso' },
  
  // 背部
  { id: 'latissimus_dorsi', group: 'torso' },
  { id: 'trapezius', group: 'torso' },
  { id: 'descending_part_of_trapezius', group: 'torso' },
  { id: 'transverse_part_of_trapezius', group: 'torso' },
  { id: 'ascending_part_of_trapezius', group: 'torso' },
  { id: 'rhomboids', group: 'torso' },
  { id: 'rhomboid_major', group: 'torso' },
  { id: 'rhomboid_minor', group: 'torso' },
  { id: 'levator_scapulae', group: 'torso' },
  
  // 肩袖
  { id: 'teres_major', group: 'torso' },
  { id: 'teres_minor', group: 'torso' },
  { id: 'infraspinatus', group: 'torso' },
  { id: 'supraspinatus', group: 'torso' },
  { id: 'subscapularis', group: 'torso' },
  
  // 脊柱肌群
  { id: 'erector_spinae', group: 'torso' },
  { id: 'iliocostalis', group: 'torso' },
  { id: 'longissimus', group: 'torso' },
  { id: 'spinalis', group: 'torso' },
  { id: 'multifidus', group: 'torso' },
  { id: 'rotatores', group: 'torso' },
  { id: 'semispinalis', group: 'torso' },
  { id: 'quadratus_lumborum', group: 'torso' },
  
  // 腹部
  { id: 'rectus_abdominis', group: 'torso' },
  { id: 'external_oblique', group: 'torso' },
  { id: 'external_abdominal_oblique', group: 'torso' },
  { id: 'internal_oblique', group: 'torso' },
  { id: 'internal_abdominal_oblique', group: 'torso' },
  { id: 'transverse_abdominis', group: 'torso' },
  { id: 'transversus_abdominis', group: 'torso' },
  { id: 'pyramidalis', group: 'torso' },
  
  // 颈部
  { id: 'sternocleidomastoid', group: 'torso' },
  { id: 'scalene_muscles', group: 'torso' },
  { id: 'scalenus_anterior', group: 'torso' },
  { id: 'scalenus_medius', group: 'torso' },
  { id: 'scalenus_posterior', group: 'torso' },
  { id: 'longus_colli', group: 'torso' },
  { id: 'longus_capitis', group: 'torso' },
  { id: 'platysma', group: 'torso' },
  
  // 舌骨肌群
  { id: 'omohyoid', group: 'torso' },
  { id: 'sternohyoid', group: 'torso' },
  { id: 'thyrohyoid', group: 'torso' },
  { id: 'digastric', group: 'torso' },
  { id: 'mylohyoid', group: 'torso' },
  { id: 'geniohyoid', group: 'torso' },
  { id: 'stylohyoid', group: 'torso' },
  
  // 面部
  { id: 'masseter', group: 'torso' },
  { id: 'temporalis', group: 'torso' },
  { id: 'lateral_pterygoid', group: 'torso' },
  { id: 'medial_pterygoid', group: 'torso' },
  { id: 'orbicularis_oculi', group: 'torso' },
  { id: 'orbicularis_oris', group: 'torso' },
  { id: 'zygomaticus_major', group: 'torso' },
  { id: 'zygomaticus_minor', group: 'torso' },
  { id: 'frontalis', group: 'torso' },
  { id: 'occipitalis', group: 'torso' },
  { id: 'nasalis', group: 'torso' },
  { id: 'mentalis', group: 'torso' },
  { id: 'risorius', group: 'torso' },
  { id: 'procerus', group: 'torso' },
  { id: 'buccinator', group: 'torso' },
  { id: 'levator_labii_superioris', group: 'torso' },
  { id: 'depressor_labii_inferioris', group: 'torso' },
  { id: 'depressor_anguli_oris', group: 'torso' },

  // === 下肢 Lower Body ===
  // 臀部
  { id: 'gluteus_maximus', group: 'lower' },
  { id: 'gluteus_medius', group: 'lower' },
  { id: 'gluteus_minimus', group: 'lower' },
  { id: 'tensor_fasciae_latae', group: 'lower' },
  { id: 'piriformis', group: 'lower' },
  
  // 髋部深层
  { id: 'iliopsoas', group: 'lower' },
  { id: 'iliacus', group: 'lower' },
  { id: 'psoas_major', group: 'lower' },
  { id: 'psoas_minor', group: 'lower' },
  { id: 'obturator_internus', group: 'lower' },
  { id: 'obturator_externus', group: 'lower' },
  { id: 'gemellus_superior', group: 'lower' },
  { id: 'gemellus_inferior', group: 'lower' },
  { id: 'quadratus_femoris', group: 'lower' },
  
  // 大腿前侧
  { id: 'quadriceps', group: 'lower' },
  { id: 'quadriceps_femoris', group: 'lower' },
  { id: 'rectus_femoris', group: 'lower' },
  { id: 'vastus_lateralis', group: 'lower' },
  { id: 'vastus_medialis', group: 'lower' },
  { id: 'vastus_intermedius', group: 'lower' },
  { id: 'sartorius', group: 'lower' },
  
  // 大腿后侧
  { id: 'hamstrings', group: 'lower' },
  { id: 'biceps_femoris', group: 'lower' },
  { id: 'long_head_of_biceps_femoris', group: 'lower' },
  { id: 'short_head_of_biceps_femoris', group: 'lower' },
  { id: 'semitendinosus', group: 'lower' },
  { id: 'semimembranosus', group: 'lower' },
  
  // 大腿内侧
  { id: 'adductors', group: 'lower' },
  { id: 'adductor_magnus', group: 'lower' },
  { id: 'adductor_longus', group: 'lower' },
  { id: 'adductor_brevis', group: 'lower' },
  { id: 'gracilis', group: 'lower' },
  { id: 'pectineus', group: 'lower' },
  
  // 小腿后侧
  { id: 'gastrocnemius', group: 'lower' },
  { id: 'lateral_head_of_gastrocnemius', group: 'lower' },
  { id: 'medial_head_of_gastrocnemius', group: 'lower' },
  { id: 'soleus', group: 'lower' },
  { id: 'plantaris', group: 'lower' },
  { id: 'popliteus', group: 'lower' },
  { id: 'tibialis_posterior', group: 'lower' },
  { id: 'flexor_digitorum_longus', group: 'lower' },
  { id: 'flexor_hallucis_longus', group: 'lower' },
  
  // 小腿前侧和外侧
  { id: 'tibialis_anterior', group: 'lower' },
  { id: 'extensor_digitorum_longus', group: 'lower' },
  { id: 'extensor_hallucis_longus', group: 'lower' },
  { id: 'peroneus_longus', group: 'lower' },
  { id: 'fibularis_longus', group: 'lower' },
  { id: 'peroneus_brevis', group: 'lower' },
  { id: 'fibularis_brevis', group: 'lower' },
  { id: 'peroneus_tertius', group: 'lower' },
  { id: 'fibularis_tertius', group: 'lower' },
  
  // 足部
  { id: 'extensor_digitorum_brevis', group: 'lower' },
  { id: 'extensor_hallucis_brevis', group: 'lower' },
  { id: 'abductor_hallucis', group: 'lower' },
  { id: 'flexor_digitorum_brevis', group: 'lower' },
  { id: 'flexor_hallucis_brevis', group: 'lower' },
  { id: 'quadratus_plantae', group: 'lower' },
  { id: 'foot_lumbricals', group: 'lower' },
  { id: 'foot_interossei', group: 'lower' },
  { id: 'plantar_interossei', group: 'lower' },
  { id: 'dorsal_interossei_foot', group: 'lower' },
  { id: 'adductor_hallucis', group: 'lower' },
  { id: 'abductor_digiti_minimi_foot', group: 'lower' },
  { id: 'flexor_digiti_minimi_brevis_foot', group: 'lower' },
];

// Z-Anatomy 模型名称到肌肉 ID 的映射
// Z-Anatomy 命名格式: "Muscle name.l" (左侧) / "Muscle name.r" (右侧)
const muscleAliases: Record<string, string[]> = {
  // 三角肌
  'deltoid_anterior': ['clavicular part of deltoid', 'anterior deltoid'],
  'deltoid_lateral': ['acromial part of deltoid', 'lateral deltoid', 'middle deltoid'],
  'deltoid_posterior': ['scapular spinal part of deltoid', 'posterior deltoid'],
  'clavicular_part_of_deltoid': ['clavicular part of deltoid'],
  'acromial_part_of_deltoid': ['acromial part of deltoid'],
  'scapular_spinal_part_of_deltoid': ['scapular spinal part of deltoid'],
  
  // 上臂
  'biceps': ['biceps brachii'],
  'biceps_brachii': ['biceps brachii'],
  'long_head_of_biceps_brachii': ['long head of biceps brachii'],
  'short_head_of_biceps_brachii': ['short head of biceps brachii'],
  'triceps': ['triceps brachii'],
  'triceps_brachii': ['triceps brachii'],
  'long_head_of_triceps_brachii': ['long head of triceps brachii'],
  'lateral_head_of_triceps_brachii': ['lateral head of triceps brachii'],
  'medial_head_of_triceps_brachii': ['medial head of triceps brachii'],
  'brachialis': ['brachialis'],
  'coracobrachialis': ['coracobrachialis'],
  'anconeus': ['anconeus'],
  
  // 前臂
  'forearm_flexors': ['flexor carpi radialis', 'flexor carpi ulnaris', 'flexor digitorum', 'palmaris longus'],
  'forearm_extensors': ['extensor carpi radialis', 'extensor carpi ulnaris', 'extensor digitorum'],
  'flexor_carpi_radialis': ['flexor carpi radialis'],
  'flexor_carpi_ulnaris': ['flexor carpi ulnaris'],
  'flexor_digitorum_superficialis': ['flexor digitorum superficialis'],
  'flexor_digitorum_profundus': ['flexor digitorum profundus'],
  'palmaris_longus': ['palmaris longus'],
  'extensor_carpi_radialis_longus': ['extensor carpi radialis longus'],
  'extensor_carpi_radialis_brevis': ['extensor carpi radialis brevis'],
  'extensor_carpi_ulnaris': ['extensor carpi ulnaris'],
  'extensor_digitorum': ['extensor digitorum'],
  'pronator_teres': ['pronator teres'],
  'pronator_quadratus': ['pronator quadratus'],
  'supinator': ['supinator'],
  'brachioradialis': ['brachioradialis'],
  
  // 胸部
  'pectoralis_major': ['pectoralis major'],
  'sternocostal_head_of_pectoralis_major': ['sternocostal head of pectoralis major', 'sternocostal part of pectoralis major'],
  'clavicular_head_of_pectoralis_major': ['clavicular head of pectoralis major', 'clavicular part of pectoralis major'],
  'abdominal_part_of_pectoralis_major': ['abdominal part of pectoralis major'],
  'pectoralis_minor': ['pectoralis minor'],
  'serratus_anterior': ['serratus anterior'],
  'subclavius': ['subclavius'],
  'intercostal_muscles': ['intercostal'],
  'external_intercostal': ['external intercostal'],
  'internal_intercostal': ['internal intercostal'],
  
  // 背部
  'latissimus_dorsi': ['latissimus dorsi'],
  'trapezius': ['trapezius'],
  'descending_part_of_trapezius': ['descending part of trapezius', 'upper trapezius'],
  'transverse_part_of_trapezius': ['transverse part of trapezius', 'middle trapezius'],
  'ascending_part_of_trapezius': ['ascending part of trapezius', 'lower trapezius'],
  'rhomboids': ['rhomboid'],
  'rhomboid_major': ['rhomboid major'],
  'rhomboid_minor': ['rhomboid minor'],
  'levator_scapulae': ['levator scapulae'],
  
  // 肩袖
  'teres_major': ['teres major'],
  'teres_minor': ['teres minor'],
  'infraspinatus': ['infraspinatus'],
  'supraspinatus': ['supraspinatus'],
  'subscapularis': ['subscapularis'],
  
  // 脊柱肌群
  'erector_spinae': ['erector spinae'],
  'iliocostalis': ['iliocostalis'],
  'longissimus': ['longissimus'],
  'spinalis': ['spinalis'],
  'multifidus': ['multifidus'],
  'rotatores': ['rotatores'],
  'semispinalis': ['semispinalis'],
  'quadratus_lumborum': ['quadratus lumborum'],
  
  // 腹部
  'rectus_abdominis': ['rectus abdominis'],
  'external_oblique': ['external abdominal oblique', 'external oblique'],
  'external_abdominal_oblique': ['external abdominal oblique'],
  'internal_oblique': ['internal abdominal oblique', 'internal oblique'],
  'internal_abdominal_oblique': ['internal abdominal oblique'],
  'transverse_abdominis': ['transversus abdominis', 'transverse abdominis'],
  'transversus_abdominis': ['transversus abdominis'],
  'pyramidalis': ['pyramidalis'],
  
  // 颈部
  'sternocleidomastoid': ['sternocleidomastoid'],
  'scalene_muscles': ['scalenus', 'scalene'],
  'scalenus_anterior': ['scalenus anterior', 'anterior scalene'],
  'scalenus_medius': ['scalenus medius', 'middle scalene'],
  'scalenus_posterior': ['scalenus posterior', 'posterior scalene'],
  'longus_colli': ['longus colli'],
  'longus_capitis': ['longus capitis'],
  'platysma': ['platysma'],
  
  // 舌骨肌群
  'omohyoid': ['omohyoid'],
  'sternohyoid': ['sternohyoid'],
  'thyrohyoid': ['thyrohyoid'],
  'digastric': ['digastric'],
  'mylohyoid': ['mylohyoid'],
  'geniohyoid': ['geniohyoid'],
  'stylohyoid': ['stylohyoid'],
  
  // 面部
  'masseter': ['masseter'],
  'temporalis': ['temporalis'],
  'lateral_pterygoid': ['lateral pterygoid'],
  'medial_pterygoid': ['medial pterygoid'],
  'orbicularis_oculi': ['orbicularis oculi'],
  'orbicularis_oris': ['orbicularis oris'],
  'zygomaticus_major': ['zygomaticus major'],
  'zygomaticus_minor': ['zygomaticus minor'],
  'frontalis': ['frontalis'],
  'occipitalis': ['occipitalis'],
  'nasalis': ['nasalis'],
  'mentalis': ['mentalis'],
  'risorius': ['risorius'],
  'procerus': ['procerus'],
  'buccinator': ['buccinator'],
  
  // 臀部
  'gluteus_maximus': ['gluteus maximus'],
  'gluteus_medius': ['gluteus medius'],
  'gluteus_minimus': ['gluteus minimus'],
  'tensor_fasciae_latae': ['tensor fasciae latae'],
  'piriformis': ['piriformis'],
  
  // 髋部深层
  'iliopsoas': ['iliopsoas'],
  'iliacus': ['iliacus'],
  'psoas_major': ['psoas major'],
  'psoas_minor': ['psoas minor'],
  'obturator_internus': ['obturator internus'],
  'obturator_externus': ['obturator externus'],
  'gemellus_superior': ['gemellus superior', 'superior gemellus'],
  'gemellus_inferior': ['gemellus inferior', 'inferior gemellus'],
  'quadratus_femoris': ['quadratus femoris'],
  
  // 大腿前侧
  'quadriceps': ['quadriceps femoris'],
  'quadriceps_femoris': ['quadriceps femoris'],
  'rectus_femoris': ['rectus femoris'],
  'vastus_lateralis': ['vastus lateralis'],
  'vastus_medialis': ['vastus medialis'],
  'vastus_intermedius': ['vastus intermedius'],
  'sartorius': ['sartorius'],
  
  // 大腿后侧
  'hamstrings': ['hamstring'],
  'biceps_femoris': ['biceps femoris'],
  'long_head_of_biceps_femoris': ['long head of biceps femoris'],
  'short_head_of_biceps_femoris': ['short head of biceps femoris'],
  'semitendinosus': ['semitendinosus'],
  'semimembranosus': ['semimembranosus'],
  
  // 大腿内侧
  'adductors': ['adductor'],
  'adductor_magnus': ['adductor magnus'],
  'adductor_longus': ['adductor longus'],
  'adductor_brevis': ['adductor brevis'],
  'gracilis': ['gracilis'],
  'pectineus': ['pectineus'],
  
  // 小腿
  'gastrocnemius': ['gastrocnemius'],
  'lateral_head_of_gastrocnemius': ['lateral head of gastrocnemius'],
  'medial_head_of_gastrocnemius': ['medial head of gastrocnemius'],
  'soleus': ['soleus'],
  'plantaris': ['plantaris'],
  'popliteus': ['popliteus'],
  'tibialis_posterior': ['tibialis posterior'],
  'flexor_digitorum_longus': ['flexor digitorum longus'],
  'flexor_hallucis_longus': ['flexor hallucis longus'],
  'tibialis_anterior': ['tibialis anterior'],
  'extensor_digitorum_longus': ['extensor digitorum longus'],
  'extensor_hallucis_longus': ['extensor hallucis longus'],
  'peroneus_longus': ['peroneus longus', 'fibularis longus'],
  'fibularis_longus': ['fibularis longus', 'peroneus longus'],
  'peroneus_brevis': ['peroneus brevis', 'fibularis brevis'],
  'fibularis_brevis': ['fibularis brevis', 'peroneus brevis'],
  'peroneus_tertius': ['peroneus tertius', 'fibularis tertius'],
  'fibularis_tertius': ['fibularis tertius', 'peroneus tertius'],
};

// 根据 Z-Anatomy 模型名称获取肌肉 ID
export function getMuscleIdFromModelName(modelName: string): string | undefined {
  // 清理名称：移除后缀 (.l, .r 等) 并转小写
  const cleanName = modelName
    .replace(/\.(l|r|el|er|ol|or|e\d+l|e\d+r|o\d+l|o\d+r)$/i, '')
    .toLowerCase()
    .trim();
  
  // 转换为下划线格式用于直接匹配
  const normalizedId = cleanName.replace(/[\s-]/g, '_');
  
  // 直接匹配 muscleData
  const directMatch = muscleData.find(m => m.id === normalizedId);
  if (directMatch) return directMatch.id;
  
  // 通过别名匹配
  for (const [muscleId, aliases] of Object.entries(muscleAliases)) {
    if (aliases.some(alias => cleanName.includes(alias) || alias.includes(cleanName))) {
      return muscleId;
    }
  }
  
  // 部分匹配
  const partialMatch = muscleData.find(m => 
    normalizedId.includes(m.id) || m.id.includes(normalizedId)
  );
  if (partialMatch) return partialMatch.id;
  
  return undefined;
}

// 根据 ID 获取肌肉信息
export function getMuscleById(id: string): MuscleInfo | undefined {
  return muscleData.find(m => m.id === id);
}

// 按分组获取肌肉
export function getMusclesByGroup(group: 'upper' | 'torso' | 'lower'): MuscleInfo[] {
  return muscleData.filter(m => m.group === group);
}
