// Torso Muscle Details - English Translation
// Includes: Chest, Back, Abdomen, Neck, Face muscles

import type { MuscleDetail } from './muscle-details-upper';

export const muscleDetailsTorso: Record<string, MuscleDetail> = {
  // ============================================
  // Chest Muscles
  // ============================================
  pectoralis_major: {
    description: 'The pectoralis major is the largest muscle of the chest, fan-shaped and covering the front of the rib cage. It originates from the clavicle, sternum, and upper six costal cartilages, inserting into the humerus. It is one of the most trained muscles in fitness.',
    functions: [
      'Adducts the arm at the shoulder (brings arm toward midline)',
      'Flexes the arm at the shoulder (raises arm forward)',
      'Medially rotates the arm at the shoulder',
    ],
    exercises: [
      'Bench Press (Barbell/Dumbbell)',
      'Incline Bench Press',
      'Decline Bench Press',
      'Chest Fly',
      'Push-ups',
      'Cable Crossover',
    ],
    strengthening: {
      strategy: 'Chest strengthening requires distinguishing between upper chest (clavicular) and mid-lower chest (sternocostal) weakness. Upper chest is usually the weak point, increase incline movement ratio. Key is building good mind-muscle connection.',
      keyPoints: [
        'Weak upper chest: increase incline movements to 50% of total volume',
        'Weak mid-lower chest: increase flat and decline movements',
        'Pre-exhaust with isolation before compound movements',
        '16-22 total sets per week',
      ],
      recommendedExercises: [
        { name: 'Low Cable Crossover', reason: 'Low-to-high trajectory maximizes upper chest activation, EMG research confirms significant effect' },
        { name: 'Incline Dumbbell Press (30°)', reason: '30 degree angle shows highest upper chest activation, over 45° involves too much anterior delt' },
        { name: 'Feet-Elevated Push-ups', reason: 'Bodyweight movement, can train frequently, high upper chest activation' },
      ],
    },
  },
  clavicular_head_of_pectoralis_major: {
    description: 'The clavicular head (upper chest) of the pectoralis major originates from the medial half of the clavicle. Well-developed upper chest creates a fuller chest appearance.',
    functions: [
      'Flexes the arm at the shoulder',
      'Adducts the arm at the shoulder',
      'Medially rotates the arm at the shoulder',
    ],
    exercises: [
      'Incline Bench Press',
      'Incline Fly',
      'Low Cable Crossover',
      'Incline Push-ups',
    ],
    strengthening: {
      strategy: 'Upper chest is most people\'s weak point. Key is using correct angle (around 30 degrees) and low-to-high movement trajectory. Avoid excessive angle causing anterior delt compensation.',
      keyPoints: [
        'Control incline angle around 30 degrees',
        'Cable pulls from low to high',
        'Focus on contraction feel below clavicle',
        'Can train upper chest specifically 2-3 times per week',
      ],
      recommendedExercises: [
        { name: 'Low Cable Crossover', reason: 'Low-to-high trajectory, constant tension, highest upper chest activation' },
        { name: 'Reverse-Grip Incline Press', reason: 'Reverse grip increases upper chest involvement, reduces anterior delt compensation' },
        { name: 'Incline Dumbbell Fly', reason: 'Strong stretch position stimulus, significant effect with proper angle' },
      ],
    },
  },
  sternocostal_head_of_pectoralis_major: {
    description: 'The sternocostal head (mid and lower chest) of the pectoralis major originates from the sternum and upper six costal cartilages. It comprises the majority of the pectoralis major volume.',
    functions: [
      'Adducts the arm at the shoulder',
      'Medially rotates the arm at the shoulder',
      'Extends the arm from a flexed position',
    ],
    exercises: [
      'Flat Bench Press',
      'Decline Bench Press',
      'Flat Fly',
      'High Cable Crossover',
    ],
    strengthening: {
      strategy: 'Mid-lower chest usually gets enough stimulation from flat bench press. If strengthening needed, increase decline movements and high cable crossover.',
      keyPoints: [
        'Decline angle of 15-30 degrees is sufficient',
        'High cable pulls from high to low',
        'Dips with forward lean emphasizes lower chest',
        'Watch shoulder health, avoid excessive depression',
      ],
      recommendedExercises: [
        { name: 'High Cable Crossover', reason: 'High-to-low trajectory emphasizes mid-lower chest, constant tension throughout' },
        { name: 'Dips', reason: 'Extremely high lower chest activation when leaning forward' },
        { name: 'Decline Dumbbell Press', reason: 'Increases lower chest stretch and contraction range' },
      ],
    },
  },
  abdominal_part_of_pectoralis_major: {
    description: 'The abdominal part of the pectoralis major is the lowest portion, originating from the rectus sheath. It significantly affects the lower chest line.',
    functions: [
      'Adducts the arm at the shoulder',
      'Medially rotates the arm at the shoulder',
      'Extends the arm from a flexed position',
    ],
    exercises: [
      'Decline Bench Press',
      'High Cable Crossover',
      'Dips',
      'Decline Fly',
    ],
  },
  pectoralis_minor: {
    description: 'The pectoralis minor lies deep to the pectoralis major, originating from ribs 3-5 and inserting into the coracoid process of the scapula. It is important for scapular stability.',
    functions: [
      'Depresses the scapula',
      'Tilts the scapula anteriorly',
      'Assists in elevating the ribs during deep breathing',
    ],
    exercises: [
      'Dips',
      'Scapular Depression Exercises',
      'Push-up Plus',
      'Chest Stretches',
    ],
  },
  serratus_anterior: {
    description: 'The serratus anterior is located on the lateral chest wall, originating from the outer surfaces of ribs 1-8/9 and inserting into the medial border of the scapula. Well-developed serratus creates a distinctive "serrated" appearance.',
    functions: [
      'Protracts the scapula (pulls it forward)',
      'Upwardly rotates the scapula',
      'Holds the scapula against the thorax',
    ],
    exercises: [
      'Push-up Plus',
      'Serratus Press',
      'Ab Wheel Rollout',
      'Plank',
    ],
  },
  subclavius: {
    description: 'The subclavius is a small muscle located beneath the clavicle, originating from the 1st rib and inserting into the inferior surface of the clavicle. It protects the subclavian vessels and nerves.',
    functions: [
      'Depresses the clavicle',
      'Stabilizes the sternoclavicular joint',
      'Protects subclavian vessels and nerves',
    ],
    exercises: [
      'Shoulder Stability Training',
      'Chest Stretches',
    ],
  },
  intercostal_muscles: {
    description: 'The intercostal muscles are located between the ribs, divided into external and internal intercostals. They are the primary accessory muscles of respiration.',
    functions: [
      'External intercostals: elevate the ribs, assist in inspiration',
      'Internal intercostals: depress the ribs, assist in expiration',
    ],
    exercises: [
      'Deep Breathing Training',
      'Side Bend Stretches',
      'Breathing Control Training',
    ],
  },
  external_intercostal: {
    description: 'The external intercostals are located in the superficial layer of the intercostal spaces, with fibers running obliquely forward and downward. They are the primary accessory muscles of inspiration.',
    functions: [
      'Elevate the ribs',
      'Expand the thoracic cavity',
      'Assist in inspiration',
    ],
    exercises: [
      'Deep Breathing Training',
      'Thoracic Expansion Training',
      'Aerobic Exercise',
    ],
  },
  internal_intercostal: {
    description: 'The internal intercostals are located deep to the external intercostals, with fibers running obliquely backward and downward. They are accessory muscles of forced expiration.',
    functions: [
      'Depress the ribs',
      'Reduce the thoracic cavity',
      'Assist in forced expiration',
    ],
    exercises: [
      'Expiration Training',
      'Core Stability Training',
      'Diaphragmatic Breathing',
    ],
  },

  // ============================================
  // Back Muscles
  // ============================================
  latissimus_dorsi: {
    description: 'The latissimus dorsi is the widest muscle in the human body, located in the lower back, triangular in shape. It originates from the lower thoracic vertebrae, lumbar vertebrae, sacrum, and iliac crest, inserting into the humerus. Well-developed lats create the V-taper physique.',
    functions: [
      'Adducts the arm at the shoulder',
      'Extends the arm at the shoulder (pulls arm backward)',
      'Medially rotates the arm at the shoulder',
    ],
    exercises: [
      'Pull-ups',
      'Lat Pulldown',
      'Barbell Row',
      'Dumbbell Row',
      'Seated Cable Row',
      'Straight-Arm Pulldown',
    ],
    strengthening: {
      strategy: 'Lat strengthening key is building mind-muscle connection, learning to "pull with back" not "pull with arms". Use appropriate grip width and angle, focus on scapular depression and retraction.',
      keyPoints: [
        'Start with straight-arm pulldown to establish lat feel',
        'During pull-ups/pulldowns, think "elbows down and back"',
        'Depress scapulae first before pulling',
        '15-20 total sets per week',
      ],
      recommendedExercises: [
        { name: 'Straight-Arm Pulldown', reason: 'Isolates lats, best exercise for building mind-muscle connection' },
        { name: 'Single-Arm Dumbbell Row', reason: 'Unilateral training corrects imbalances, easier to feel lat contraction' },
        { name: 'Close-Grip Lat Pulldown', reason: 'Close grip increases lat involvement, reduces teres major compensation' },
      ],
    },
  },
  trapezius: {
    description: 'The trapezius is a large muscle in the upper back, diamond-shaped, extending from the occipital bone to the lower thoracic vertebrae. It is divided into upper, middle, and lower portions, each with different functions.',
    functions: [
      'Upper: Elevates the scapula (shrugging)',
      'Middle: Retracts the scapula (squeezing shoulder blades)',
      'Lower: Depresses the scapula',
    ],
    exercises: [
      'Shrugs',
      'Barbell Row',
      'Face Pull',
      'Farmer\'s Walk',
      'Y-Raise',
    ],
    strengthening: {
      strategy: 'The three trap portions need different training strategies. Upper traps are usually overdeveloped, mid and lower traps are common weak points. Reduce shrugs, increase face pulls and Y-raises.',
      keyPoints: [
        'Upper traps too strong: reduce shrug movements',
        'Weak mid traps: increase face pulls and rows',
        'Weak lower traps: increase Y-raises',
        'Focus on full scapular range of motion',
      ],
      recommendedExercises: [
        { name: 'Face Pull', reason: 'Trains mid traps and rear delts simultaneously, improves shoulder health' },
        { name: 'Prone Y-Raise', reason: 'Isolates lower traps, most people\'s weak point' },
        { name: 'Wide-Grip Bent-Over Row', reason: 'Wide grip increases mid trap involvement' },
      ],
    },
  },
  descending_part_of_trapezius: {
    description: 'The upper trapezius (descending part) originates from the occipital bone and cervical spinous processes, inserting into the lateral clavicle and acromion. It forms the "trap mountain" appearance.',
    functions: [
      'Elevates the scapula (shrugging)',
      'Upwardly rotates the scapula',
      'Extends and laterally flexes the head',
    ],
    exercises: [
      'Shrugs',
      'Barbell Shrug',
      'Dumbbell Shrug',
      'Farmer\'s Walk',
    ],
    strengthening: {
      strategy: 'Upper traps usually don\'t need dedicated strengthening, often overdeveloped. If truly needed, use heavy shrugs and farmer\'s walks.',
      keyPoints: [
        'Heavy weight, low reps work well',
        'Pause at peak contraction for 2 seconds',
        'Avoid rotating shoulders',
        'Farmer\'s walk is top functional training choice',
      ],
      recommendedExercises: [
        { name: 'Barbell Shrug', reason: 'Can use heavy weight, high upper trap activation' },
        { name: 'Farmer\'s Walk', reason: 'Functional training, trains grip and core simultaneously' },
        { name: 'Dumbbell Shrug', reason: 'Greater range of motion, better contraction at peak' },
      ],
    },
  },
  transverse_part_of_trapezius: {
    description: 'The middle trapezius (transverse part) originates from the upper thoracic spinous processes, with fibers running horizontally to insert into the acromion and scapular spine. It is responsible for scapular retraction.',
    functions: [
      'Retracts the scapula (squeezes shoulder blades)',
      'Stabilizes the scapula',
    ],
    exercises: [
      'Seated Cable Row',
      'Bent-Over Row',
      'Face Pull',
      'T-Bar Row',
    ],
    strengthening: {
      strategy: 'Mid traps are a common weak point, causing rounded shoulders and scapular instability. Key is focusing on scapular retraction during rows, not just pulling weight.',
      keyPoints: [
        'Retract scapulae first before bending elbows during rows',
        'Squeeze shoulder blades for 2 seconds at peak',
        'Use moderate weight, 12-15 reps per set',
        'Face pull is the best isolation exercise',
      ],
      recommendedExercises: [
        { name: 'Face Pull', reason: 'Isolates mid traps and rear delts, improves shoulder posture' },
        { name: 'Wide-Grip Bent-Over Row', reason: 'Wide grip increases mid trap involvement ratio' },
        { name: 'Seated Cable Row', reason: 'Can fully squeeze shoulder blades at peak position' },
      ],
    },
  },
  ascending_part_of_trapezius: {
    description: 'The lower trapezius (ascending part) originates from the lower thoracic spinous processes, with fibers running upward and outward to insert into the medial end of the scapular spine. It is responsible for scapular depression.',
    functions: [
      'Depresses the scapula',
      'Upwardly rotates the scapula',
      'Retracts the scapula',
    ],
    exercises: [
      'Y-Raise',
      'Prone Y-Raise',
      'High Row',
      'Pull-ups',
    ],
    strengthening: {
      strategy: 'Lower traps are the most neglected portion, but crucial for shoulder health and posture. Requires dedicated isolation training like Y-raises.',
      keyPoints: [
        'Prone position eliminates cheating',
        'Arms form Y-shape with body (about 120 degrees)',
        'Use light weight, 15-20 reps per set',
        'Focus on scapular depression feel',
      ],
      recommendedExercises: [
        { name: 'Prone Y-Raise', reason: 'Best exercise for isolating lower traps, eliminates cheating' },
        { name: 'Cable Y-Raise', reason: 'Constant tension, adjustable angle' },
        { name: 'Pull-ups (Focus on Depression)', reason: 'Focus on scapular depression at starting position' },
      ],
    },
  },
  rhomboids: {
    description: 'The rhomboids lie deep to the trapezius, including the rhomboid major and minor. They originate from the cervical and thoracic spinous processes and insert into the medial border of the scapula.',
    functions: [
      'Retracts the scapula',
      'Elevates the scapula',
      'Downwardly rotates the scapula',
    ],
    exercises: [
      'Barbell Row',
      'Seated Cable Row',
      'Face Pull',
      'Bent-Over Reverse Fly',
    ],
  },
  rhomboid_major: {
    description: 'The rhomboid major originates from the T2-T5 thoracic spinous processes and inserts into the lower medial border of the scapula. It is the larger of the two rhomboid muscles.',
    functions: [
      'Retracts the scapula',
      'Elevates the scapula',
      'Downwardly rotates the scapula',
    ],
    exercises: [
      'Barbell Row',
      'Seated Cable Row',
      'Face Pull',
      'Bent-Over Reverse Fly',
    ],
  },
  rhomboid_minor: {
    description: 'The rhomboid minor originates from the C7-T1 spinous processes and inserts into the upper medial border of the scapula. It is located above the rhomboid major.',
    functions: [
      'Retracts the scapula',
      'Elevates the scapula',
      'Downwardly rotates the scapula',
    ],
    exercises: [
      'Barbell Row',
      'Seated Cable Row',
      'Face Pull',
      'Bent-Over Reverse Fly',
    ],
  },
  levator_scapulae: {
    description: 'The levator scapulae originates from the C1-C4 cervical transverse processes and inserts into the superior angle of the scapula. It is a common source of neck and shoulder pain.',
    functions: [
      'Elevates the scapula',
      'Downwardly rotates the scapula',
      'Laterally flexes the cervical spine',
    ],
    exercises: [
      'Shrugs',
      'Neck Lateral Flexion Stretch',
      'Scapular Mobility Training',
    ],
  },

  // ============================================
  // Rotator Cuff
  // ============================================
  teres_major: {
    description: 'The teres major originates from the inferior angle of the scapula and inserts into the lesser tubercle crest of the humerus. It works synergistically with the latissimus dorsi and is called "lat\'s little helper."',
    functions: [
      'Adducts the arm at the shoulder',
      'Extends the arm at the shoulder',
      'Medially rotates the arm at the shoulder',
    ],
    exercises: [
      'Pull-ups',
      'Lat Pulldown',
      'Rows',
      'Straight-Arm Pulldown',
    ],
  },
  teres_minor: {
    description: 'The teres minor is one of the rotator cuff muscles, originating from the lateral border of the scapula and inserting into the greater tubercle of the humerus. It is important for shoulder joint stability.',
    functions: [
      'Laterally rotates the arm at the shoulder',
      'Assists in arm adduction',
      'Stabilizes the shoulder joint',
    ],
    exercises: [
      'External Rotation Training',
      'Face Pull',
      'Side-Lying External Rotation',
      'Cable External Rotation',
    ],
  },
  infraspinatus: {
    description: 'The infraspinatus is one of the rotator cuff muscles, located in the infraspinous fossa of the scapula, inserting into the greater tubercle of the humerus. It is the primary muscle for shoulder external rotation.',
    functions: [
      'Laterally rotates the arm at the shoulder',
      'Stabilizes the shoulder joint',
      'Assists in horizontal abduction of the arm',
    ],
    exercises: [
      'External Rotation Training',
      'Face Pull',
      'Side-Lying External Rotation',
      'Cable External Rotation',
    ],
  },
  supraspinatus: {
    description: 'The supraspinatus is one of the rotator cuff muscles, located in the supraspinous fossa of the scapula, inserting into the greater tubercle of the humerus. It is the initiator of shoulder abduction.',
    functions: [
      'Initiates arm abduction (first 15 degrees)',
      'Stabilizes the shoulder joint',
      'Assists in lateral rotation of the arm',
    ],
    exercises: [
      'Empty Can Test Training',
      'Lateral Raise (light weight)',
      'Rotator Cuff Strengthening',
    ],
  },
  subscapularis: {
    description: 'The subscapularis is the largest of the rotator cuff muscles, located on the anterior surface of the scapula (subscapular fossa), inserting into the lesser tubercle of the humerus.',
    functions: [
      'Medially rotates the arm at the shoulder',
      'Stabilizes the shoulder joint',
      'Assists in arm adduction',
    ],
    exercises: [
      'Internal Rotation Training',
      'Cable Internal Rotation',
      'Prone Internal Rotation',
    ],
  },

  // ============================================
  // Spinal Muscles
  // ============================================
  erector_spinae: {
    description: 'The erector spinae is a group of muscles running vertically along both sides of the spine, including the iliocostalis, longissimus, and spinalis. It is the primary muscle for maintaining upright posture.',
    functions: [
      'Extends the spine (straightens the back)',
      'Laterally flexes the spine',
      'Maintains upright posture',
      'Controls trunk flexion',
    ],
    exercises: [
      'Deadlift',
      'Back Extension',
      'Prone Back Extension',
      'Good Morning',
    ],
  },
  iliocostalis: {
    description: 'The iliocostalis is the lateral part of the erector spinae, extending from the sacrum to the cervical vertebrae. It is divided into lumbar, thoracic, and cervical portions.',
    functions: [
      'Extends the spine',
      'Laterally flexes the spine',
      'Maintains posture',
    ],
    exercises: [
      'Deadlift',
      'Back Extension',
      'Side Bend',
      'Good Morning',
    ],
  },
  longissimus: {
    description: 'The longissimus is the middle part of the erector spinae and the longest of the three muscles. It extends from the sacrum to the mastoid process of the temporal bone.',
    functions: [
      'Extends the spine',
      'Laterally flexes the spine',
      'Extends and rotates the head',
    ],
    exercises: [
      'Deadlift',
      'Back Extension',
      'Prone Back Extension',
      'Good Morning',
    ],
  },
  spinalis: {
    description: 'The spinalis is the medial part of the erector spinae, located alongside the spinous processes. It is the smallest of the three muscles.',
    functions: [
      'Extends the spine',
      'Laterally flexes the spine',
    ],
    exercises: [
      'Deadlift',
      'Back Extension',
      'Prone Back Extension',
    ],
  },
  multifidus: {
    description: 'The multifidus is a deep spinal stabilizer muscle distributed along the entire spine. It is crucial for segmental spinal stability.',
    functions: [
      'Stabilizes individual spinal segments',
      'Extends the spine',
      'Rotates the spine',
    ],
    exercises: [
      'Bird Dog',
      'Dead Bug',
      'Plank',
      'Spinal Stability Training',
    ],
  },
  rotatores: {
    description: 'The rotatores are the deepest spinal muscles, connecting adjacent vertebrae. Their primary function is proprioception and spinal stability.',
    functions: [
      'Rotates the spine',
      'Stabilizes the spine',
      'Provides proprioceptive feedback',
    ],
    exercises: [
      'Spinal Rotation Training',
      'Core Stability Training',
      'Bird Dog',
    ],
  },
  semispinalis: {
    description: 'The semispinalis lies superficial to the multifidus, divided into semispinalis capitis, cervicis, and thoracis.',
    functions: [
      'Extends the spine and head',
      'Rotates the spine',
      'Laterally flexes the spine',
    ],
    exercises: [
      'Neck Extension Training',
      'Back Extension',
      'Prone Back Extension',
    ],
  },
  quadratus_lumborum: {
    description: 'The quadratus lumborum is located deep in the lumbar region, originating from the iliac crest and inserting into the 12th rib and lumbar transverse processes. It is a common source of low back pain.',
    functions: [
      'Laterally flexes the trunk',
      'Fixes the 12th rib to assist breathing',
      'Extends the lumbar spine',
    ],
    exercises: [
      'Side Plank',
      'Side Bend',
      'Farmer\'s Walk (unilateral)',
      'Quadratus Lumborum Stretch',
    ],
  },


  // ============================================
  // Abdomen Muscles
  // ============================================
  rectus_abdominis: {
    description: 'The rectus abdominis is located at the front of the abdomen, the main muscle forming the "six-pack." It originates from the pubic symphysis and pubic crest, inserting into the 5th-7th costal cartilages and xiphoid process.',
    functions: [
      'Flexes the spine (crunching motion)',
      'Compresses the abdominal cavity',
      'Assists in exhalation',
    ],
    exercises: [
      'Crunches',
      'Sit-ups',
      'Hanging Leg Raise',
      'Plank',
      'Cable Crunch',
    ],
  },
  external_oblique: {
    description: 'The external oblique is located on the lateral abdomen, the most superficial of the oblique muscles. Its fibers run diagonally from upper-outer to lower-inner, creating the "V" line.',
    functions: [
      'Laterally flexes the trunk to the same side',
      'Rotates the trunk to the opposite side',
      'Assists in trunk flexion',
      'Compresses the abdominal cavity',
    ],
    exercises: [
      'Side Crunch',
      'Russian Twist',
      'Hanging Oblique Raise',
      'Cable Woodchop',
    ],
  },
  external_abdominal_oblique: {
    description: 'The external abdominal oblique is located on the lateral abdomen, the most superficial of the oblique muscles. Its fibers run diagonally from upper-outer to lower-inner, creating the "V" line.',
    functions: [
      'Laterally flexes the trunk to the same side',
      'Rotates the trunk to the opposite side',
      'Assists in trunk flexion',
      'Compresses the abdominal cavity',
    ],
    exercises: [
      'Side Crunch',
      'Russian Twist',
      'Hanging Oblique Raise',
      'Cable Woodchop',
    ],
  },
  internal_oblique: {
    description: 'The internal oblique lies deep to the external oblique, with fibers running in the opposite direction (from lower-outer to upper-inner). It works synergistically with the external oblique.',
    functions: [
      'Laterally flexes the trunk to the same side',
      'Rotates the trunk to the same side',
      'Assists in trunk flexion',
      'Compresses the abdominal cavity',
    ],
    exercises: [
      'Side Crunch',
      'Russian Twist',
      'Side Plank',
      'Cable Woodchop',
    ],
  },
  internal_abdominal_oblique: {
    description: 'The internal abdominal oblique lies deep to the external oblique, with fibers running in the opposite direction (from lower-outer to upper-inner). It works synergistically with the external oblique.',
    functions: [
      'Laterally flexes the trunk to the same side',
      'Rotates the trunk to the same side',
      'Assists in trunk flexion',
      'Compresses the abdominal cavity',
    ],
    exercises: [
      'Side Crunch',
      'Russian Twist',
      'Side Plank',
      'Cable Woodchop',
    ],
  },
  transverse_abdominis: {
    description: 'The transverse abdominis is the deepest abdominal muscle, with fibers running horizontally like a natural "corset" around the abdomen. It is crucial for core stability.',
    functions: [
      'Compresses the abdominal cavity',
      'Stabilizes the spine and pelvis',
      'Assists in exhalation',
      'Supports the internal organs',
    ],
    exercises: [
      'Stomach Vacuum',
      'Plank',
      'Dead Bug',
      'Diaphragmatic Breathing',
    ],
  },
  transversus_abdominis: {
    description: 'The transversus abdominis is the deepest abdominal muscle, with fibers running horizontally like a natural "corset" around the abdomen. It is crucial for core stability.',
    functions: [
      'Compresses the abdominal cavity',
      'Stabilizes the spine and pelvis',
      'Assists in exhalation',
      'Supports the internal organs',
    ],
    exercises: [
      'Stomach Vacuum',
      'Plank',
      'Dead Bug',
      'Diaphragmatic Breathing',
    ],
  },
  pyramidalis: {
    description: 'The pyramidalis is a small triangular muscle located in front of the lower rectus abdominis, originating from the pubis and inserting into the linea alba. About 20% of people lack this muscle.',
    functions: [
      'Tenses the linea alba',
    ],
    exercises: [
      'Lower Ab Training',
      'Crunches',
    ],
  },

  // ============================================
  // Neck Muscles
  // ============================================
  sternocleidomastoid: {
    description: 'The sternocleidomastoid is the most prominent muscle of the neck, originating from the sternum and clavicle, inserting into the mastoid process of the temporal bone. Bilateral contraction flexes the head forward, unilateral contraction turns the head to the opposite side.',
    functions: [
      'Unilateral: turns head to opposite side, lateral flexion to same side',
      'Bilateral: flexes the cervical spine',
      'Assists in inspiration (when head is fixed)',
    ],
    exercises: [
      'Neck Flexion Training',
      'Neck Rotation Training',
      'Neck Lateral Flexion Training',
      'Neck Stretches',
    ],
  },
  scalene_muscles: {
    description: 'The scalene muscles are located on the lateral neck, including the anterior, middle, and posterior scalenes. They originate from the cervical transverse processes and insert into the 1st-2nd ribs.',
    functions: [
      'Laterally flexes the cervical spine',
      'When fixed, elevates the 1st-2nd ribs to assist inspiration',
      'Assists in cervical flexion',
    ],
    exercises: [
      'Neck Lateral Flexion Training',
      'Deep Breathing Training',
      'Neck Stretches',
    ],
  },
  scalenus_anterior: {
    description: 'The anterior scalene originates from the C3-C6 cervical transverse processes and inserts into the 1st rib. The brachial plexus and subclavian artery pass behind it.',
    functions: [
      'Laterally flexes the cervical spine',
      'Assists in cervical flexion',
      'Elevates the 1st rib',
    ],
    exercises: [
      'Neck Lateral Flexion Training',
      'Deep Breathing Training',
      'Neck Stretches',
    ],
  },
  scalenus_medius: {
    description: 'The middle scalene is the largest of the scalene muscles, originating from the C2-C7 cervical transverse processes and inserting into the 1st rib.',
    functions: [
      'Laterally flexes the cervical spine',
      'Elevates the 1st rib',
    ],
    exercises: [
      'Neck Lateral Flexion Training',
      'Deep Breathing Training',
      'Neck Stretches',
    ],
  },
  scalenus_posterior: {
    description: 'The posterior scalene originates from the C5-C7 cervical transverse processes and inserts into the 2nd rib. It is the smallest of the scalene muscles.',
    functions: [
      'Laterally flexes the cervical spine',
      'Elevates the 2nd rib',
    ],
    exercises: [
      'Neck Lateral Flexion Training',
      'Deep Breathing Training',
      'Neck Stretches',
    ],
  },
  longus_colli: {
    description: 'The longus colli is a deep muscle on the anterior cervical spine, running vertically along the front of the cervical vertebrae. It is important for cervical stability.',
    functions: [
      'Flexes the cervical spine',
      'Stabilizes the cervical spine',
      'Assists in cervical rotation',
    ],
    exercises: [
      'Deep Neck Flexor Training',
      'Chin Tuck Training',
      'Cervical Stability Training',
    ],
  },
  longus_capitis: {
    description: 'The longus capitis originates from the C3-C6 cervical transverse processes and inserts into the basilar part of the occipital bone. It works synergistically with the longus colli.',
    functions: [
      'Flexes the head and cervical spine',
      'Stabilizes the cervical spine',
    ],
    exercises: [
      'Deep Neck Flexor Training',
      'Chin Tuck Training',
      'Cervical Stability Training',
    ],
  },
  platysma: {
    description: 'The platysma is a thin sheet-like muscle covering the anterior neck, originating from the chest and shoulder fascia, inserting into the mandible and facial skin.',
    functions: [
      'Depresses the lower lip and angle of mouth',
      'Tenses the skin of the neck',
      'Assists in opening the mouth',
    ],
    exercises: [
      'Neck Stretches',
      'Facial Expression Training',
    ],
  },

  // ============================================
  // Hyoid Muscles
  // ============================================
  omohyoid: {
    description: 'The omohyoid is a digastric muscle, originating from the superior border of the scapula and inserting into the hyoid bone. It has an intermediate tendon connecting the two bellies.',
    functions: [
      'Depresses the hyoid bone',
      'Stabilizes the hyoid bone',
    ],
    exercises: [
      'Swallowing Training',
      'Voice Training',
    ],
  },
  sternohyoid: {
    description: 'The sternohyoid originates from the manubrium of the sternum and clavicle, inserting into the hyoid bone. It is the most superficial of the infrahyoid muscles.',
    functions: [
      'Depresses the hyoid bone',
    ],
    exercises: [
      'Swallowing Training',
      'Voice Training',
    ],
  },
  thyrohyoid: {
    description: 'The thyrohyoid originates from the thyroid cartilage and inserts into the hyoid bone. It can elevate the larynx or depress the hyoid bone.',
    functions: [
      'Depresses the hyoid bone',
      'Elevates the larynx (when hyoid is fixed)',
    ],
    exercises: [
      'Swallowing Training',
      'Voice Training',
    ],
  },
  digastric: {
    description: 'The digastric has an anterior and posterior belly connected by an intermediate tendon. The anterior belly originates from the mandible, the posterior belly from the mastoid process of the temporal bone, inserting into the hyoid bone.',
    functions: [
      'Depresses the mandible (opens mouth)',
      'Elevates the hyoid bone',
      'Assists in swallowing',
    ],
    exercises: [
      'Mouth Opening Training',
      'Swallowing Training',
    ],
  },
  mylohyoid: {
    description: 'The mylohyoid forms the floor of the mouth, originating from the inner surface of the mandible and inserting into the hyoid bone and midline raphe.',
    functions: [
      'Elevates the hyoid bone and floor of mouth',
      'Assists in swallowing',
      'Depresses the mandible',
    ],
    exercises: [
      'Swallowing Training',
      'Tongue Training',
    ],
  },
  geniohyoid: {
    description: 'The geniohyoid originates from the mental spine of the mandible and inserts into the hyoid bone. It is located above the mylohyoid.',
    functions: [
      'Elevates the hyoid bone',
      'Depresses the mandible',
      'Assists in opening the mouth',
    ],
    exercises: [
      'Swallowing Training',
      'Mouth Opening Training',
    ],
  },
  stylohyoid: {
    description: 'The stylohyoid originates from the styloid process of the temporal bone and inserts into the hyoid bone. It runs parallel to the posterior belly of the digastric.',
    functions: [
      'Elevates and retracts the hyoid bone',
      'Assists in swallowing',
    ],
    exercises: [
      'Swallowing Training',
      'Voice Training',
    ],
  },

  // ============================================
  // Face Muscles
  // ============================================
  masseter: {
    description: 'The masseter is the strongest of the muscles of mastication, originating from the zygomatic arch and inserting into the angle of the mandible. It is the primary muscle for closing the mouth and chewing.',
    functions: [
      'Elevates the mandible (closes mouth)',
      'Chews food',
    ],
    exercises: [
      'Chewing Training',
      'Masseter Massage',
      'Jaw Relaxation Training',
    ],
  },
  temporalis: {
    description: 'The temporalis is a fan-shaped muscle of mastication, originating from the temporal fossa and inserting into the coronoid process of the mandible. It is the primary muscle for closing the mouth and retracting the mandible.',
    functions: [
      'Elevates the mandible (closes mouth)',
      'Retracts the mandible',
      'Chews food',
    ],
    exercises: [
      'Chewing Training',
      'Temporalis Massage',
      'Jaw Relaxation Training',
    ],
  },
  lateral_pterygoid: {
    description: 'The lateral pterygoid is located deep in the infratemporal fossa, originating from the pterygoid plate of the sphenoid and inserting into the condyle of the mandible and articular disc. It is the only muscle of mastication that can open the mouth.',
    functions: [
      'Depresses the mandible (opens mouth)',
      'Protrudes the mandible',
      'Laterally deviates the mandible',
    ],
    exercises: [
      'Mouth Opening Training',
      'Mandible Protrusion Training',
      'Jaw Relaxation Training',
    ],
  },
  medial_pterygoid: {
    description: 'The medial pterygoid is located medial to the lateral pterygoid, originating from the pterygoid plate of the sphenoid and inserting into the inner surface of the angle of the mandible. It works synergistically with the masseter.',
    functions: [
      'Elevates the mandible (closes mouth)',
      'Protrudes the mandible',
      'Laterally deviates the mandible',
    ],
    exercises: [
      'Chewing Training',
      'Jaw Relaxation Training',
    ],
  },
  orbicularis_oculi: {
    description: 'The orbicularis oculi surrounds the orbit, divided into orbital, palpebral, and lacrimal parts. It is responsible for closing the eye and protecting the eyeball.',
    functions: [
      'Closes the eye',
      'Blinks',
      'Assists in tear flow',
    ],
    exercises: [
      'Blinking Training',
      'Eye Relaxation',
    ],
  },
  orbicularis_oris: {
    description: 'The orbicularis oris surrounds the mouth opening and is the primary muscle of the lips. It is responsible for closing the mouth and lip movements.',
    functions: [
      'Closes the mouth',
      'Purses the lips',
      'Assists in speech and eating',
    ],
    exercises: [
      'Lip Training',
      'Speech Training',
    ],
  },
  zygomaticus_major: {
    description: 'The zygomaticus major originates from the zygomatic bone and inserts into the angle of the mouth. It is the primary muscle for smiling.',
    functions: [
      'Elevates the angle of the mouth (smiling)',
      'Draws the angle of the mouth laterally',
    ],
    exercises: [
      'Smile Training',
      'Facial Expression Training',
    ],
  },
  zygomaticus_minor: {
    description: 'The zygomaticus minor originates from the zygomatic bone and inserts into the upper lip. It assists in elevating the upper lip.',
    functions: [
      'Elevates the upper lip',
      'Assists in facial expressions',
    ],
    exercises: [
      'Facial Expression Training',
    ],
  },
  frontalis: {
    description: 'The frontalis is a thin sheet-like muscle covering the forehead, connected to the occipitalis via the galea aponeurotica. It is responsible for raising the eyebrows and wrinkling the forehead.',
    functions: [
      'Raises the eyebrows',
      'Wrinkles the forehead',
      'Expresses surprise',
    ],
    exercises: [
      'Eyebrow Raising Training',
      'Facial Expression Training',
    ],
  },
  occipitalis: {
    description: 'The occipitalis is located in the occipital region, originating from the occipital bone and inserting into the galea aponeurotica. It works synergistically with the frontalis.',
    functions: [
      'Retracts the scalp',
      'Assists the frontalis in raising eyebrows',
    ],
    exercises: [
      'Scalp Movement Training',
    ],
  },
  nasalis: {
    description: 'The nasalis covers the bridge of the nose, divided into transverse and alar parts. It is responsible for dilating and constricting the nostrils.',
    functions: [
      'Dilates the nostrils',
      'Constricts the nostrils',
      'Wrinkles the nose',
    ],
    exercises: [
      'Nasal Breathing Training',
    ],
  },
  mentalis: {
    description: 'The mentalis is located on the chin, originating from the mandible and inserting into the skin of the chin. It is responsible for movements of the lower lip and chin.',
    functions: [
      'Elevates the skin of the chin',
      'Protrudes the lower lip',
      'Expresses doubt or displeasure',
    ],
    exercises: [
      'Facial Expression Training',
    ],
  },
  risorius: {
    description: 'The risorius originates from the masseteric fascia and inserts into the angle of the mouth. It is responsible for drawing the angle of the mouth laterally.',
    functions: [
      'Draws the angle of the mouth laterally',
      'Assists in smiling',
    ],
    exercises: [
      'Smile Training',
      'Facial Expression Training',
    ],
  },
  procerus: {
    description: 'The procerus is located at the root of the nose, originating from the nasal bone and inserting into the skin between the eyebrows. It is responsible for frowning.',
    functions: [
      'Draws down the skin between the eyebrows',
      'Frowns',
      'Expresses displeasure',
    ],
    exercises: [
      'Facial Relaxation Training',
    ],
  },
  buccinator: {
    description: 'The buccinator is the primary muscle of the cheek, originating from the maxilla and mandible and inserting into the orbicularis oris. It is responsible for blowing and keeping food between the teeth during chewing.',
    functions: [
      'Compresses the cheek',
      'Blows',
      'Pushes food toward the teeth during chewing',
    ],
    exercises: [
      'Blowing Training',
      'Cheek Training',
    ],
  },
  levator_labii_superioris: {
    description: 'The levator labii superioris originates from the infraorbital margin and inserts into the upper lip. It is responsible for elevating the upper lip.',
    functions: [
      'Elevates the upper lip',
      'Assists in facial expressions',
    ],
    exercises: [
      'Facial Expression Training',
    ],
  },
  depressor_labii_inferioris: {
    description: 'The depressor labii inferioris originates from the mandible and inserts into the lower lip. It is responsible for depressing the lower lip.',
    functions: [
      'Depresses the lower lip',
      'Assists in facial expressions',
    ],
    exercises: [
      'Facial Expression Training',
    ],
  },
  depressor_anguli_oris: {
    description: 'The depressor anguli oris originates from the mandible and inserts into the angle of the mouth. It is responsible for depressing the angle of the mouth, expressing sadness.',
    functions: [
      'Depresses the angle of the mouth',
      'Expresses sadness or displeasure',
    ],
    exercises: [
      'Facial Expression Training',
    ],
  },
};
