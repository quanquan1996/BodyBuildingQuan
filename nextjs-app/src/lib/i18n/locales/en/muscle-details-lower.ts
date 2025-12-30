// Lower Body Muscle Details - English Translation
// Includes: Gluteal, Thigh, Calf, Foot muscles

import type { MuscleDetail } from './muscle-details-upper';

export const muscleDetailsLower: Record<string, MuscleDetail> = {
  // ============================================
  // Gluteal Muscles
  // ============================================
  gluteus_maximus: {
    description: 'The gluteus maximus is one of the largest and most powerful muscles in the human body, located in the buttocks. It originates from the ilium, sacrum, and coccyx, inserting into the gluteal tuberosity of the femur and iliotibial band.',
    functions: [
      'Extends the hip (kicks leg backward)',
      'Laterally rotates the hip',
      'Assists in hip abduction',
    ],
    exercises: [
      'Squats',
      'Deadlifts',
      'Glute Bridge',
      'Hip Thrust',
      'Lunges',
      'Leg Press',
    ],
    strengthening: {
      strategy: 'The gluteus maximus is the largest muscle in the body, but many people suffer from "gluteal amnesia." The key is building the mind-muscle connection and learning to activate the glutes in compound movements rather than letting the quads or hamstrings compensate.',
      keyPoints: [
        'Pre-activate glutes with isolation exercises like glute bridges',
        'Focus on "standing up with your glutes" during squats',
        'Fully extend hips and squeeze glutes at the top',
        'Train 16-22 total sets per week',
      ],
      recommendedExercises: [
        { name: 'Hip Thrust', reason: 'EMG studies show hip thrusts have the highest glute activation, over 2x that of squats' },
        { name: 'Romanian Deadlift', reason: 'Emphasizes hip hinge pattern with high glute activation in the stretched position' },
        { name: 'Bulgarian Split Squat', reason: 'Unilateral training corrects imbalances with higher glute activation than traditional squats' },
      ],
    },
  },
  gluteus_medius: {
    description: 'The gluteus medius lies deep and lateral to the gluteus maximus, originating from the outer surface of the ilium and inserting into the greater trochanter. It is the primary hip abductor and crucial for gait stability.',
    functions: [
      'Abducts the hip (raises leg to the side)',
      'Anterior fibers assist in hip internal rotation',
      'Posterior fibers assist in hip external rotation',
      'Stabilizes the pelvis during single-leg stance',
    ],
    exercises: [
      'Side-Lying Leg Raise',
      'Clamshell',
      'Banded Side Walk',
      'Single-Leg Glute Bridge',
    ],
    strengthening: {
      strategy: 'Weak gluteus medius leads to knee valgus and pelvic tilt. The key is maintaining pelvic stability during hip abduction movements and avoiding quadratus lumborum compensation.',
      keyPoints: [
        'Keep pelvis vertical when side-lying, avoid tilting backward',
        'Range of motion doesn\'t need to be large, focus on contraction',
        'Use resistance bands to increase load',
        'Train 2-3 times per week, 10-15 sets per session',
      ],
      recommendedExercises: [
        { name: 'Side-Lying Hip Abduction', reason: 'Best isolation exercise for gluteus medius, EMG shows highest activation' },
        { name: 'Banded Clamshell', reason: 'Targets posterior fibers of gluteus medius, improves hip external rotation function' },
        { name: 'Single-Leg Romanian Deadlift', reason: 'Functional training that also trains gluteus medius stabilization' },
      ],
    },
  },
  gluteus_minimus: {
    description: 'The gluteus minimus lies deep to the gluteus medius, the deepest of the gluteal muscles. It originates from the outer surface of the ilium and inserts into the anterior greater trochanter.',
    functions: [
      'Abducts the hip',
      'Internally rotates the hip',
      'Stabilizes the pelvis',
    ],
    exercises: [
      'Side-Lying Leg Raise',
      'Clamshell',
      'Banded Side Walk',
      'Hip Internal Rotation Exercise',
    ],
  },
  tensor_fasciae_latae: {
    description: 'The tensor fasciae latae is located on the upper outer thigh, originating from the anterior superior iliac spine and inserting into the iliotibial band. It works with the gluteus maximus on the IT band.',
    functions: [
      'Flexes the hip',
      'Abducts the hip',
      'Internally rotates the hip',
      'Stabilizes the knee',
    ],
    exercises: [
      'Side-Lying Leg Raise',
      'Banded Side Walk',
      'Hip Flexion Training',
      'IT Band Stretch',
    ],
  },
  piriformis: {
    description: 'The piriformis is located deep in the buttocks, originating from the anterior surface of the sacrum and inserting into the greater trochanter. The sciatic nerve passes beneath or through it.',
    functions: [
      'Laterally rotates the hip',
      'Assists in hip abduction when hip is flexed',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hip External Rotation Training',
      'Piriformis Stretch',
      'Foam Rolling',
    ],
  },

  // ============================================
  // Deep Hip Muscles
  // ============================================
  iliopsoas: {
    description: 'The iliopsoas consists of the iliacus and psoas major, the primary hip flexor. It originates from the lumbar vertebrae and iliac fossa, inserting into the lesser trochanter of the femur.',
    functions: [
      'Flexes the hip (raises leg)',
      'Stabilizes the lumbar spine and hip joint',
      'Assists in trunk flexion',
    ],
    exercises: [
      'Hanging Leg Raise',
      'Lying Leg Raise',
      'Mountain Climbers',
      'Iliopsoas Stretch',
    ],
  },
  iliacus: {
    description: 'The iliacus is located in the iliac fossa, originating from the iliac fossa and merging with the psoas major to insert into the lesser trochanter. It is part of the iliopsoas.',
    functions: [
      'Flexes the hip',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hanging Leg Raise',
      'Lying Leg Raise',
      'Iliopsoas Stretch',
    ],
  },
  psoas_major: {
    description: 'The psoas major originates from the T12-L5 vertebral bodies and intervertebral discs, merging with the iliacus to insert into the lesser trochanter. It is an important muscle connecting the upper and lower body.',
    functions: [
      'Flexes the hip',
      'Laterally flexes the lumbar spine',
      'Stabilizes the lumbar spine',
    ],
    exercises: [
      'Hanging Leg Raise',
      'Lying Leg Raise',
      'Psoas Stretch',
      'Lunge Stretch',
    ],
  },
  psoas_minor: {
    description: 'The psoas minor is located anterior to the psoas major, originating from the T12-L1 vertebral bodies and inserting into the iliopubic eminence. About 40% of people lack this muscle.',
    functions: [
      'Assists in trunk flexion',
      'Stabilizes the lumbar spine',
    ],
    exercises: [
      'Core Stability Training',
      'Lumbar Stretch',
    ],
  },
  obturator_internus: {
    description: 'The obturator internus originates from the inner surface of the obturator membrane and surrounding bone, inserting into the medial surface of the greater trochanter. It is a deep hip external rotator.',
    functions: [
      'Laterally rotates the hip',
      'Assists in hip abduction when hip is flexed',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hip External Rotation Training',
      'Clamshell',
      'Deep Hip Stretch',
    ],
  },
  obturator_externus: {
    description: 'The obturator externus originates from the outer surface of the obturator membrane and surrounding bone, inserting into the trochanteric fossa. It is a deep hip external rotator.',
    functions: [
      'Laterally rotates the hip',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hip External Rotation Training',
      'Deep Hip Stretch',
    ],
  },
  gemellus_superior: {
    description: 'The gemellus superior originates from the ischial spine and inserts into the medial surface of the greater trochanter. It works synergistically with the obturator internus.',
    functions: [
      'Laterally rotates the hip',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hip External Rotation Training',
      'Deep Hip Stretch',
    ],
  },
  gemellus_inferior: {
    description: 'The gemellus inferior originates from the ischial tuberosity and inserts into the medial surface of the greater trochanter. It works synergistically with the obturator internus.',
    functions: [
      'Laterally rotates the hip',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hip External Rotation Training',
      'Deep Hip Stretch',
    ],
  },
  quadratus_femoris: {
    description: 'The quadratus femoris is the most inferior of the hip external rotators, originating from the ischial tuberosity and inserting into the intertrochanteric crest of the femur.',
    functions: [
      'Laterally rotates the hip',
      'Stabilizes the hip joint',
    ],
    exercises: [
      'Hip External Rotation Training',
      'Deep Hip Stretch',
    ],
  },

  // ============================================
  // Anterior Thigh
  // ============================================
  quadriceps: {
    description: 'The quadriceps femoris is a large muscle group on the front of the thigh, consisting of four muscles: rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius. It is one of the strongest muscle groups in the body.',
    functions: [
      'Extends the knee (straightens the leg)',
      'Rectus femoris also flexes the hip',
    ],
    exercises: [
      'Squats',
      'Leg Press',
      'Leg Extension',
      'Lunges',
      'Bulgarian Split Squat',
      'Front Squat',
    ],
    strengthening: {
      strategy: 'Quadriceps strengthening requires identifying which of the four heads is weak. The vastus medialis (VMO) is the most common weak point, affecting knee stability. The rectus femoris needs to be trained with hip extended.',
      keyPoints: [
        'Squat to parallel or below for full activation',
        'Pause and squeeze at peak contraction on leg extensions',
        'Unilateral training corrects left-right imbalances',
        'Train 16-22 total sets per week',
      ],
      recommendedExercises: [
        { name: 'Front Squat', reason: 'More upright torso increases quad activation by 20-30% compared to back squat' },
        { name: 'Leg Extension', reason: 'Isolates quadriceps, allows maximum contraction at peak position' },
        { name: 'Sissy Squat', reason: 'Forward knee travel increases quad load, particularly effective for rectus femoris' },
      ],
    },
  },
  quadriceps_femoris: {
    description: 'The quadriceps femoris is a large muscle group on the front of the thigh, consisting of four muscles: rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius. It is one of the strongest muscle groups in the body.',
    functions: [
      'Extends the knee (straightens the leg)',
      'Rectus femoris also flexes the hip',
    ],
    exercises: [
      'Squats',
      'Leg Press',
      'Leg Extension',
      'Lunges',
      'Bulgarian Split Squat',
      'Front Squat',
    ],
    strengthening: {
      strategy: 'Quadriceps strengthening requires identifying which of the four heads is weak. The vastus medialis (VMO) is the most common weak point, affecting knee stability. The rectus femoris needs to be trained with hip extended.',
      keyPoints: [
        'Squat to parallel or below for full activation',
        'Pause and squeeze at peak contraction on leg extensions',
        'Unilateral training corrects left-right imbalances',
        'Train 16-22 total sets per week',
      ],
      recommendedExercises: [
        { name: 'Front Squat', reason: 'More upright torso increases quad activation by 20-30% compared to back squat' },
        { name: 'Leg Extension', reason: 'Isolates quadriceps, allows maximum contraction at peak position' },
        { name: 'Sissy Squat', reason: 'Forward knee travel increases quad load, particularly effective for rectus femoris' },
      ],
    },
  },
  rectus_femoris: {
    description: 'The rectus femoris is the only quadriceps muscle that crosses both the hip and knee joints, originating from the anterior inferior iliac spine and inserting into the patella. It is important for kicking and running.',
    functions: [
      'Extends the knee',
      'Flexes the hip',
      'Plays a crucial role in running and kicking',
    ],
    exercises: [
      'Leg Extension',
      'Hanging Leg Raise',
      'Front Squat',
      'Lunges',
    ],
    strengthening: {
      strategy: 'The rectus femoris is the only two-joint muscle in the quadriceps, with higher activation when the hip is extended (e.g., prone position). Traditional squats provide limited stimulation to the rectus femoris, requiring specific exercises to strengthen it.',
      keyPoints: [
        'Hip extended position increases rectus femoris stretch and activation',
        'Sissy squats and leg extensions are most effective for rectus femoris',
        'Hanging leg raises also train the hip flexion function',
        'Avoid excessive hip flexion movements (like deep squat bottom)',
      ],
      recommendedExercises: [
        { name: 'Sissy Squat', reason: 'Forward knee travel + hip extension maximizes rectus femoris activation' },
        { name: 'Prone Leg Extension', reason: 'Hip extended position increases rectus femoris stretch' },
        { name: 'Hanging Leg Raise', reason: 'Trains the hip flexion function of rectus femoris for complete development' },
      ],
    },
  },
  vastus_lateralis: {
    description: 'The vastus lateralis is the largest of the quadriceps muscles, located on the outer thigh. It originates from the lateral lip of the linea aspera and inserts into the patella.',
    functions: [
      'Extends the knee',
      'Stabilizes the patella',
    ],
    exercises: [
      'Squats',
      'Leg Press',
      'Leg Extension',
      'Wide-Stance Squat',
    ],
  },
  vastus_medialis: {
    description: 'The vastus medialis is located on the inner thigh, with its lower portion forming the distinctive "teardrop" shape. It originates from the medial lip of the linea aspera and inserts into the patella. It is important for knee stability.',
    functions: [
      'Extends the knee',
      'Stabilizes the patella, preventing lateral displacement',
      'Most active in the final 15 degrees of knee extension',
    ],
    exercises: [
      'Narrow-Stance Squat',
      'Leg Extension (terminal range)',
      'Single-Leg Squat',
      'Wall Sit',
    ],
  },
  vastus_intermedius: {
    description: 'The vastus intermedius lies deep to the rectus femoris, the deepest of the quadriceps muscles. It originates from the anterior and lateral surfaces of the femur and inserts into the patella.',
    functions: [
      'Extends the knee',
      'Active in all knee extension movements',
    ],
    exercises: [
      'Squats',
      'Leg Press',
      'Leg Extension',
      'Lunges',
    ],
  },
  sartorius: {
    description: 'The sartorius is the longest muscle in the human body, originating from the anterior superior iliac spine and running diagonally to insert into the medial surface of the tibia. It forms a diagonal line on the anterior inner thigh.',
    functions: [
      'Flexes the hip',
      'Abducts the hip',
      'Laterally rotates the hip',
      'Flexes the knee',
    ],
    exercises: [
      'Cross-Legged Sitting',
      'Hip Flexion Training',
      'Lunges',
    ],
    strengthening: {
      strategy: 'The sartorius is the longest muscle in the body, crossing both the hip and knee joints. It is most active in cross-legged sitting (hip flexion + abduction + external rotation). Rarely isolated in bodybuilding, but affects the anterior inner thigh definition.',
      keyPoints: [
        'Combine hip flexion, abduction, and external rotation movements',
        'Rear leg hip extension in lunges stretches the sartorius',
        'Cross-legged sitting is the best activation position',
        'Usually doesn\'t need isolated training, compound movements cover it',
      ],
      recommendedExercises: [
        { name: 'Seated Hip Abduction Machine', reason: 'Sartorius assists during hip abduction' },
        { name: 'Lunges', reason: 'Front leg hip flexion + rear leg hip extension fully stimulates sartorius' },
        { name: 'Side Lunge', reason: 'Compound hip abduction + flexion movement with high sartorius activation' },
      ],
    },
  },

  // ============================================
  // Posterior Thigh (Hamstrings)
  // ============================================
  hamstrings: {
    description: 'The hamstrings are located on the back of the thigh, consisting of the biceps femoris, semitendinosus, and semimembranosus. They are important muscles for running and jumping.',
    functions: [
      'Flexes the knee (bends the leg)',
      'Extends the hip',
      'Biceps femoris also laterally rotates the lower leg',
    ],
    exercises: [
      'Romanian Deadlift',
      'Leg Curl',
      'Stiff-Leg Deadlift',
      'Nordic Curl',
      'Glute-Ham Raise',
    ],
    strengthening: {
      strategy: 'Hamstrings have two functions: knee flexion and hip extension. Both need to be trained. Hip hinge movements (deadlift variations) train the proximal portion, leg curls train the distal portion.',
      keyPoints: [
        'Emphasize hip hinge on deadlift variations, feel the hamstring stretch',
        'Focus on knee flexion and peak contraction on leg curls',
        'Nordic curls are the best choice for eccentric training',
        'Train 12-16 total sets per week',
      ],
      recommendedExercises: [
        { name: 'Romanian Deadlift', reason: 'Hip hinge pattern with highest hamstring activation in the stretched position' },
        { name: 'Prone Leg Curl', reason: 'Isolates hamstring knee flexion function, allows maximum contraction at peak' },
        { name: 'Nordic Curl', reason: 'Excellent eccentric training effect, helps prevent hamstring strains' },
      ],
    },
  },
  biceps_femoris: {
    description: 'The biceps femoris is located on the lateral posterior thigh, consisting of a long head and short head. The long head originates from the ischial tuberosity, the short head from the linea aspera, both inserting into the fibular head.',
    functions: [
      'Flexes the knee',
      'Long head assists in hip extension',
      'Laterally rotates the lower leg',
    ],
    exercises: [
      'Leg Curl',
      'Romanian Deadlift',
      'Prone Leg Curl',
      'Seated Leg Curl',
    ],
    strengthening: {
      strategy: 'The biceps femoris is located on the lateral posterior thigh. External rotation of the feet increases its activation. The long head requires hip hinge movements, while the short head only needs knee flexion exercises.',
      keyPoints: [
        'Slightly externally rotate feet during leg curls to increase activation',
        'Long head training requires hip extended position',
        'Short head only needs leg curls to train',
        'Balance with medial hamstrings',
      ],
      recommendedExercises: [
        { name: 'Prone Leg Curl (feet externally rotated)', reason: 'External foot rotation increases biceps femoris activation ratio' },
        { name: 'Single-Leg Romanian Deadlift', reason: 'Unilateral training corrects left-right imbalances' },
        { name: 'Seated Leg Curl', reason: 'Hip flexed position increases long head stretch' },
      ],
    },
  },
  long_head_of_biceps_femoris: {
    description: 'The long head of the biceps femoris originates from the ischial tuberosity and is the only part of the hamstrings that crosses the hip joint. It contributes significantly to hip extension.',
    functions: [
      'Flexes the knee',
      'Extends the hip',
      'Laterally rotates the lower leg',
    ],
    exercises: [
      'Romanian Deadlift',
      'Stiff-Leg Deadlift',
      'Glute-Ham Raise',
      'Leg Curl',
    ],
  },
  short_head_of_biceps_femoris: {
    description: 'The short head of the biceps femoris originates from the linea aspera and only crosses the knee joint. It is the only hamstring muscle that does not cross the hip joint.',
    functions: [
      'Flexes the knee',
      'Laterally rotates the lower leg',
    ],
    exercises: [
      'Leg Curl',
      'Prone Leg Curl',
      'Seated Leg Curl',
    ],
  },
  semitendinosus: {
    description: 'The semitendinosus is located on the medial posterior thigh, originating from the ischial tuberosity and inserting into the medial surface of the tibia. Its long tendon is often used in knee ligament reconstruction surgery.',
    functions: [
      'Flexes the knee',
      'Extends the hip',
      'Medially rotates the lower leg',
    ],
    exercises: [
      'Leg Curl',
      'Romanian Deadlift',
      'Nordic Curl',
      'Glute-Ham Raise',
    ],
  },
  semimembranosus: {
    description: 'The semimembranosus lies deep to the semitendinosus, the widest of the hamstring muscles. It originates from the ischial tuberosity and inserts into the posterior medial tibial condyle.',
    functions: [
      'Flexes the knee',
      'Extends the hip',
      'Medially rotates the lower leg',
    ],
    exercises: [
      'Leg Curl',
      'Romanian Deadlift',
      'Stiff-Leg Deadlift',
      'Glute-Ham Raise',
    ],
  },

  // ============================================
  // Medial Thigh (Adductors)
  // ============================================
  adductors: {
    description: 'The adductors are located on the inner thigh, including the adductor magnus, longus, brevis, pectineus, and gracilis. They are responsible for hip adduction.',
    functions: [
      'Adduct the hip (squeeze legs together)',
      'Assist in hip flexion',
      'Assist in hip extension',
      'Stabilize the pelvis',
    ],
    exercises: [
      'Adductor Machine',
      'Sumo Squat',
      'Copenhagen Plank',
      'Side Lunge',
    ],
  },
  adductor_magnus: {
    description: 'The adductor magnus is the largest of the adductor muscles, located deep on the inner thigh. It is divided into adductor and hamstring portions with slightly different functions.',
    functions: [
      'Adducts the hip',
      'Adductor portion assists in hip flexion',
      'Hamstring portion assists in hip extension',
    ],
    exercises: [
      'Sumo Squat',
      'Wide-Stance Leg Press',
      'Adductor Machine',
      'Sumo Deadlift',
    ],
  },
  adductor_longus: {
    description: 'The adductor longus is located superficially on the inner thigh, originating from the pubis and inserting into the middle third of the linea aspera. It is the most palpable of the adductor muscles.',
    functions: [
      'Adducts the hip',
      'Assists in hip flexion',
      'Assists in hip external rotation',
    ],
    exercises: [
      'Adductor Machine',
      'Side Lunge',
      'Sumo Squat',
      'Copenhagen Plank',
    ],
  },
  adductor_brevis: {
    description: 'The adductor brevis lies deep to the adductor longus, originating from the pubis and inserting into the upper third of the linea aspera. It is the shortest of the adductor muscles.',
    functions: [
      'Adducts the hip',
      'Assists in hip flexion',
    ],
    exercises: [
      'Adductor Machine',
      'Side Lunge',
      'Sumo Squat',
    ],
  },
  gracilis: {
    description: 'The gracilis is the most superficial of the adductor muscles, originating from the pubic symphysis and inserting into the medial surface of the tibia. It is the only adductor that crosses the knee joint.',
    functions: [
      'Adducts the hip',
      'Assists in hip flexion',
      'Assists in knee flexion',
    ],
    exercises: [
      'Adductor Machine',
      'Side Lunge',
      'Sumo Squat',
    ],
  },
  pectineus: {
    description: 'The pectineus is located on the upper inner thigh, originating from the pectineal line of the pubis and inserting into the pectineal line of the femur. It is the most superior of the adductor muscles.',
    functions: [
      'Adducts the hip',
      'Flexes the hip',
      'Assists in hip internal rotation',
    ],
    exercises: [
      'Adductor Machine',
      'Hip Flexion Training',
      'Sumo Squat',
    ],
  },


  // ============================================
  // Posterior Leg
  // ============================================
  gastrocnemius: {
    description: 'The gastrocnemius is the most superficial muscle on the back of the lower leg, consisting of medial and lateral heads, forming the main contour of the calf.',
    functions: [
      'Plantarflexes the ankle (points toes down)',
      'Assists in knee flexion',
    ],
    exercises: [
      'Standing Calf Raise',
      'Seated Calf Raise',
      'Donkey Calf Raise',
      'Single-Leg Calf Raise',
    ],
    strengthening: {
      strategy: 'Calf muscles require high frequency and high volume training. Gastrocnemius activation is highest with knee extended (standing calf raise), while soleus activation is highest with knee flexed (seated calf raise).',
      keyPoints: [
        'Standing calf raises emphasize gastrocnemius',
        'Full range of motion with complete stretch at bottom',
        'Pause 1-2 seconds at peak contraction',
        'Can train 3-4 times per week, 15-20 sets per session',
      ],
      recommendedExercises: [
        { name: 'Standing Calf Raise', reason: 'Knee extended position maximizes gastrocnemius activation' },
        { name: 'Single-Leg Calf Raise', reason: 'Unilateral training corrects imbalances with greater load' },
        { name: 'Donkey Calf Raise', reason: 'Hip flexion increases gastrocnemius stretch, classic bodybuilding exercise' },
      ],
    },
  },
  lateral_head_of_gastrocnemius: {
    description: 'The lateral head of the gastrocnemius originates from the posterior surface of the lateral femoral condyle, merging with the medial head to form the Achilles tendon inserting into the calcaneus.',
    functions: [
      'Plantarflexes the ankle',
      'Assists in knee flexion',
    ],
    exercises: [
      'Standing Calf Raise',
      'Single-Leg Calf Raise',
      'Jump Training',
    ],
  },
  medial_head_of_gastrocnemius: {
    description: 'The medial head of the gastrocnemius originates from the posterior surface of the medial femoral condyle, slightly larger than the lateral head, merging to form the Achilles tendon.',
    functions: [
      'Plantarflexes the ankle',
      'Assists in knee flexion',
    ],
    exercises: [
      'Standing Calf Raise',
      'Single-Leg Calf Raise',
      'Jump Training',
    ],
  },
  soleus: {
    description: 'The soleus lies deep to the gastrocnemius, originating from the posterior tibia and fibula and inserting into the calcaneal tendon. It is the primary source of calf endurance.',
    functions: [
      'Plantarflexes the ankle (points toes down)',
      'Maintains posture during standing and walking',
      'Predominantly slow-twitch muscle fibers for endurance',
    ],
    exercises: [
      'Seated Calf Raise',
      'Single-Leg Seated Calf Raise',
      'Bent-Knee Calf Raise',
      'Prolonged Standing Training',
    ],
  },
  plantaris: {
    description: 'The plantaris is a small muscle on the posterior lower leg, originating above the lateral femoral condyle with a very long tendon inserting into the calcaneus. About 10% of people lack this muscle.',
    functions: [
      'Assists in ankle plantarflexion',
      'Assists in knee flexion',
    ],
    exercises: [
      'Calf Raise',
      'Jump Training',
    ],
  },
  popliteus: {
    description: 'The popliteus is located deep in the posterior knee, originating from the lateral femoral condyle and inserting into the posterior tibia. It is the key muscle for "unlocking" the knee joint.',
    functions: [
      'Internally rotates the tibia',
      'Flexes the knee',
      '"Unlocks" the knee joint when initiating flexion from full extension',
    ],
    exercises: [
      'Knee Stability Training',
      'Leg Curl',
    ],
  },
  tibialis_posterior: {
    description: 'The tibialis posterior is the deepest muscle on the posterior lower leg, originating from the posterior tibia, fibula, and interosseous membrane, inserting into multiple bones on the plantar foot.',
    functions: [
      'Plantarflexes the ankle',
      'Inverts the foot',
      'Supports the arch of the foot',
    ],
    exercises: [
      'Calf Raise',
      'Foot Inversion Training',
      'Arch Strengthening',
    ],
  },
  flexor_digitorum_longus: {
    description: 'The flexor digitorum longus originates from the posterior tibia and inserts into the distal phalanges of digits 2-5. It is responsible for toe flexion.',
    functions: [
      'Flexes digits 2-5',
      'Assists in ankle plantarflexion',
      'Assists in foot inversion',
    ],
    exercises: [
      'Towel Toe Curls',
      'Toe Flexion Training',
      'Barefoot Walking',
    ],
  },
  flexor_hallucis_longus: {
    description: 'The flexor hallucis longus originates from the posterior fibula and inserts into the distal phalanx of the great toe. It is the only muscle that can flex the distal phalanx of the great toe.',
    functions: [
      'Flexes the great toe',
      'Assists in ankle plantarflexion',
      'Assists in foot inversion',
    ],
    exercises: [
      'Great Toe Flexion Training',
      'Towel Toe Curls',
      'Barefoot Walking',
    ],
  },

  // ============================================
  // Anterior and Lateral Leg
  // ============================================
  tibialis_anterior: {
    description: 'The tibialis anterior is located on the anterior lower leg, originating from the lateral surface of the tibia and inserting into the first cuneiform and first metatarsal. It is the primary ankle dorsiflexor.',
    functions: [
      'Dorsiflexes the ankle (pulls toes up)',
      'Inverts the foot',
      'Controls foot landing during walking',
    ],
    exercises: [
      'Seated Toe Raise',
      'Banded Dorsiflexion',
      'Walking Backward',
      'Heel Walking',
    ],
  },
  extensor_digitorum_longus: {
    description: 'The extensor digitorum longus originates from the lateral tibial condyle and anterior fibula, inserting into the middle and distal phalanges of digits 2-5.',
    functions: [
      'Extends digits 2-5',
      'Assists in ankle dorsiflexion',
      'Assists in foot eversion',
    ],
    exercises: [
      'Toe Extension Training',
      'Ankle Dorsiflexion Training',
      'Barefoot Walking',
    ],
  },
  extensor_hallucis_longus: {
    description: 'The extensor hallucis longus originates from the anterior fibula and interosseous membrane, inserting into the distal phalanx of the great toe. It is the primary muscle for great toe extension.',
    functions: [
      'Extends the great toe',
      'Assists in ankle dorsiflexion',
      'Assists in foot inversion',
    ],
    exercises: [
      'Great Toe Extension Training',
      'Ankle Dorsiflexion Training',
      'Barefoot Walking',
    ],
  },
  peroneus_longus: {
    description: 'The peroneus longus is located on the lateral lower leg, originating from the fibular head and upper two-thirds of the lateral fibula, inserting into the first metatarsal and first cuneiform.',
    functions: [
      'Plantarflexes the ankle',
      'Everts the foot',
      'Supports the transverse arch',
    ],
    exercises: [
      'Foot Eversion Training',
      'Banded Eversion',
      'Single-Leg Balance Training',
    ],
  },
  fibularis_longus: {
    description: 'The fibularis longus is located on the lateral lower leg, originating from the fibular head and upper two-thirds of the lateral fibula, inserting into the first metatarsal and first cuneiform.',
    functions: [
      'Plantarflexes the ankle',
      'Everts the foot',
      'Supports the transverse arch',
    ],
    exercises: [
      'Foot Eversion Training',
      'Banded Eversion',
      'Single-Leg Balance Training',
    ],
  },
  peroneus_brevis: {
    description: 'The peroneus brevis lies deep to the peroneus longus, originating from the lower two-thirds of the lateral fibula and inserting into the base of the fifth metatarsal.',
    functions: [
      'Plantarflexes the ankle',
      'Everts the foot',
    ],
    exercises: [
      'Foot Eversion Training',
      'Banded Eversion',
      'Single-Leg Balance Training',
    ],
  },
  fibularis_brevis: {
    description: 'The fibularis brevis lies deep to the fibularis longus, originating from the lower two-thirds of the lateral fibula and inserting into the base of the fifth metatarsal.',
    functions: [
      'Plantarflexes the ankle',
      'Everts the foot',
    ],
    exercises: [
      'Foot Eversion Training',
      'Banded Eversion',
      'Single-Leg Balance Training',
    ],
  },
  peroneus_tertius: {
    description: 'The peroneus tertius is part of the extensor digitorum longus, originating from the lower third of the anterior fibula and inserting into the base of the fifth metatarsal.',
    functions: [
      'Dorsiflexes the ankle',
      'Everts the foot',
    ],
    exercises: [
      'Ankle Dorsiflexion Training',
      'Foot Eversion Training',
    ],
  },
  fibularis_tertius: {
    description: 'The fibularis tertius is part of the extensor digitorum longus, originating from the lower third of the anterior fibula and inserting into the base of the fifth metatarsal.',
    functions: [
      'Dorsiflexes the ankle',
      'Everts the foot',
    ],
    exercises: [
      'Ankle Dorsiflexion Training',
      'Foot Eversion Training',
    ],
  },

  // ============================================
  // Foot Muscles
  // ============================================
  extensor_digitorum_brevis: {
    description: 'The extensor digitorum brevis is located on the dorsum of the foot, originating from the calcaneus and inserting into the extensor expansion of digits 2-4. It is the only intrinsic muscle on the dorsum of the foot.',
    functions: [
      'Extends the metatarsophalangeal joints of digits 2-4',
    ],
    exercises: [
      'Toe Extension Training',
      'Barefoot Walking',
    ],
  },
  extensor_hallucis_brevis: {
    description: 'The extensor hallucis brevis is located on the dorsum of the foot, originating from the calcaneus and inserting into the proximal phalanx of the great toe. It is adjacent to the extensor digitorum brevis.',
    functions: [
      'Extends the metatarsophalangeal joint of the great toe',
    ],
    exercises: [
      'Great Toe Extension Training',
      'Barefoot Walking',
    ],
  },
  abductor_hallucis: {
    description: 'The abductor hallucis is located on the medial plantar foot, originating from the calcaneus and inserting into the proximal phalanx of the great toe. It is an important muscle for arch support.',
    functions: [
      'Abducts the great toe',
      'Assists in flexing the great toe',
      'Supports the medial longitudinal arch',
    ],
    exercises: [
      'Great Toe Abduction Training',
      'Short Foot Exercise',
      'Barefoot Walking',
    ],
  },
  flexor_digitorum_brevis: {
    description: 'The flexor digitorum brevis is located in the central plantar foot, originating from the calcaneus and inserting into the middle phalanges of digits 2-5.',
    functions: [
      'Flexes the proximal and middle phalanges of digits 2-5',
      'Supports the arch of the foot',
    ],
    exercises: [
      'Towel Toe Curls',
      'Short Foot Exercise',
      'Barefoot Walking',
    ],
  },
  flexor_hallucis_brevis: {
    description: 'The flexor hallucis brevis is located on the plantar foot, originating from the cuboid and cuneiform bones and inserting into the proximal phalanx of the great toe.',
    functions: [
      'Flexes the metatarsophalangeal joint of the great toe',
    ],
    exercises: [
      'Great Toe Flexion Training',
      'Short Foot Exercise',
      'Barefoot Walking',
    ],
  },
  quadratus_plantae: {
    description: 'The quadratus plantae is located deep in the plantar foot, originating from the calcaneus and inserting into the tendon of the flexor digitorum longus. It adjusts the pull direction of the flexor digitorum longus.',
    functions: [
      'Assists the flexor digitorum longus in flexing the toes',
      'Adjusts the pull direction of the flexor digitorum longus',
    ],
    exercises: [
      'Towel Toe Curls',
      'Plantar Foot Training',
    ],
  },
  foot_lumbricals: {
    description: 'The foot lumbricals are four small muscles in the plantar foot, originating from the tendons of the flexor digitorum longus and inserting into the extensor expansion.',
    functions: [
      'Flex the metatarsophalangeal joints',
      'Extend the interphalangeal joints',
    ],
    exercises: [
      'Fine Toe Movement Training',
      'Barefoot Walking',
    ],
  },
  foot_interossei: {
    description: 'The foot interossei are located between the metatarsals, divided into plantar and dorsal interossei.',
    functions: [
      'Plantar interossei: adduct the toes',
      'Dorsal interossei: abduct the toes',
      'Assist in flexing the metatarsophalangeal joints',
    ],
    exercises: [
      'Toe Abduction/Adduction Training',
      'Barefoot Walking',
    ],
  },
  plantar_interossei: {
    description: 'The plantar interossei are located on the plantar side of the metatarsals, consisting of 3 muscles. They are responsible for toe adduction toward the second toe.',
    functions: [
      'Adduct the toes (toward the second toe)',
      'Assist in flexing the metatarsophalangeal joints',
    ],
    exercises: [
      'Toe Adduction Training',
      'Barefoot Walking',
    ],
  },
  dorsal_interossei_foot: {
    description: 'The dorsal interossei of the foot are located between the metatarsals, consisting of 4 muscles. They are responsible for toe abduction (away from the second toe).',
    functions: [
      'Abduct the toes (away from the second toe)',
      'Assist in flexing the metatarsophalangeal joints',
    ],
    exercises: [
      'Toe Abduction Training',
      'Barefoot Walking',
    ],
  },
  adductor_hallucis: {
    description: 'The adductor hallucis is located deep in the plantar foot, divided into oblique and transverse heads. It is responsible for great toe adduction.',
    functions: [
      'Adducts the great toe',
      'Assists in flexing the great toe',
      'Supports the transverse arch',
    ],
    exercises: [
      'Great Toe Adduction Training',
      'Short Foot Exercise',
    ],
  },
  abductor_digiti_minimi_foot: {
    description: 'The abductor digiti minimi of the foot is located on the lateral plantar foot, originating from the calcaneus and inserting into the proximal phalanx of the little toe.',
    functions: [
      'Abducts the little toe',
      'Assists in flexing the little toe',
    ],
    exercises: [
      'Little Toe Abduction Training',
      'Barefoot Walking',
    ],
  },
  flexor_digiti_minimi_brevis_foot: {
    description: 'The flexor digiti minimi brevis of the foot is located on the lateral plantar foot, originating from the base of the fifth metatarsal and inserting into the proximal phalanx of the little toe.',
    functions: [
      'Flexes the metatarsophalangeal joint of the little toe',
    ],
    exercises: [
      'Toe Flexion Training',
      'Barefoot Walking',
    ],
  },
};
