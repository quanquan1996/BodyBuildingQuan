// 3D Muscle Anatomy - English Translation

// Import modular muscle details
import { muscleDetailsUpper } from './muscle-details-upper';
import { muscleDetailsTorso } from './muscle-details-torso';
import { muscleDetailsLower } from './muscle-details-lower';

export const muscleAnatomy = {
  title: '3D Muscle Anatomy',
  description: 'Interactive 3D human muscle anatomy viewer. Click to see muscle names.',
  betaBadge: 'Beta',
  betaNotice: 'This feature is in beta. Some muscles may not be clickable. Use the search box above to find muscles directly for a better experience!',
  metaDescription: 'Free online 3D human muscle anatomy viewer. Interactive display of human muscle structure, click to view muscle names, supports rotation and zoom. Perfect for fitness enthusiasts learning muscle anatomy.',
  controls: {
    frontView: 'Front',
    backView: 'Back',
    reset: 'Reset View',
    superficialLayer: 'Superficial',
    deepLayer: 'Deep',
  },
  search: {
    placeholder: 'Search muscle name...',
    noResults: 'No matching muscles found',
  },
  loading: 'Loading 3D model...',
  webglError: 'Your browser does not support WebGL. Please use a modern browser like Chrome, Firefox, or Edge.',
  clickToView: 'Click a muscle to see its name',
  selectedMuscle: 'Selected Muscle',
  muscleGroups: {
    upper: 'Upper Body',
    torso: 'Torso',
    lower: 'Lower Body',
  },
  // Detail Panel
  detailPanel: {
    tabs: {
      overview: 'Info',
      functions: 'Role',
      exercises: 'Train',
      strengthening: 'Tips',
    },
    strengthening: {
      strategyTitle: 'Strategy',
      keyPointsTitle: 'Key Points',
      recommendedTitle: 'High Activation Exercises',
    },
    placeholder: 'Content coming soon',
    close: 'Close',
  },
  explanation: {
    title: 'About 3D Muscle Anatomy',
    whatIs: 'What is Muscle Anatomy?',
    whatIsContent: 'Muscle anatomy is the study of the structure of the human muscular system. Understanding the location, shape, and function of muscles is essential for fitness training, sports rehabilitation, and medical research. Through 3D visualization, you can intuitively understand the distribution and layered relationships of over 600 muscles in the human body.',
    benefits: 'Benefits of Learning Muscle Anatomy',
    benefitsList: [
      'Precisely target muscle groups to improve training efficiency',
      'Understand muscle synergy to optimize movement patterns',
      'Prevent sports injuries with scientifically planned training',
      'Deepen understanding of body structure and improve fitness knowledge',
    ],
    howToUse: 'How to Use',
    howToUseList: [
      'Drag to rotate the model and view from different angles',
      'Scroll to zoom in and out',
      'Click on a muscle to see its name in both languages',
      'Use the buttons above to quickly switch between front and back views',
    ],
  },
  // Muscle name translations
  muscles: {
    // === Upper Body ===
    // Deltoid
    deltoid_anterior: 'Anterior Deltoid',
    deltoid_lateral: 'Lateral Deltoid',
    deltoid_posterior: 'Posterior Deltoid',
    clavicular_part_of_deltoid: 'Clavicular Part of Deltoid',
    acromial_part_of_deltoid: 'Acromial Part of Deltoid',
    scapular_spinal_part_of_deltoid: 'Scapular Spinal Part of Deltoid',
    
    // Upper Arm
    biceps: 'Biceps Brachii',
    biceps_brachii: 'Biceps Brachii',
    long_head_of_biceps_brachii: 'Long Head of Biceps Brachii',
    short_head_of_biceps_brachii: 'Short Head of Biceps Brachii',
    triceps: 'Triceps Brachii',
    triceps_brachii: 'Triceps Brachii',
    long_head_of_triceps_brachii: 'Long Head of Triceps Brachii',
    lateral_head_of_triceps_brachii: 'Lateral Head of Triceps Brachii',
    medial_head_of_triceps_brachii: 'Medial Head of Triceps Brachii',
    brachialis: 'Brachialis',
    coracobrachialis: 'Coracobrachialis',
    anconeus: 'Anconeus',
    
    // Forearm
    forearm_flexors: 'Forearm Flexors',
    forearm_extensors: 'Forearm Extensors',
    flexor_carpi_radialis: 'Flexor Carpi Radialis',
    flexor_carpi_ulnaris: 'Flexor Carpi Ulnaris',
    flexor_digitorum_superficialis: 'Flexor Digitorum Superficialis',
    flexor_digitorum_profundus: 'Flexor Digitorum Profundus',
    palmaris_longus: 'Palmaris Longus',
    extensor_carpi_radialis_longus: 'Extensor Carpi Radialis Longus',
    extensor_carpi_radialis_brevis: 'Extensor Carpi Radialis Brevis',
    extensor_carpi_ulnaris: 'Extensor Carpi Ulnaris',
    extensor_digitorum: 'Extensor Digitorum',
    pronator_teres: 'Pronator Teres',
    pronator_quadratus: 'Pronator Quadratus',
    supinator: 'Supinator',
    brachioradialis: 'Brachioradialis',
    
    // Hand
    abductor_pollicis_brevis: 'Abductor Pollicis Brevis',
    abductor_pollicis_longus: 'Abductor Pollicis Longus',
    adductor_pollicis: 'Adductor Pollicis',
    opponens_pollicis: 'Opponens Pollicis',
    flexor_pollicis_brevis: 'Flexor Pollicis Brevis',
    flexor_pollicis_longus: 'Flexor Pollicis Longus',
    abductor_digiti_minimi: 'Abductor Digiti Minimi',
    flexor_digiti_minimi_brevis: 'Flexor Digiti Minimi Brevis',
    opponens_digiti_minimi: 'Opponens Digiti Minimi',
    lumbricals: 'Lumbricals',
    interossei: 'Interossei',
    palmar_interossei: 'Palmar Interossei',
    dorsal_interossei: 'Dorsal Interossei',

    // === Torso ===
    // Chest
    pectoralis_major: 'Pectoralis Major',
    sternocostal_head_of_pectoralis_major: 'Sternocostal Head of Pectoralis Major',
    clavicular_head_of_pectoralis_major: 'Clavicular Head of Pectoralis Major',
    abdominal_part_of_pectoralis_major: 'Abdominal Part of Pectoralis Major',
    pectoralis_minor: 'Pectoralis Minor',
    serratus_anterior: 'Serratus Anterior',
    subclavius: 'Subclavius',
    intercostal_muscles: 'Intercostal Muscles',
    external_intercostal: 'External Intercostal',
    internal_intercostal: 'Internal Intercostal',
    
    // Back
    latissimus_dorsi: 'Latissimus Dorsi',
    trapezius: 'Trapezius',
    descending_part_of_trapezius: 'Descending Part of Trapezius (Upper)',
    transverse_part_of_trapezius: 'Transverse Part of Trapezius (Middle)',
    ascending_part_of_trapezius: 'Ascending Part of Trapezius (Lower)',
    rhomboids: 'Rhomboids',
    rhomboid_major: 'Rhomboid Major',
    rhomboid_minor: 'Rhomboid Minor',
    levator_scapulae: 'Levator Scapulae',
    
    // Rotator Cuff
    teres_major: 'Teres Major',
    teres_minor: 'Teres Minor',
    infraspinatus: 'Infraspinatus',
    supraspinatus: 'Supraspinatus',
    subscapularis: 'Subscapularis',
    
    // Spinal Muscles
    erector_spinae: 'Erector Spinae',
    iliocostalis: 'Iliocostalis',
    longissimus: 'Longissimus',
    spinalis: 'Spinalis',
    multifidus: 'Multifidus',
    rotatores: 'Rotatores',
    semispinalis: 'Semispinalis',
    quadratus_lumborum: 'Quadratus Lumborum',
    
    // Abdomen
    rectus_abdominis: 'Rectus Abdominis',
    external_oblique: 'External Oblique',
    external_abdominal_oblique: 'External Abdominal Oblique',
    internal_oblique: 'Internal Oblique',
    internal_abdominal_oblique: 'Internal Abdominal Oblique',
    transverse_abdominis: 'Transverse Abdominis',
    transversus_abdominis: 'Transversus Abdominis',
    pyramidalis: 'Pyramidalis',
    
    // Neck
    sternocleidomastoid: 'Sternocleidomastoid',
    scalene_muscles: 'Scalene Muscles',
    scalenus_anterior: 'Scalenus Anterior',
    scalenus_medius: 'Scalenus Medius',
    scalenus_posterior: 'Scalenus Posterior',
    longus_colli: 'Longus Colli',
    longus_capitis: 'Longus Capitis',
    platysma: 'Platysma',
    
    // Hyoid Muscles
    omohyoid: 'Omohyoid',
    sternohyoid: 'Sternohyoid',
    thyrohyoid: 'Thyrohyoid',
    digastric: 'Digastric',
    mylohyoid: 'Mylohyoid',
    geniohyoid: 'Geniohyoid',
    stylohyoid: 'Stylohyoid',
    
    // Face
    masseter: 'Masseter',
    temporalis: 'Temporalis',
    lateral_pterygoid: 'Lateral Pterygoid',
    medial_pterygoid: 'Medial Pterygoid',
    orbicularis_oculi: 'Orbicularis Oculi',
    orbicularis_oris: 'Orbicularis Oris',
    zygomaticus_major: 'Zygomaticus Major',
    zygomaticus_minor: 'Zygomaticus Minor',
    frontalis: 'Frontalis',
    occipitalis: 'Occipitalis',
    nasalis: 'Nasalis',
    mentalis: 'Mentalis',
    risorius: 'Risorius',
    procerus: 'Procerus',
    buccinator: 'Buccinator',
    levator_labii_superioris: 'Levator Labii Superioris',
    depressor_labii_inferioris: 'Depressor Labii Inferioris',
    depressor_anguli_oris: 'Depressor Anguli Oris',
    
    // === Lower Body ===
    // Gluteal
    gluteus_maximus: 'Gluteus Maximus',
    gluteus_medius: 'Gluteus Medius',
    gluteus_minimus: 'Gluteus Minimus',
    tensor_fasciae_latae: 'Tensor Fasciae Latae',
    piriformis: 'Piriformis',
    
    // Deep Hip
    iliopsoas: 'Iliopsoas',
    iliacus: 'Iliacus',
    psoas_major: 'Psoas Major',
    psoas_minor: 'Psoas Minor',
    obturator_internus: 'Obturator Internus',
    obturator_externus: 'Obturator Externus',
    gemellus_superior: 'Gemellus Superior',
    gemellus_inferior: 'Gemellus Inferior',
    quadratus_femoris: 'Quadratus Femoris',
    
    // Anterior Thigh
    quadriceps: 'Quadriceps',
    quadriceps_femoris: 'Quadriceps Femoris',
    rectus_femoris: 'Rectus Femoris',
    vastus_lateralis: 'Vastus Lateralis',
    vastus_medialis: 'Vastus Medialis',
    vastus_intermedius: 'Vastus Intermedius',
    sartorius: 'Sartorius',
    
    // Posterior Thigh (Hamstrings)
    hamstrings: 'Hamstrings',
    biceps_femoris: 'Biceps Femoris',
    long_head_of_biceps_femoris: 'Long Head of Biceps Femoris',
    short_head_of_biceps_femoris: 'Short Head of Biceps Femoris',
    semitendinosus: 'Semitendinosus',
    semimembranosus: 'Semimembranosus',
    
    // Medial Thigh (Adductors)
    adductors: 'Adductors',
    adductor_magnus: 'Adductor Magnus',
    adductor_longus: 'Adductor Longus',
    adductor_brevis: 'Adductor Brevis',
    gracilis: 'Gracilis',
    pectineus: 'Pectineus',
    
    // Posterior Leg
    gastrocnemius: 'Gastrocnemius',
    lateral_head_of_gastrocnemius: 'Lateral Head of Gastrocnemius',
    medial_head_of_gastrocnemius: 'Medial Head of Gastrocnemius',
    soleus: 'Soleus',
    plantaris: 'Plantaris',
    popliteus: 'Popliteus',
    tibialis_posterior: 'Tibialis Posterior',
    flexor_digitorum_longus: 'Flexor Digitorum Longus',
    flexor_hallucis_longus: 'Flexor Hallucis Longus',
    
    // Anterior and Lateral Leg
    tibialis_anterior: 'Tibialis Anterior',
    extensor_digitorum_longus: 'Extensor Digitorum Longus',
    extensor_hallucis_longus: 'Extensor Hallucis Longus',
    peroneus_longus: 'Peroneus Longus',
    fibularis_longus: 'Fibularis Longus',
    peroneus_brevis: 'Peroneus Brevis',
    fibularis_brevis: 'Fibularis Brevis',
    peroneus_tertius: 'Peroneus Tertius',
    fibularis_tertius: 'Fibularis Tertius',
    
    // Foot
    extensor_digitorum_brevis: 'Extensor Digitorum Brevis',
    extensor_hallucis_brevis: 'Extensor Hallucis Brevis',
    abductor_hallucis: 'Abductor Hallucis',
    flexor_digitorum_brevis: 'Flexor Digitorum Brevis',
    flexor_hallucis_brevis: 'Flexor Hallucis Brevis',
    quadratus_plantae: 'Quadratus Plantae',
    foot_lumbricals: 'Foot Lumbricals',
    foot_interossei: 'Foot Interossei',
    plantar_interossei: 'Plantar Interossei',
    dorsal_interossei_foot: 'Dorsal Interossei (Foot)',
    adductor_hallucis: 'Adductor Hallucis',
    abductor_digiti_minimi_foot: 'Abductor Digiti Minimi (Foot)',
    flexor_digiti_minimi_brevis_foot: 'Flexor Digiti Minimi Brevis (Foot)',
  },
  // Muscle Details (Overview, Functions, Exercises) - imported from modules
  muscleDetails: {
    ...muscleDetailsUpper,
    ...muscleDetailsTorso,
    ...muscleDetailsLower,
  },
};
