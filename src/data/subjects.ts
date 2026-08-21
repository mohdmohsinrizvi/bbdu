import { Subject } from "./types";

export const subjects: Subject[] = [
  {
    id: "calculus",
    code: "RBS5103",
    name: "Calculus",
    category: "BSC",
    type: "theory",
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    prerequisite: "12th standard Mathematics",
    objectives: [
      "To develop understanding of limits, continuity, and differentiability of functions.",
      "To apply differential calculus in solving real-world problems.",
      "To understand integral calculus and its applications.",
      "To learn multivariable calculus and vector calculus fundamentals.",
    ],
    outcomes: [
      "CO1: Apply limits, continuity, and differentiability concepts to analyze functions.",
      "CO2: Use differential calculus for curve sketching, optimization, and rate problems.",
      "CO3: Evaluate definite and indefinite integrals using various techniques.",
      "CO4: Apply multivariable and vector calculus concepts in engineering problems.",
    ],
    units: [
      {
        id: "unit-1",
        number: 1,
        title: "Limits, Continuity & Differentiability",
        description:
          "Foundational concepts of limits, continuity, and differentiability of functions.",
        contactHours: 15,
        mappedCO: ["CO1"],
        topics: [
          {
            id: "limits-of-functions",
            title: "Limits of Functions",
            description:
              "Understanding the concept of limits and evaluating limits of various functions using algebraic and analytical methods.",
            orderIndex: 1,
          },
          {
            id: "continuity",
            title: "Continuity",
            description:
              "Learning the definition of continuity at a point and on an interval, and identifying types of discontinuities.",
            orderIndex: 2,
          },
          {
            id: "differentiability",
            title: "Differentiability",
            description:
              "Studying the concept of derivatives, rules of differentiation, and the relationship between differentiability and continuity.",
            orderIndex: 3,
          },
          {
            id: "higher-order-derivatives",
            title: "Higher Order Derivatives",
            description:
              "Computing second and higher order derivatives and their applications in analyzing curves and physical phenomena.",
            orderIndex: 4,
          },
          {
            id: "rolles-theorem-and-mean-value-theorems",
            title: "Rolle's Theorem & Mean Value Theorems",
            description:
              "Understanding Rolle's Theorem, Lagrange's Mean Value Theorem, and Cauchy's Mean Value Theorem with geometric interpretations.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-2",
        number: 2,
        title: "Applications of Derivatives",
        description:
          "Practical applications of derivatives in rate of change, curve analysis, and optimization problems.",
        contactHours: 15,
        mappedCO: ["CO2"],
        topics: [
          {
            id: "rate-of-change",
            title: "Rate of Change",
            description:
              "Applying derivatives to solve problems involving rates of change in physical, biological, and economic contexts.",
            orderIndex: 1,
          },
          {
            id: "tangent-and-normal",
            title: "Tangent & Normal",
            description:
              "Finding equations of tangent and normal lines to curves at given points and their geometric applications.",
            orderIndex: 2,
          },
          {
            id: "curvature",
            title: "Curvature",
            description:
              "Understanding the concept of curvature, radius of curvature, and center of curvature for plane curves.",
            orderIndex: 3,
          },
          {
            id: "maxima-and-minima",
            title: "Maxima & Minima",
            description:
              "Using first and second derivative tests to find local and global extrema of functions and solving optimization problems.",
            orderIndex: 4,
          },
          {
            id: "asymptotes-and-curve-sketching",
            title: "Asymptotes & Curve Sketching",
            description:
              "Identifying asymptotes and using derivatives to sketch curves with all important features.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-3",
        number: 3,
        title: "Integral Calculus",
        description:
          "Techniques and applications of indefinite and definite integrals.",
        contactHours: 15,
        mappedCO: ["CO3"],
        topics: [
          {
            id: "indefinite-integrals",
            title: "Indefinite Integrals",
            description:
              "Learning methods of integration including substitution, partial fractions, and integration by parts.",
            orderIndex: 1,
          },
          {
            id: "definite-integrals",
            title: "Definite Integrals",
            description:
              "Understanding the Fundamental Theorem of Calculus and evaluating definite integrals using various techniques.",
            orderIndex: 2,
          },
          {
            id: "area-under-curves",
            title: "Area Under Curves",
            description:
              "Computing areas bounded by curves, lines, and coordinate axes using definite integrals.",
            orderIndex: 3,
          },
          {
            id: "applications-of-integration",
            title: "Applications of Integration",
            description:
              "Applying integration to find volumes, surface areas, arc lengths, and solving real-world engineering problems.",
            orderIndex: 4,
          },
        ],
      },
      {
        id: "unit-4",
        number: 4,
        title: "Multivariable & Vector Calculus",
        description:
          "Extension of calculus to functions of several variables and vector fields.",
        contactHours: 15,
        mappedCO: ["CO4"],
        topics: [
          {
            id: "partial-derivatives",
            title: "Partial Derivatives",
            description:
              "Computing partial derivatives of functions of several variables and understanding their geometric interpretation.",
            orderIndex: 1,
          },
          {
            id: "tangent-plane-and-normal-line",
            title: "Tangent Plane & Normal Line",
            description:
              "Finding equations of tangent planes and normal lines to surfaces using partial derivatives.",
            orderIndex: 2,
          },
          {
            id: "maxima-and-minima-of-two-variables",
            title: "Maxima & Minima of Two Variables",
            description:
              "Using second derivative test to find local extrema of functions of two variables and solving constrained optimization problems.",
            orderIndex: 3,
          },
          {
            id: "multiple-integrals",
            title: "Multiple Integrals",
            description:
              "Evaluating double and triple integrals and their applications in computing volumes and physical quantities.",
            orderIndex: 4,
          },
          {
            id: "vector-calculus",
            title: "Vector Calculus",
            description:
              "Understanding gradient, divergence, curl, and line integrals with applications in engineering and physics.",
            orderIndex: 5,
          },
        ],
      },
    ],
  },
  {
    id: "computer-concepts-programming-c",
    code: "RCS5101",
    name: "Computer Concepts & Programming in C",
    category: "ESC",
    type: "theory",
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    prerequisite: "Basic knowledge of logical reasoning",
    objectives: [
      "To develop problem-solving skills using the C programming language.",
      "To understand fundamental concepts of C such as data types, operators, control statements, arrays, strings, and functions.",
      "To implement structured and modular programming techniques for real-world computing problems.",
      "To apply pointers, file handling, searching, and sorting techniques in C programs.",
    ],
    outcomes: [
      "CO1: Understand and apply the basic concepts of C programming including data types, variables, operators, and expressions.",
      "CO2: Develop programs using decision-making statements, loops, and arrays to solve computational problems.",
      "CO3: Implement functions, recursion, strings, and pointers using modular programming concepts.",
      "CO4: Design and develop C programs involving file handling.",
    ],
    units: [
      {
        id: "unit-1",
        number: 1,
        title: "Introduction to C & Basic Concepts",
        description:
          "Fundamental building blocks of the C programming language including tokens, data types, operators, and I/O.",
        contactHours: 15,
        mappedCO: ["CO1"],
        topics: [
          {
            id: "history-and-importance-of-c",
            title: "History and Importance of C",
            description:
              "Understanding the evolution of the C language, its features, and its significance in modern computing and system programming.",
            orderIndex: 1,
          },
          {
            id: "c-tokens-keywords-and-identifiers",
            title: "C Tokens Keywords & Identifiers",
            description:
              "Learning about tokens, keywords, identifiers, and rules for naming variables in C programming.",
            orderIndex: 2,
          },
          {
            id: "data-types",
            title: "Data Types",
            description:
              "Understanding built-in data types, type modifiers, sizeof operator, and type casting in C.",
            orderIndex: 3,
          },
          {
            id: "constants-and-variables",
            title: "Constants & Variables",
            description:
              "Declaring and initializing constants and variables, and understanding storage of data in memory.",
            orderIndex: 4,
          },
          {
            id: "storage-classes",
            title: "Storage Classes",
            description:
              "Learning about auto, register, static, and extern storage classes and their scope and lifetime implications.",
            orderIndex: 5,
          },
          {
            id: "operators-and-expressions",
            title: "Operators & Expressions",
            description:
              "Understanding arithmetic, relational, logical, bitwise, and assignment operators and constructing expressions.",
            orderIndex: 6,
          },
          {
            id: "standard-io-functions",
            title: "Standard I/O Functions",
            description:
              "Using printf, scanf, getchar, putchar, gets, puts, and other standard input/output functions in C.",
            orderIndex: 7,
          },
        ],
      },
      {
        id: "unit-2",
        number: 2,
        title: "Control Statements & Functions",
        description:
          "Control flow constructs, iteration, functions, arrays, and user-defined data types in C.",
        contactHours: 15,
        mappedCO: ["CO2"],
        topics: [
          {
            id: "control-statements",
            title: "Control Statements",
            description:
              "Using if, if-else, nested if, switch-case, and conditional operator for decision-making in C programs.",
            orderIndex: 1,
          },
          {
            id: "iteration-and-loops",
            title: "Iteration & Loops",
            description:
              "Implementing for, while, and do-while loops along with break and continue statements for repetitive tasks.",
            orderIndex: 2,
          },
          {
            id: "functions",
            title: "Functions",
            description:
              "Defining and calling functions, understanding parameter passing, return values, recursion, and scope rules.",
            orderIndex: 3,
          },
          {
            id: "arrays",
            title: "Arrays",
            description:
              "Declaring and manipulating one-dimensional and two-dimensional arrays, and understanding array-pointer relationships.",
            orderIndex: 4,
          },
          {
            id: "structures-union-and-enumerated-data-types",
            title: "Structures Union & Enumerated Data Types",
            description:
              "Creating user-defined data types using structures, unions, and enumerations for complex data representation.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-3",
        number: 3,
        title: "Pointers & File Handling",
        description:
          "Advanced C concepts including pointers, dynamic memory, self-referential structures, and file operations.",
        contactHours: 15,
        mappedCO: ["CO3", "CO4"],
        topics: [
          {
            id: "pointers",
            title: "Pointers",
            description:
              "Understanding pointer declarations, pointer arithmetic, pointer to arrays, and pointer to functions.",
            orderIndex: 1,
          },
          {
            id: "dynamic-memory-allocation",
            title: "Dynamic Memory Allocation",
            description:
              "Using malloc, calloc, realloc, and free for dynamic memory management and avoiding memory leaks.",
            orderIndex: 2,
          },
          {
            id: "pointers-in-self-referential-structures",
            title: "Pointers in Self-referential Structures",
            description:
              "Implementing linked lists and other data structures using pointers within self-referential structures.",
            orderIndex: 3,
          },
          {
            id: "file-handling",
            title: "File Handling",
            description:
              "Performing file operations including opening, reading, writing, and closing files using file pointers and functions.",
            orderIndex: 4,
          },
        ],
      },
    ],
  },
  {
    id: "programming-in-c-lab",
    code: "RCS5151",
    name: "Programming in C Lab",
    category: "ESC",
    type: "lab",
    credits: 1,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    prerequisite: "Basic knowledge of logical reasoning",
    objectives: [],
    outcomes: [],
    units: [],
  },
  {
    id: "general-proficiency-1",
    code: "RGP5101",
    name: "General Proficiency",
    category: "GP",
    type: "theory",
    credits: 1,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    prerequisite: "None",
    objectives: [],
    outcomes: [],
    units: [],
  },
  {
    id: "quantum-physics",
    code: "RBS5101",
    name: "Quantum Physics and Advanced Functional Materials",
    category: "BSC",
    type: "theory",
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    prerequisite: "Basic knowledge of Physics and Mathematics",
    objectives: [
      "To understand the fundamental principles of quantum mechanics and wave-particle duality.",
      "To learn about semiconductor physics and quantum devices.",
      "To study advanced functional materials and their properties.",
      "To understand nanomaterials and their applications in engineering.",
    ],
    outcomes: [
      "CO1: Demonstrate understanding of quantum mechanical principles and wave-particle duality.",
      "CO2: Analyze semiconductor physics and quantum confinement effects.",
      "CO3: Evaluate properties and applications of advanced functional materials.",
      "CO4: Understand nanomaterials and their engineering applications.",
    ],
    units: [
      {
        id: "unit-1",
        number: 1,
        title: "Quantum Mechanics Fundamentals",
        description:
          "Core principles of quantum mechanics including wave-particle duality, uncertainty, and Schrodinger equation.",
        contactHours: 15,
        mappedCO: ["CO1"],
        topics: [
          {
            id: "wave-particle-duality",
            title: "Wave-Particle Duality",
            description:
              "Understanding the dual nature of matter and light, de Broglie hypothesis, and experimental evidence of wave-particle duality.",
            orderIndex: 1,
          },
          {
            id: "heisenberg-uncertainty-principle",
            title: "Heisenberg Uncertainty Principle",
            description:
              "Learning the fundamental limit on simultaneously knowing position and momentum of a particle and its implications.",
            orderIndex: 2,
          },
          {
            id: "schrodinger-equation",
            title: "Schrodinger Equation",
            description:
              "Formulating and solving time-dependent and time-independent Schrodinger equations for various potential wells.",
            orderIndex: 3,
          },
          {
            id: "wave-functions-and-probability",
            title: "Wave Functions & Probability",
            description:
              "Interpreting wave functions as probability amplitudes and computing probability densities in quantum systems.",
            orderIndex: 4,
          },
          {
            id: "quantum-states-and-superposition",
            title: "Quantum States & Superposition",
            description:
              "Understanding quantum states, superposition principle, measurement, and collapse of wave functions.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-2",
        number: 2,
        title: "Semiconductor Physics",
        description:
          "Physics of semiconductors, energy bands, and quantum devices.",
        contactHours: 15,
        mappedCO: ["CO2"],
        topics: [
          {
            id: "energy-band-theory",
            title: "Energy Band Theory",
            description:
              "Understanding formation of energy bands in solids, band gaps, and classification of materials as conductors, semiconductors, and insulators.",
            orderIndex: 1,
          },
          {
            id: "intrinsic-and-extrinsic-semiconductors",
            title: "Intrinsic & Extrinsic Semiconductors",
            description:
              "Learning about pure and doped semiconductors, donor and acceptor impurities, and carrier concentration.",
            orderIndex: 2,
          },
          {
            id: "pn-junction",
            title: "PN Junction",
            description:
              "Understanding formation of PN junction, depletion region, barrier potential, and forward and reverse biasing.",
            orderIndex: 3,
          },
          {
            id: "semiconductor-devices",
            title: "Semiconductor Devices",
            description:
              "Studying working principles of diodes, transistors, and other semiconductor devices used in electronic circuits.",
            orderIndex: 4,
          },
          {
            id: "quantum-dots",
            title: "Quantum Dots",
            description:
              "Introduction to quantum dots, quantum confinement effects, and their applications in displays, solar cells, and medical imaging.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-3",
        number: 3,
        title: "Advanced Functional Materials",
        description:
          "Properties and applications of smart, piezoelectric, magnetic, and superconducting materials.",
        contactHours: 15,
        mappedCO: ["CO3"],
        topics: [
          {
            id: "smart-materials",
            title: "Smart Materials",
            description:
              "Understanding materials that respond to external stimuli such as stress, temperature, and electric fields.",
            orderIndex: 1,
          },
          {
            id: "shape-memory-alloys",
            title: "Shape Memory Alloys",
            description:
              "Learning about materials that return to their original shape after deformation and their engineering applications.",
            orderIndex: 2,
          },
          {
            id: "piezoelectric-materials",
            title: "Piezoelectric Materials",
            description:
              "Studying materials that generate electric charge under mechanical stress and their use in sensors and actuators.",
            orderIndex: 3,
          },
          {
            id: "magnetic-materials",
            title: "Magnetic Materials",
            description:
              "Understanding ferromagnetic, antiferromagnetic, and ferrimagnetic materials and their properties.",
            orderIndex: 4,
          },
          {
            id: "superconducting-materials",
            title: "Superconducting Materials",
            description:
              "Exploring materials that exhibit zero electrical resistance below critical temperature and their applications.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-4",
        number: 4,
        title: "Nanomaterials & Applications",
        description:
          "Introduction to nanomaterials, their types, synthesis, and engineering applications.",
        contactHours: 15,
        mappedCO: ["CO4"],
        topics: [
          {
            id: "introduction-to-nanomaterials",
            title: "Introduction to Nanomaterials",
            description:
              "Understanding nanoscale materials, their unique properties, and methods of synthesis and characterization.",
            orderIndex: 1,
          },
          {
            id: "carbon-nanomaterials",
            title: "Carbon Nanomaterials",
            description:
              "Studying carbon nanotubes, fullerenes, and graphene and their remarkable mechanical, electrical, and thermal properties.",
            orderIndex: 2,
          },
          {
            id: "metal-oxide-nanomaterials",
            title: "Metal Oxide Nanomaterials",
            description:
              "Learning about metal oxide nanoparticles such as TiO2, ZnO, and Fe2O3 and their applications.",
            orderIndex: 3,
          },
          {
            id: "nanocomposites",
            title: "Nanocomposites",
            description:
              "Understanding composite materials with nanoscale fillers and their enhanced mechanical and functional properties.",
            orderIndex: 4,
          },
          {
            id: "applications-in-engineering",
            title: "Applications in Engineering",
            description:
              "Exploring applications of nanomaterials in electronics, energy storage, medicine, and environmental engineering.",
            orderIndex: 5,
          },
        ],
      },
    ],
  },
  {
    id: "engineering-mechanics",
    code: "RME5101",
    name: "Engineering Mechanics and Mechatronics",
    category: "ESC",
    type: "theory",
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    prerequisite: "Basic Knowledge Physics and Mathematics",
    objectives: [
      "To understand force systems, equilibrium conditions, and free body diagrams for engineering mechanics analysis.",
      "To understand beam mechanics, support reactions, and friction principles in engineering systems.",
      "To understand centroid, moment of inertia, stress, strain, and their applications in engineering mechanics.",
      "To understand measurement techniques, instrumentation systems, sensors, and mechatronics applications in engineering.",
    ],
    outcomes: [
      "CO1: Analyze equilibrium equations to solve engineering mechanics problems.",
      "CO2: Analyze beams, calculate support reactions, and solve friction-related problems.",
      "CO3: Determine centroid and moment of inertia of bodies and analyze stress-strain behavior of materials.",
      "CO4: Use measurement instruments, analyze errors, and understand sensors and mechatronic systems.",
    ],
    units: [
      {
        id: "unit-1",
        number: 1,
        title: "Force Systems & Equilibrium",
        description:
          "Analysis of concurrent and non-concurrent forces, laws of motion, and equilibrium conditions.",
        contactHours: 15,
        mappedCO: ["CO1"],
        topics: [
          {
            id: "concurrent-and-non-concurrent-forces",
            title: "Concurrent and Non-concurrent Forces",
            description:
              "Understanding types of forces, their classification as concurrent and non-concurrent, and their representations.",
            orderIndex: 1,
          },
          {
            id: "laws-of-motion-and-transmissibility",
            title: "Laws of Motion & Transmissibility",
            description:
              "Applying Newton's laws of motion and the principle of transmissibility to solve force-related problems.",
            orderIndex: 2,
          },
          {
            id: "resultant-of-force-systems",
            title: "Resultant of Force Systems",
            description:
              "Computing the resultant of coplanar and spatial force systems using analytical and graphical methods.",
            orderIndex: 3,
          },
          {
            id: "free-body-diagram-and-equilibrium-equations",
            title: "Free Body Diagram & Equilibrium Equations",
            description:
              "Constructing free body diagrams and applying equilibrium equations to determine unknown forces and reactions.",
            orderIndex: 4,
          },
        ],
      },
      {
        id: "unit-2",
        number: 2,
        title: "Beam Mechanics & Friction",
        description:
          "Types of beams, support reactions, and principles of friction in engineering systems.",
        contactHours: 15,
        mappedCO: ["CO2"],
        topics: [
          {
            id: "types-of-support-load-and-beam",
            title: "Types of Support Load & Beam",
            description:
              "Classifying supports, loads, and beam types including simply supported, cantilever, and overhanging beams.",
            orderIndex: 1,
          },
          {
            id: "reactions-from-beam-supports",
            title: "Reactions from Beam Supports",
            description:
              "Calculating support reactions for various beam configurations using equilibrium equations.",
            orderIndex: 2,
          },
          {
            id: "laws-of-coulomb-friction",
            title: "Laws of Coulomb Friction",
            description:
              "Understanding the laws of dry friction, angle of friction, and solving problems involving friction on inclined planes.",
            orderIndex: 3,
          },
          {
            id: "belt-friction-and-applications",
            title: "Belt Friction and Applications",
            description:
              "Analyzing belt friction and its applications in belt drives, braking systems, and power transmission.",
            orderIndex: 4,
          },
        ],
      },
      {
        id: "unit-3",
        number: 3,
        title: "Centroid, Moment of Inertia & Stress-Strain",
        description:
          "Geometric properties of areas, mass properties, and fundamental mechanics of materials.",
        contactHours: 15,
        mappedCO: ["CO3"],
        topics: [
          {
            id: "centroid-of-plane-figures",
            title: "Centroid of Plane Figures",
            description:
              "Determining the centroid and center of gravity of composite plane figures using integration and composite area methods.",
            orderIndex: 1,
          },
          {
            id: "moment-of-inertia-and-parallel-axes-theorem",
            title: "Moment of Inertia & Parallel Axes Theorem",
            description:
              "Computing moment of inertia of plane areas and applying parallel and perpendicular axes theorems.",
            orderIndex: 2,
          },
          {
            id: "normal-and-shear-stresses",
            title: "Normal and Shear Stresses",
            description:
              "Understanding normal and shear stress concepts, stress distribution, and stress on inclined planes.",
            orderIndex: 3,
          },
          {
            id: "stress-strain-diagrams-and-elastic-constants",
            title: "Stress-Strain Diagrams & Elastic Constants",
            description:
              "Analyzing stress-strain curves for different materials and understanding Young's modulus, Poisson's ratio, and bulk modulus.",
            orderIndex: 4,
          },
        ],
      },
      {
        id: "unit-4",
        number: 4,
        title: "Measurement, Instrumentation & Mechatronics",
        description:
          "Measurement systems, error analysis, sensors, and mechatronics fundamentals.",
        contactHours: 15,
        mappedCO: ["CO4"],
        topics: [
          {
            id: "concept-of-measurement-and-errors",
            title: "Concept of Measurement & Errors",
            description:
              "Understanding measurement systems, types of errors, error analysis, and accuracy in engineering measurements.",
            orderIndex: 1,
          },
          {
            id: "pressure-temperature-force-measurement",
            title: "Pressure Temperature Force Measurement",
            description:
              "Learning measurement techniques for pressure, temperature, and force using various instruments and transducers.",
            orderIndex: 2,
          },
          {
            id: "mechatronics-systems-and-sensors",
            title: "Mechatronics Systems & Sensors",
            description:
              "Understanding mechatronics systems integration and various sensors used in automated engineering systems.",
            orderIndex: 3,
          },
          {
            id: "industrial-automation-and-robotics",
            title: "Industrial Automation & Robotics",
            description:
              "Exploring concepts of industrial automation, PLC systems, and robotic systems in modern manufacturing.",
            orderIndex: 4,
          },
        ],
      },
    ],
  },
  {
    id: "basic-electronics",
    code: "REC5101",
    name: "Basic Electronics Engineering",
    category: "ESC",
    type: "theory",
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    prerequisite: "Knowledge of Physics and Mathematics",
    objectives: [
      "Basic Idea of Semiconductor Physics.",
      "Comprehensive Idea of Basic Electronic devices like Diode, BJT and JFET.",
      "Fundamental Principle of Operational Amplifier and Its Application.",
      "To have an Idea about Digital Electronics.",
    ],
    outcomes: [
      "CO1: Understanding the Basic concept of semiconductor material (N type and P type), fundamentals of electronic Devices like Diode and its application as Rectifier, LED, Photo Diode and Varactor Diode.",
      "CO2: Analyzing the fundamentals of electronic devices like BJT and JFET.",
      "CO3: Understanding the principles of Operational Amplifier and its application.",
      "CO4: Evaluate the Number system, Boolean algebra, logic gates.",
    ],
    units: [
      {
        id: "unit-1",
        number: 1,
        title: "Diodes",
        description:
          "Semiconductor physics, PN junction diodes, and their applications in rectification and special purposes.",
        contactHours: 15,
        mappedCO: ["CO1"],
        topics: [
          {
            id: "energy-band-theory-and-semiconductors",
            title: "Energy Band Theory & Semiconductors",
            description:
              "Understanding energy bands, band gaps, intrinsic and extrinsic semiconductors, and charge carrier concentration.",
            orderIndex: 1,
          },
          {
            id: "pn-junction-diode-and-biasing",
            title: "PN Junction Diode & Biasing",
            description:
              "Learning about PN junction formation, depletion region, forward and reverse biasing, and knee voltage.",
            orderIndex: 2,
          },
          {
            id: "vi-characteristics",
            title: "V-I Characteristics",
            description:
              "Analyzing voltage-current characteristics of diodes and understanding their electrical behavior under different biasing conditions.",
            orderIndex: 3,
          },
          {
            id: "diode-as-rectifier",
            title: "Diode as Rectifier",
            description:
              "Implementing half-wave and full-wave rectifiers and understanding filter circuits for DC power supply.",
            orderIndex: 4,
          },
          {
            id: "special-purpose-diodes",
            title: "Special Purpose Diodes",
            description:
              "Studying Zener diode, LED, photodiode, varactor diode, and tunnel diode and their specific applications.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-2",
        number: 2,
        title: "Transistors & JFET",
        description:
          "BJT and JFET construction, working, configurations, and amplifier applications.",
        contactHours: 15,
        mappedCO: ["CO2"],
        topics: [
          {
            id: "transistor-construction-and-working",
            title: "Transistor Construction & Working",
            description:
              "Understanding BJT construction, working principle, and current flow mechanism in NPN and PNP transistors.",
            orderIndex: 1,
          },
          {
            id: "bjt-configurations-ce-cb-cc",
            title: "BJT Configurations CE CB CC",
            description:
              "Analyzing common emitter, common base, and common collector configurations and their characteristics.",
            orderIndex: 2,
          },
          {
            id: "biasing-methods",
            title: "Biasing Methods",
            description:
              "Learning different biasing techniques including fixed bias, voltage divider bias, and self-bias for stable operation.",
            orderIndex: 3,
          },
          {
            id: "transistor-amplifying-action",
            title: "Transistor Amplifying Action",
            description:
              "Understanding how transistors amplify small signals and analyzing voltage gain, current gain, and input impedance.",
            orderIndex: 4,
          },
          {
            id: "jfet-construction-and-characteristics",
            title: "JFET Construction & Characteristics",
            description:
              "Studying JFET construction, working principle, drain characteristics, and transfer characteristics.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-3",
        number: 3,
        title: "Op-Amp & Digital Electronics",
        description:
          "Operational amplifier fundamentals, applications, and introduction to digital electronics.",
        contactHours: 15,
        mappedCO: ["CO3", "CO4"],
        topics: [
          {
            id: "operational-amplifier-ic741",
            title: "Operational Amplifier IC741",
            description:
              "Understanding op-amp internal structure, ideal characteristics, and practical parameters of the IC741 op-amp.",
            orderIndex: 1,
          },
          {
            id: "op-amp-configurations",
            title: "Op-Amp Configurations",
            description:
              "Analyzing inverting, non-inverting, summing, and difference amplifier configurations using op-amps.",
            orderIndex: 2,
          },
          {
            id: "op-amp-applications",
            title: "Op-Amp Applications",
            description:
              "Implementing comparators, integrators, differentiators, oscillators, and active filters using operational amplifiers.",
            orderIndex: 3,
          },
          {
            id: "number-systems-and-codes",
            title: "Number Systems & Codes",
            description:
              "Converting between binary, octal, decimal, and hexadecimal number systems and understanding BCD and Gray codes.",
            orderIndex: 4,
          },
          {
            id: "boolean-algebra-and-logic-gates",
            title: "Boolean Algebra & Logic Gates",
            description:
              "Applying Boolean algebra for simplifying logic expressions and understanding AND, OR, NOT, NAND, NOR, and XOR gates.",
            orderIndex: 5,
          },
        ],
      },
    ],
  },
  {
    id: "environment-ecological-sustainability",
    code: "RBSA5103",
    name: "Environment & Ecological Sustainability",
    category: "BSC",
    type: "theory",
    credits: 3,
    lectureHours: 2,
    tutorialHours: 1,
    practicalHours: 0,
    prerequisite: "None",
    objectives: [
      "To understand the structure and function of ecosystems and biodiversity.",
      "To learn about natural resources and sustainability concepts.",
      "To understand environmental pollution and control measures.",
      "To develop awareness about environmental impact assessment and green technology.",
    ],
    outcomes: [
      "CO1: Understand the structure and function of ecosystems and biodiversity.",
      "CO2: Evaluate natural resources and apply sustainability concepts.",
      "CO3: Analyze environmental pollution sources and control measures.",
      "CO4: Understand environmental impact assessment and green technology applications.",
    ],
    units: [
      {
        id: "unit-1",
        number: 1,
        title: "Environment & Ecosystems",
        description:
          "Introduction to environment, ecosystem structure, biodiversity, and biogeochemical cycles.",
        contactHours: 15,
        mappedCO: ["CO1"],
        topics: [
          {
            id: "introduction-to-environment",
            title: "Introduction to Environment",
            description:
              "Understanding the components of the environment, its importance, and the relationship between humans and the environment.",
            orderIndex: 1,
          },
          {
            id: "ecosystem-structure-and-function",
            title: "Ecosystem Structure & Function",
            description:
              "Learning about ecosystem components, food chains, food webs, energy flow, and ecological succession.",
            orderIndex: 2,
          },
          {
            id: "biodiversity",
            title: "Biodiversity",
            description:
              "Understanding levels of biodiversity, patterns of biodiversity, and threats to biodiversity including habitat loss.",
            orderIndex: 3,
          },
          {
            id: "biogeochemical-cycles",
            title: "Biogeochemical Cycles",
            description:
              "Studying carbon, nitrogen, water, and phosphorus cycles and their importance in maintaining ecological balance.",
            orderIndex: 4,
          },
          {
            id: "environmental-problems",
            title: "Environmental Problems",
            description:
              "Identifying major environmental problems such as global warming, ozone depletion, and loss of biodiversity.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-2",
        number: 2,
        title: "Natural Resources & Sustainability",
        description:
          "Overview of natural resources, their classification, and sustainability principles.",
        contactHours: 15,
        mappedCO: ["CO2"],
        topics: [
          {
            id: "natural-resources-overview",
            title: "Natural Resources Overview",
            description:
              "Understanding the classification and distribution of natural resources on Earth.",
            orderIndex: 1,
          },
          {
            id: "renewable-and-non-renewable-resources",
            title: "Renewable & Non-renewable Resources",
            description:
              "Differentiating between renewable and non-renewable resources and understanding their utilization patterns.",
            orderIndex: 2,
          },
          {
            id: "water-and-forest-resources",
            title: "Water & Forest Resources",
            description:
              "Studying the importance, conservation, and management of water and forest resources.",
            orderIndex: 3,
          },
          {
            id: "energy-resources",
            title: "Energy Resources",
            description:
              "Exploring conventional and non-conventional energy sources including solar, wind, and biomass energy.",
            orderIndex: 4,
          },
          {
            id: "sustainability-concepts",
            title: "Sustainability Concepts",
            description:
              "Understanding sustainable development, sustainable development goals, and the role of technology in sustainability.",
            orderIndex: 5,
          },
        ],
      },
      {
        id: "unit-3",
        number: 3,
        title: "Environmental Pollution & Control",
        description:
          "Types of environmental pollution, their sources, effects, and control measures.",
        contactHours: 15,
        mappedCO: ["CO3"],
        topics: [
          {
            id: "air-pollution",
            title: "Air Pollution",
            description:
              "Understanding sources, effects, and control measures for air pollution including industrial and vehicular emissions.",
            orderIndex: 1,
          },
          {
            id: "water-pollution",
            title: "Water Pollution",
            description:
              "Studying sources of water pollution, water quality parameters, and water treatment and management techniques.",
            orderIndex: 2,
          },
          {
            id: "soil-pollution",
            title: "Soil Pollution",
            description:
              "Identifying causes of soil pollution, its effects on agriculture and health, and remediation strategies.",
            orderIndex: 3,
          },
          {
            id: "noise-pollution",
            title: "Noise Pollution",
            description:
              "Understanding sources, health effects, and control measures for noise pollution in urban and industrial areas.",
            orderIndex: 4,
          },
          {
            id: "environmental-impact-assessment-and-green-technology",
            title: "Environmental Impact Assessment & Green Technology",
            description:
              "Learning the EIA process, sustainable engineering practices, and green technologies for pollution prevention.",
            orderIndex: 5,
          },
        ],
      },
    ],
  },
  {
    id: "engineering-mechanics-lab",
    code: "RME5151",
    name: "Engineering Mechanics and Mechatronics Lab",
    category: "ESC",
    type: "lab",
    credits: 1,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    prerequisite: "Basic Knowledge Physics and Mathematics",
    objectives: [],
    outcomes: [],
    units: [],
  },
  {
    id: "workshop-practices",
    code: "RME5153",
    name: "Workshop Practices",
    category: "ESC",
    type: "lab",
    credits: 1,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    prerequisite: "None",
    objectives: [],
    outcomes: [],
    units: [],
  },
  {
    id: "quantum-physics-lab",
    code: "RBS5151",
    name: "Quantum Physics and Advanced Functional Materials Lab",
    category: "BSC",
    type: "lab",
    credits: 1,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    prerequisite: "Basic knowledge of Physics and Mathematics",
    objectives: [],
    outcomes: [],
    units: [],
  },
];
