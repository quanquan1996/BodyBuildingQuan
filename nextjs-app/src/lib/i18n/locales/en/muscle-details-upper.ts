// Upper Body Muscle Details - English Translation
// Includes: Deltoid, Biceps, Triceps, Forearm, Hand muscles

export interface MuscleDetail {
  description: string;
  functions: string[];
  exercises: string[];
  // Strengthening strategy (only for commonly trained muscles)
  strengthening?: {
    strategy: string;
    keyPoints: string[];
    recommendedExercises: {
      name: string;
      reason: string;
    }[];
  };
}

export const muscleDetailsUpper: Record<string, MuscleDetail> = {
  // ============================================
  // Deltoid
  // ============================================
  deltoid_anterior: {
    description: 'The anterior deltoid is located at the front of the shoulder, originating from the lateral third of the clavicle and inserting into the deltoid tuberosity of the humerus. It is the most commonly trained part of the three deltoid heads.',
    functions: [
      'Flexes the arm at the shoulder (raises arm forward)',
      'Assists in medial rotation of the arm',
      'Assists in horizontal adduction',
    ],
    exercises: [
      'Front Raise',
      'Shoulder Press',
      'Arnold Press',
      'Incline Bench Press',
    ],
    strengthening: {
      strategy: 'The anterior deltoid usually gets enough stimulation from pressing movements. Focus on isolation training with constant tension. Avoid momentum and use moderate weight for quality contractions.',
      keyPoints: [
        'Control the eccentric phase, 3 seconds down',
        'Pause at peak contraction for 1-2 seconds',
        'Avoid shrugging compensation',
        'Use moderate weight, 12-15 reps per set',
      ],
      recommendedExercises: [
        { name: 'Cable Front Raise', reason: 'Constant tension throughout ROM, avoids tension loss at top with dumbbells' },
        { name: 'Incline Front Raise', reason: 'Increased stretch at starting position improves muscle activation' },
        { name: 'Single-Arm Dumbbell Front Raise', reason: 'Unilateral training corrects imbalances, better focus' },
      ],
    },
  },
  deltoid_lateral: {
    description: 'The lateral deltoid is located on the side of the shoulder, originating from the acromion and inserting into the deltoid tuberosity. Well-developed lateral delts make shoulders appear wider.',
    functions: [
      'Abducts the arm at the shoulder (raises arm to the side)',
    ],
    exercises: [
      'Lateral Raise',
      'Cable Lateral Raise',
      'Machine Lateral Raise',
      'Dumbbell Shoulder Press',
    ],
    strengthening: {
      strategy: 'The lateral deltoid is one of the most common weak points. Key is reducing trap compensation, keeping elbows slightly bent, and using a "pouring water" motion pattern. High frequency, low intensity training works best.',
      keyPoints: [
        'Keep elbows slightly bent (about 15-20 degrees)',
        'Pinky side slightly higher than thumb (pouring water position)',
        'Arms slightly forward 10-15 degrees at start',
        'Avoid shrugging, keep scapulae depressed',
        'Can train 3-4 times per week, 8-12 sets each',
      ],
      recommendedExercises: [
        { name: 'Cable Lateral Raise', reason: 'EMG studies show 15-20% higher lateral delt activation than dumbbells' },
        { name: 'Leaning Lateral Raise', reason: 'Reduces trap involvement, better isolation' },
        { name: 'Single-Arm Cable Lateral Raise', reason: 'Can cross body midline at peak for increased ROM' },
      ],
    },
  },
  deltoid_posterior: {
    description: 'The posterior deltoid is located at the back of the shoulder, originating from the spine of the scapula and inserting into the deltoid tuberosity. It is the most commonly neglected part of the deltoid.',
    functions: [
      'Extends the arm at the shoulder (pulls arm backward)',
      'Laterally rotates the arm at the shoulder',
      'Horizontally abducts the arm',
    ],
    exercises: [
      'Bent-Over Reverse Fly',
      'Reverse Pec Deck',
      'Face Pull',
      'Bent-Over Lateral Raise',
    ],
    strengthening: {
      strategy: 'The rear delt is the most neglected deltoid part, requiring dedicated isolation work. Key is reducing trap and rhomboid involvement, focusing on horizontal abduction.',
      keyPoints: [
        'Bend forward nearly horizontal (chest almost parallel to floor)',
        'Keep elbow angle fixed during abduction',
        'Avoid excessive scapular retraction',
        'Use light weight, 15-20 reps per set',
        'Train at least 2-3 times per week',
      ],
      recommendedExercises: [
        { name: 'Prone Cable Rear Delt Fly', reason: 'Prone position eliminates cheating, cable provides constant tension' },
        { name: 'Face Pull (High)', reason: 'Trains rear delt and external rotation, improves shoulder health' },
        { name: 'Reverse Pec Deck', reason: 'Fixed movement path, good for building mind-muscle connection' },
      ],
    },
  },
  clavicular_part_of_deltoid: {
    description: 'The clavicular part of the deltoid is the anatomical name for the anterior deltoid, originating from the lateral third of the clavicle. It works synergistically with the clavicular head of the pectoralis major.',
    functions: [
      'Flexes the arm at the shoulder',
      'Assists in medial rotation of the arm',
      'Assists in adduction of the arm',
    ],
    exercises: [
      'Front Raise',
      'Shoulder Press',
      'Incline Bench Press',
      'Cable Front Raise',
    ],
  },
  acromial_part_of_deltoid: {
    description: 'The acromial part of the deltoid is the anatomical name for the lateral deltoid, originating from the acromion. It is the primary source of shoulder abduction power and determines shoulder width.',
    functions: [
      'Abducts the arm at the shoulder',
      'Stabilizes the shoulder joint',
    ],
    exercises: [
      'Lateral Raise',
      'Cable Lateral Raise',
      'Dumbbell Shoulder Press',
      'Machine Shoulder Press',
    ],
  },
  scapular_spinal_part_of_deltoid: {
    description: 'The scapular spinal part of the deltoid is the anatomical name for the posterior deltoid, originating from the spine of the scapula. It works synergistically with back muscles in pulling movements.',
    functions: [
      'Extends the arm at the shoulder',
      'Laterally rotates the arm at the shoulder',
      'Horizontally abducts the arm',
    ],
    exercises: [
      'Bent-Over Reverse Fly',
      'Face Pull',
      'Reverse Pec Deck',
      'Cable Face Pull',
    ],
  },

  // ============================================
  // Biceps
  // ============================================
  biceps: {
    description: 'The biceps brachii is located on the front of the upper arm, consisting of a long head and short head. The long head originates from the supraglenoid tubercle, the short head from the coracoid process, merging to insert on the radial tuberosity. It is an iconic muscle for displaying arm strength.',
    functions: [
      'Flexes the elbow (bends the arm)',
      'Supinates the forearm (turns palm upward)',
      'Assists in shoulder flexion',
    ],
    exercises: [
      'Barbell Curl',
      'Dumbbell Curl',
      'Hammer Curl',
      'Preacher Curl',
      'Concentration Curl',
      'Cable Curl',
    ],
    strengthening: {
      strategy: 'Biceps strengthening requires distinguishing between long head and short head weakness. Long head affects the "peak", short head affects width. Adjust grip width and arm angle for targeted training.',
      keyPoints: [
        'Full range of motion, complete stretch to full contraction',
        'Control eccentric phase, avoid swinging momentum',
        'Supinate forearm at peak contraction for extra stimulus',
        'Train 2-3 times per week, 15-20 total sets',
      ],
      recommendedExercises: [
        { name: 'Incline Dumbbell Curl', reason: 'Shoulder extension position stretches long head, EMG shows highest long head activation' },
        { name: 'Spider Curl', reason: 'Shoulder flexion position emphasizes short head, eliminates cheating' },
        { name: 'Cable High Curl', reason: 'Mimics classic bodybuilding pose, constant tension with strong peak contraction' },
      ],
    },
  },
  biceps_brachii: {
    description: 'The biceps brachii is located on the front of the upper arm, consisting of a long head and short head. The long head originates from the supraglenoid tubercle, the short head from the coracoid process, merging to insert on the radial tuberosity. It is an iconic muscle for displaying arm strength.',
    functions: [
      'Flexes the elbow (bends the arm)',
      'Supinates the forearm (turns palm upward)',
      'Assists in shoulder flexion',
    ],
    exercises: [
      'Barbell Curl',
      'Dumbbell Curl',
      'Hammer Curl',
      'Preacher Curl',
      'Concentration Curl',
      'Cable Curl',
    ],
    strengthening: {
      strategy: 'Biceps strengthening requires distinguishing between long head and short head weakness. Long head affects the "peak", short head affects width. Adjust grip width and arm angle for targeted training.',
      keyPoints: [
        'Full range of motion, complete stretch to full contraction',
        'Control eccentric phase, avoid swinging momentum',
        'Supinate forearm at peak contraction for extra stimulus',
        'Train 2-3 times per week, 15-20 total sets',
      ],
      recommendedExercises: [
        { name: 'Incline Dumbbell Curl', reason: 'Shoulder extension position stretches long head, EMG shows highest long head activation' },
        { name: 'Spider Curl', reason: 'Shoulder flexion position emphasizes short head, eliminates cheating' },
        { name: 'Cable High Curl', reason: 'Mimics classic bodybuilding pose, constant tension with strong peak contraction' },
      ],
    },
  },
  long_head_of_biceps_brachii: {
    description: 'The long head of the biceps brachii originates from the supraglenoid tubercle of the scapula, passing through the shoulder joint capsule and descending along the intertubercular groove. It is longer than the short head and contributes significantly to the biceps peak.',
    functions: [
      'Flexes the elbow',
      'Supinates the forearm',
      'Assists in shoulder flexion and abduction',
    ],
    exercises: [
      'Incline Dumbbell Curl',
      'Narrow-Grip Barbell Curl',
      'Cable Curl',
      'Hammer Curl',
    ],
    strengthening: {
      strategy: 'The long head determines biceps "peak" height. Key is training with shoulder in extension position to stretch the long head and increase activation.',
      keyPoints: [
        'Use incline bench (45-60 degrees) with arms hanging naturally',
        'Narrow grip emphasizes long head more',
        'Keep elbows fixed, avoid forward movement',
        'Can use drop sets to increase volume',
      ],
      recommendedExercises: [
        { name: 'Incline Dumbbell Curl', reason: 'Shoulder extension maximizes long head stretch, research confirms highest activation' },
        { name: 'Drag Curl', reason: 'Elbow moves back reducing forearm involvement, isolates long head' },
        { name: 'Narrow-Grip EZ Bar Curl', reason: 'Narrow grip increases long head involvement ratio' },
      ],
    },
  },
  short_head_of_biceps_brachii: {
    description: 'The short head of the biceps brachii originates from the coracoid process of the scapula, merging with the long head to insert on the radial tuberosity. It primarily contributes to arm width and inner contour.',
    functions: [
      'Flexes the elbow',
      'Supinates the forearm',
      'Assists in shoulder flexion and adduction',
    ],
    exercises: [
      'Wide-Grip Barbell Curl',
      'Preacher Curl',
      'Concentration Curl',
      'Spider Curl',
    ],
    strengthening: {
      strategy: 'The short head determines biceps width and inner fullness. Training with shoulder in flexion position increases short head activation, wide grip also helps.',
      keyPoints: [
        'Use preacher or spider bench to fix upper arm',
        'Wide grip increases short head involvement',
        'Focus on inner muscle contraction feel',
        'Can combine with pre-exhaustion technique',
      ],
      recommendedExercises: [
        { name: 'Spider Curl', reason: 'Shoulder flexion position maximizes short head activation' },
        { name: 'Preacher Curl', reason: 'Fixed upper arm eliminates cheating, isolates biceps' },
        { name: 'Wide-Grip Barbell Curl', reason: 'Wide grip increases short head involvement ratio' },
      ],
    },
  },

  // ============================================
  // Triceps
  // ============================================
  triceps: {
    description: 'The triceps brachii is located on the back of the upper arm, consisting of three heads: long, lateral, and medial. It is the largest muscle of the upper arm, comprising about 2/3 of the arm\'s volume.',
    functions: [
      'Extends the elbow (straightens the arm)',
      'Long head assists in shoulder extension and adduction',
    ],
    exercises: [
      'Close-Grip Bench Press',
      'Tricep Pushdown',
      'Overhead Tricep Extension',
      'Skull Crushers',
      'Rope Pushdown',
      'Dips',
    ],
    strengthening: {
      strategy: 'Triceps make up 2/3 of arm volume, so strengthening shows significant results. Distinguish between three heads: long head needs overhead movements, lateral head needs pushdowns, medial head is active in all movements.',
      keyPoints: [
        'Long head training requires shoulder flexion (overhead position)',
        'Lateral head training uses overhand or neutral grip',
        'Full range of motion, fully extend elbow',
        '20-25 total sets per week works best',
      ],
      recommendedExercises: [
        { name: 'Overhead Cable Extension', reason: 'Shoulder flexion position maximizes long head stretch and activation' },
        { name: 'Rope Pushdown', reason: 'Constant tension, can externally rotate at bottom for extra lateral head stimulus' },
        { name: 'Skull Crushers', reason: 'Heavy compound movement, balanced development of all three heads' },
      ],
    },
  },
  triceps_brachii: {
    description: 'The triceps brachii is located on the back of the upper arm, consisting of three heads: long, lateral, and medial. It is the largest muscle of the upper arm, comprising about 2/3 of the arm\'s volume.',
    functions: [
      'Extends the elbow (straightens the arm)',
      'Long head assists in shoulder extension and adduction',
    ],
    exercises: [
      'Close-Grip Bench Press',
      'Tricep Pushdown',
      'Overhead Tricep Extension',
      'Skull Crushers',
      'Rope Pushdown',
      'Dips',
    ],
    strengthening: {
      strategy: 'Triceps make up 2/3 of arm volume, so strengthening shows significant results. Distinguish between three heads: long head needs overhead movements, lateral head needs pushdowns, medial head is active in all movements.',
      keyPoints: [
        'Long head training requires shoulder flexion (overhead position)',
        'Lateral head training uses overhand or neutral grip',
        'Full range of motion, fully extend elbow',
        '20-25 total sets per week works best',
      ],
      recommendedExercises: [
        { name: 'Overhead Cable Extension', reason: 'Shoulder flexion position maximizes long head stretch and activation' },
        { name: 'Rope Pushdown', reason: 'Constant tension, can externally rotate at bottom for extra lateral head stimulus' },
        { name: 'Skull Crushers', reason: 'Heavy compound movement, balanced development of all three heads' },
      ],
    },
  },
  long_head_of_triceps_brachii: {
    description: 'The long head of the triceps brachii originates from the infraglenoid tubercle of the scapula, making it the only head that crosses the shoulder joint. It has the greatest impact on overall arm shape from behind.',
    functions: [
      'Extends the elbow',
      'Assists in shoulder extension',
      'Assists in shoulder adduction',
    ],
    exercises: [
      'Overhead Tricep Extension',
      'Cable Overhead Extension',
      'French Press',
      'Dips',
    ],
    strengthening: {
      strategy: 'The long head is the largest triceps head, determining overall arm shape from behind. Must train in shoulder flexion (overhead) position for full activation.',
      keyPoints: [
        'All overhead movements emphasize long head',
        'Keep upper arm vertical or slightly forward',
        'Elbows point to ceiling, avoid flaring out',
        'Use moderate weight, 12-15 reps per set',
      ],
      recommendedExercises: [
        { name: 'Single-Arm Overhead Dumbbell Extension', reason: 'Unilateral training corrects imbalances, full long head stretch' },
        { name: 'Cable Overhead Extension', reason: 'Constant tension, stronger stretch at bottom' },
        { name: 'French Press (EZ Bar)', reason: 'Classic long head exercise, can use heavier weight' },
      ],
    },
  },
  lateral_head_of_triceps_brachii: {
    description: 'The lateral head of the triceps brachii originates from the posterior surface of the humerus above the radial groove. It is the strongest of the three heads and defines the outer arm contour.',
    functions: [
      'Extends the elbow',
      'Provides primary force during arm straightening',
    ],
    exercises: [
      'Rope Pushdown',
      'Close-Grip Bench Press',
      'Diamond Push-ups',
      'Tricep Kickback',
    ],
    strengthening: {
      strategy: 'The lateral head determines the "horseshoe" shape on the outer arm. Training in neutral or extended shoulder position works best, overhand or neutral grip increases activation.',
      keyPoints: [
        'Pushdown movements emphasize lateral head',
        'Overhand grip emphasizes lateral head more than underhand',
        'Fully lock out elbow at bottom',
        'Can use drop sets to increase pump',
      ],
      recommendedExercises: [
        { name: 'V-Bar Pushdown', reason: 'Overhand position maximizes lateral head activation' },
        { name: 'Close-Grip Bench Press', reason: 'Compound movement, can use heavy weight to stimulate lateral head' },
        { name: 'Cable Kickback', reason: 'Isolation movement, strongest lateral head contraction at peak' },
      ],
    },
  },
  medial_head_of_triceps_brachii: {
    description: 'The medial head of the triceps brachii originates from the posterior surface of the humerus below the radial groove. It is the deepest of the three heads and remains active throughout all elbow extension movements.',
    functions: [
      'Extends the elbow',
      'Remains active throughout the full range of elbow extension',
    ],
    exercises: [
      'Reverse-Grip Pushdown',
      'Skull Crushers',
      'Close-Grip Push-ups',
      'Rope Pushdown',
    ],
    strengthening: {
      strategy: 'The medial head is the "workhorse", active in all triceps movements. Underhand grip increases its activation, but usually doesn\'t need dedicated strengthening.',
      keyPoints: [
        'Underhand pushdown increases medial head activation',
        'Light weight, high reps work well',
        'Gets trained in all triceps movements',
        'Use as warm-up or finisher',
      ],
      recommendedExercises: [
        { name: 'Reverse-Grip Cable Pushdown', reason: 'Underhand position increases medial head activation ratio' },
        { name: 'Diamond Push-ups', reason: 'Bodyweight movement, medial head active throughout' },
        { name: 'Lying Dumbbell Extension', reason: 'Neutral grip position, high medial head involvement' },
      ],
    },
  },

  // ============================================
  // Other Upper Arm Muscles
  // ============================================
  brachialis: {
    description: 'The brachialis lies deep to the biceps brachii, originating from the lower half of the anterior humerus and inserting into the ulnar tuberosity. It is a pure elbow flexor and contributes significantly to arm size.',
    functions: [
      'Flexes the elbow (regardless of forearm position)',
      'Primary mover for elbow flexion',
    ],
    exercises: [
      'Hammer Curl',
      'Reverse Curl',
      'Cable Hammer Curl',
      'Incline Hammer Curl',
    ],
  },
  coracobrachialis: {
    description: 'The coracobrachialis originates from the coracoid process of the scapula and inserts into the middle of the medial humerus. It is a small muscle on the inner upper arm that assists in shoulder flexion and adduction.',
    functions: [
      'Flexes the arm at the shoulder',
      'Adducts the arm at the shoulder',
      'Stabilizes the shoulder joint',
    ],
    exercises: [
      'Dumbbell Front Raise',
      'Cable Crossover',
      'Incline Bench Press',
      'Dumbbell Fly',
    ],
  },
  anconeus: {
    description: 'The anconeus is a small triangular muscle located on the posterolateral elbow, originating from the lateral epicondyle of the humerus and inserting into the olecranon of the ulna. It assists the triceps in elbow extension.',
    functions: [
      'Assists in elbow extension',
      'Stabilizes the elbow joint',
      'Abducts the ulna during forearm pronation',
    ],
    exercises: [
      'Tricep Pushdown',
      'Close-Grip Bench Press',
      'Reverse-Grip Pushdown',
      'Rope Pushdown',
    ],
  },

  // ============================================
  // Forearm Muscles
  // ============================================
  forearm_flexors: {
    description: 'The forearm flexors are located on the anterior forearm, including the flexor carpi radialis, flexor carpi ulnaris, palmaris longus, and flexor digitorum superficialis. They are responsible for wrist and finger flexion.',
    functions: [
      'Flex the wrist',
      'Flex the fingers',
      'Assist in forearm pronation',
    ],
    exercises: [
      'Wrist Curl',
      'Reverse Wrist Curl',
      'Grip Trainer',
      'Farmer\'s Walk',
    ],
  },
  forearm_extensors: {
    description: 'The forearm extensors are located on the posterior forearm, including the extensor carpi radialis longus, extensor carpi radialis brevis, and extensor digitorum. They are responsible for wrist and finger extension.',
    functions: [
      'Extend the wrist',
      'Extend the fingers',
      'Assist in forearm supination',
    ],
    exercises: [
      'Reverse Wrist Curl',
      'Wrist Extension',
      'Grip Trainer',
      'Reverse Barbell Curl',
    ],
  },
  brachioradialis: {
    description: 'The brachioradialis is located on the lateral forearm, originating above the lateral epicondyle of the humerus and inserting into the styloid process of the radius. It is one of the most visible forearm muscles.',
    functions: [
      'Flexes the elbow',
      'Rotates the forearm to neutral position',
      'Assists in pronation and supination',
    ],
    exercises: [
      'Hammer Curl',
      'Reverse Curl',
      'Cable Hammer Curl',
      'Wrist Curl',
    ],
  },

  flexor_carpi_radialis: {
    description: 'The flexor carpi radialis originates from the medial epicondyle of the humerus and inserts into the base of the 2nd metacarpal. It is a primary muscle for wrist flexion and radial deviation.',
    functions: [
      'Flexes the wrist',
      'Radially deviates the wrist (bends toward thumb side)',
      'Assists in forearm pronation',
    ],
    exercises: [
      'Wrist Curl',
      'Dumbbell Wrist Curl',
      'Cable Wrist Curl',
      'Grip Training',
    ],
  },
  flexor_carpi_ulnaris: {
    description: 'The flexor carpi ulnaris originates from the medial epicondyle of the humerus and olecranon of the ulna, inserting into the pisiform bone. It is a primary muscle for wrist flexion and ulnar deviation.',
    functions: [
      'Flexes the wrist',
      'Ulnarly deviates the wrist (bends toward pinky side)',
    ],
    exercises: [
      'Wrist Curl',
      'Ulnar Deviation Wrist Curl',
      'Grip Training',
      'Farmer\'s Walk',
    ],
  },
  flexor_digitorum_superficialis: {
    description: 'The flexor digitorum superficialis is located in the middle layer of the anterior forearm, originating from the medial epicondyle, ulna, and radius, inserting into the middle phalanges of digits 2-5.',
    functions: [
      'Flexes the proximal and middle phalanges',
      'Assists in wrist flexion',
      'Assists in elbow flexion',
    ],
    exercises: [
      'Grip Trainer',
      'Hanging Training',
      'Finger Board Training',
      'Farmer\'s Walk',
    ],
  },
  flexor_digitorum_profundus: {
    description: 'The flexor digitorum profundus is located in the deep layer of the anterior forearm, originating from the ulna and interosseous membrane, inserting into the distal phalanges. It is the only muscle that can flex the distal phalanges.',
    functions: [
      'Flexes the distal phalanges',
      'Assists in flexing the proximal and middle phalanges',
      'Assists in wrist flexion',
    ],
    exercises: [
      'Grip Trainer',
      'Finger Board Training',
      'Hanging Training',
      'Pinch Grip Training',
    ],
  },
  palmaris_longus: {
    description: 'The palmaris longus originates from the medial epicondyle of the humerus and inserts into the palmar aponeurosis. About 15% of people lack this muscle, but it does not affect hand function.',
    functions: [
      'Flexes the wrist',
      'Tenses the palmar aponeurosis',
    ],
    exercises: [
      'Wrist Curl',
      'Grip Training',
      'Hanging Training',
    ],
  },
  extensor_carpi_radialis_longus: {
    description: 'The extensor carpi radialis longus originates above the lateral epicondyle of the humerus and inserts into the base of the 2nd metacarpal. It is a primary muscle for wrist extension and radial deviation.',
    functions: [
      'Extends the wrist',
      'Radially deviates the wrist',
      'Assists in elbow flexion',
    ],
    exercises: [
      'Reverse Wrist Curl',
      'Wrist Extension',
      'Reverse Barbell Curl',
      'Grip Training',
    ],
  },
  extensor_carpi_radialis_brevis: {
    description: 'The extensor carpi radialis brevis originates from the lateral epicondyle of the humerus and inserts into the base of the 3rd metacarpal. It works synergistically with the extensor carpi radialis longus.',
    functions: [
      'Extends the wrist',
      'Radially deviates the wrist',
    ],
    exercises: [
      'Reverse Wrist Curl',
      'Wrist Extension',
      'Grip Training',
      'Tennis Elbow Rehabilitation',
    ],
  },
  extensor_carpi_ulnaris: {
    description: 'The extensor carpi ulnaris originates from the lateral epicondyle of the humerus and posterior border of the ulna, inserting into the base of the 5th metacarpal. It is a primary muscle for wrist extension and ulnar deviation.',
    functions: [
      'Extends the wrist',
      'Ulnarly deviates the wrist',
    ],
    exercises: [
      'Reverse Wrist Curl',
      'Wrist Extension',
      'Ulnar Deviation Training',
      'Grip Training',
    ],
  },
  extensor_digitorum: {
    description: 'The extensor digitorum originates from the lateral epicondyle of the humerus and inserts into the middle and distal phalanges of digits 2-5. It is the primary muscle for finger extension.',
    functions: [
      'Extends the metacarpophalangeal joints of digits 2-5',
      'Assists in extending the interphalangeal joints',
      'Assists in wrist extension',
    ],
    exercises: [
      'Finger Extension Training',
      'Rubber Band Finger Training',
      'Reverse Wrist Curl',
      'Grip Training',
    ],
  },
  pronator_teres: {
    description: 'The pronator teres originates from the medial epicondyle of the humerus and coronoid process of the ulna, inserting into the lateral surface of the middle radius. It is a primary muscle for forearm pronation.',
    functions: [
      'Pronates the forearm (turns palm downward)',
      'Assists in elbow flexion',
    ],
    exercises: [
      'Pronation Training',
      'Dumbbell Rotation',
      'Cable Pronation',
      'Hammer Curl Variations',
    ],
  },
  pronator_quadratus: {
    description: 'The pronator quadratus is located in the deep distal forearm, originating from the anterior surface of the distal ulna and inserting into the anterior surface of the distal radius. It is a deep muscle for forearm pronation.',
    functions: [
      'Pronates the forearm',
      'Stabilizes the distal radioulnar joint',
    ],
    exercises: [
      'Pronation Training',
      'Dumbbell Rotation',
      'Cable Pronation',
    ],
  },
  supinator: {
    description: 'The supinator is located in the deep proximal forearm, originating from the lateral epicondyle of the humerus and ulna, inserting into the proximal radius. It is a deep muscle for forearm supination.',
    functions: [
      'Supinates the forearm (turns palm upward)',
    ],
    exercises: [
      'Supination Training',
      'Dumbbell Rotation',
      'Reverse Curl',
      'Hammer Curl',
    ],
  },

  // ============================================
  // Hand Muscles
  // ============================================
  abductor_pollicis_brevis: {
    description: 'The abductor pollicis brevis is located on the palmar side of the thumb, originating from the carpal bones and inserting into the proximal phalanx of the thumb. It is part of the thenar eminence.',
    functions: [
      'Abducts the thumb',
      'Assists in thumb opposition',
    ],
    exercises: [
      'Thumb Abduction Training',
      'Pinch Grip Training',
      'Grip Trainer',
    ],
  },
  abductor_pollicis_longus: {
    description: 'The abductor pollicis longus is located in the deep posterior forearm, originating from the radius, ulna, and interosseous membrane, inserting into the base of the 1st metacarpal.',
    functions: [
      'Abducts the thumb',
      'Extends the thumb',
      'Assists in radial deviation of the wrist',
    ],
    exercises: [
      'Thumb Abduction Training',
      'Wrist Extension',
      'Grip Training',
    ],
  },
  adductor_pollicis: {
    description: 'The adductor pollicis is located deep in the palm, originating from the 3rd metacarpal and carpal bones, inserting into the proximal phalanx of the thumb. It is responsible for thumb adduction.',
    functions: [
      'Adducts the thumb',
      'Assists in thumb opposition',
      'Enhances pinch grip strength',
    ],
    exercises: [
      'Pinch Grip Training',
      'Thumb Adduction Training',
      'Grip Trainer',
    ],
  },
  opponens_pollicis: {
    description: 'The opponens pollicis is located deep in the thenar eminence, originating from the carpal bones and inserting into the 1st metacarpal. It enables the thumb to oppose the other fingers.',
    functions: [
      'Opposes the thumb (brings it to face other fingers)',
      'Flexes the 1st metacarpal',
      'Medially rotates the 1st metacarpal',
    ],
    exercises: [
      'Opposition Training',
      'Pinch Grip Training',
      'Fine Motor Training',
    ],
  },
  flexor_pollicis_brevis: {
    description: 'The flexor pollicis brevis is located in the thenar eminence, originating from the carpal bones and inserting into the proximal phalanx of the thumb. It is responsible for thumb flexion.',
    functions: [
      'Flexes the thumb metacarpophalangeal joint',
      'Assists in thumb opposition',
    ],
    exercises: [
      'Thumb Flexion Training',
      'Pinch Grip Training',
      'Grip Trainer',
    ],
  },
  flexor_pollicis_longus: {
    description: 'The flexor pollicis longus is located in the deep anterior forearm, originating from the radius and interosseous membrane, inserting into the distal phalanx of the thumb. It is the only muscle that can flex the distal phalanx of the thumb.',
    functions: [
      'Flexes the thumb interphalangeal joint',
      'Assists in flexing the thumb metacarpophalangeal joint',
      'Assists in wrist flexion',
    ],
    exercises: [
      'Thumb Flexion Training',
      'Pinch Grip Training',
      'Grip Training',
    ],
  },
  abductor_digiti_minimi: {
    description: 'The abductor digiti minimi is located on the ulnar side of the palm, originating from the pisiform bone and inserting into the proximal phalanx of the little finger. It is part of the hypothenar eminence.',
    functions: [
      'Abducts the little finger',
      'Assists in flexing the little finger metacarpophalangeal joint',
    ],
    exercises: [
      'Finger Abduction Training',
      'Grip Training',
      'Finger Independence Training',
    ],
  },
  flexor_digiti_minimi_brevis: {
    description: 'The flexor digiti minimi brevis is located in the hypothenar eminence, originating from the hook of the hamate and inserting into the proximal phalanx of the little finger. It is responsible for little finger flexion.',
    functions: [
      'Flexes the little finger metacarpophalangeal joint',
    ],
    exercises: [
      'Finger Flexion Training',
      'Grip Trainer',
      'Finger Independence Training',
    ],
  },
  opponens_digiti_minimi: {
    description: 'The opponens digiti minimi is located deep in the hypothenar eminence, originating from the hook of the hamate and inserting into the 5th metacarpal. It enables the little finger to oppose the thumb.',
    functions: [
      'Opposes the little finger',
      'Flexes the 5th metacarpal',
    ],
    exercises: [
      'Opposition Training',
      'Pinch Grip Training',
      'Fine Motor Training',
    ],
  },
  lumbricals: {
    description: 'The lumbricals are four small muscles in the palm, originating from the tendons of the flexor digitorum profundus and inserting into the extensor expansion. They play an important role in fine finger movements.',
    functions: [
      'Flex the metacarpophalangeal joints',
      'Extend the interphalangeal joints',
      'Coordinate fine finger movements',
    ],
    exercises: [
      'Fine Motor Training',
      'Piano Finger Exercises',
      'Grip Training',
    ],
  },
  interossei: {
    description: 'The interossei are located between the metacarpals, divided into palmar and dorsal interossei. They are responsible for finger adduction and abduction.',
    functions: [
      'Palmar interossei: adduct the fingers',
      'Dorsal interossei: abduct the fingers',
      'Assist in flexing the metacarpophalangeal joints',
    ],
    exercises: [
      'Finger Abduction/Adduction Training',
      'Rubber Band Finger Training',
      'Grip Training',
    ],
  },
  palmar_interossei: {
    description: 'The palmar interossei are located on the palmar side of the metacarpals, consisting of 3 muscles. They are responsible for finger adduction toward the middle finger.',
    functions: [
      'Adduct the fingers (toward the middle finger)',
      'Assist in flexing the metacarpophalangeal joints',
      'Assist in extending the interphalangeal joints',
    ],
    exercises: [
      'Finger Adduction Training',
      'Pinch Grip Training',
      'Finger Independence Training',
    ],
  },
  dorsal_interossei: {
    description: 'The dorsal interossei are located between the metacarpals, consisting of 4 muscles. They are responsible for finger abduction (away from the middle finger).',
    functions: [
      'Abduct the fingers (away from the middle finger)',
      'Assist in flexing the metacarpophalangeal joints',
      'Assist in extending the interphalangeal joints',
    ],
    exercises: [
      'Finger Abduction Training',
      'Rubber Band Finger Training',
      'Finger Independence Training',
    ],
  },
};
