/**
 * quick_mocks_config.js
 * Central configuration for all Quick Mock tests.
 */

window.QUICK_MOCKS_CONFIG = (function () {
    const miscMocks = [
        { id: 1, label: 'Mixed Subjects', category: 'misc', icon: '⚡', isFree: true, path: 'quick_mock_date/quick_mock_01.json' },
        { id: 2, label: 'Physics Focus', category: 'misc', icon: '⚛️', isFree: true, path: 'quick_mock_date/quick_mock_02.json' },
        { id: 3, label: 'Math Challenge', category: 'misc', icon: '📐', isFree: true, path: 'quick_mock_date/quick_mock_03.json' },
        { id: 4, label: 'Biology Basics', category: 'misc', icon: '🧬', isFree: true, path: 'quick_mock_date/quick_mock_04.json' },
        { id: 5, label: 'Chemistry Core', category: 'misc', icon: '🧪', isFree: true, path: 'quick_mock_date/quick_mock_05.json' },
        { id: 6, label: 'All Rounder', category: 'misc', icon: '⚡', isFree: true, path: 'quick_mock_date/quick_mock_06.json' },
        { id: 7, label: 'Conceptual Mix', category: 'misc', icon: '💡', isFree: true, path: 'quick_mock_date/quick_mock_07.json' },
        { id: 8, label: 'Logical Reasoning', category: 'misc', icon: '🧠', isFree: true, path: 'quick_mock_date/quick_mock_08.json' },
        { id: 9, label: 'Quick Drill', category: 'misc', icon: '⚡', isFree: true, path: 'quick_mock_date/quick_mock_09.json' },
        { id: 10, label: 'Rapid Fire', category: 'misc', icon: '🔥', isFree: true, path: 'quick_mock_date/quick_mock_10.json' },
        { id: 11, label: 'Image Special', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_11.json' },
        { id: 12, label: 'Visual Physics', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_12.json' },
        { id: 13, label: 'Diagram Master', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_13.json' },
        { id: 14, label: 'Graph Analysis', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_14.json' },
        { id: 15, label: 'Figure Based', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_15.json' },
        { id: 16, label: 'Visual Chemistry', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_16.json' },
        { id: 17, label: 'Image MCQs', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_17.json' },
        { id: 18, label: 'Picture Quiz', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_18.json' },
        { id: 19, label: 'Very Hard • Images', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_19.json' },
        { id: 20, label: 'Hard Challenge', category: 'misc', icon: '⚡', isFree: false, path: 'quick_mock_date/quick_mock_20.json' },
        { id: 21, label: 'Standard Mix', category: 'misc', icon: '⚡', isFree: false, path: 'quick_mock_date/quick_mock_21.json' },
        { id: 22, label: 'Easy • Images', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_22.json' },
        { id: 23, label: 'Very Easy Mix', category: 'misc', icon: '⚡', isFree: false, path: 'quick_mock_date/quick_mock_23.json' },
        { id: 24, label: 'Very Hard Physics', category: 'misc', icon: '⚛️', isFree: false, path: 'quick_mock_date/quick_mock_24.json' },
        { id: 25, label: 'Very Hard Chemistry', category: 'misc', icon: '🧪', isFree: false, path: 'quick_mock_date/quick_mock_25.json' },
        { id: 26, label: 'Very Hard Math', category: 'misc', icon: '📐', isFree: false, path: 'quick_mock_date/quick_mock_26.json' },
        { id: 27, label: 'Image Special', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_27.json' },
        { id: 28, label: 'Image Special', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_28.json' },
        { id: 29, label: 'Very Hard Biology', category: 'misc', icon: '🧬', isFree: false, path: 'quick_mock_date/quick_mock_29.json' },
        { id: 30, label: 'Very Hard Mixed', category: 'misc', icon: '⚡', isFree: false, path: 'quick_mock_date/quick_mock_30.json' },
        { id: 31, label: 'Image Special', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_31.json' },
        { id: 32, label: 'Image Special', category: 'misc', icon: '🖼️', isFree: false, path: 'quick_mock_date/quick_mock_32.json' },
        { id: 33, label: 'Very Easy Physics', category: 'misc', icon: '⚛️', isFree: false, path: 'quick_mock_date/quick_mock_33.json' },
        { id: 34, label: 'Very Easy Chemistry', category: 'misc', icon: '🧪', isFree: false, path: 'quick_mock_date/quick_mock_34.json' },
        { id: 35, label: 'Very Easy Math', category: 'misc', icon: '📐', isFree: false, path: 'quick_mock_date/quick_mock_35.json' },
        { id: 36, label: 'Very Easy Biology', category: 'misc', icon: '🧬', isFree: false, path: 'quick_mock_date/quick_mock_36.json' },
        { id: 37, label: 'Very Hard Physics', category: 'misc', icon: '⚛️', isFree: false, path: 'quick_mock_date/quick_mock_37.json' },
        { id: 38, label: 'Very Hard Chemistry', category: 'misc', icon: '🧪', isFree: false, path: 'quick_mock_date/quick_mock_38.json' },
        { id: 39, label: 'Very Hard Math', category: 'misc', icon: '📐', isFree: false, path: 'quick_mock_date/quick_mock_39.json' },
        { id: 40, label: 'Very Hard Biology', category: 'misc', icon: '🧬', isFree: false, path: 'quick_mock_date/quick_mock_40.json' }
    ];

    let currentId = 41;

    function generateTopicMocks(subject, topics, icon) {
        const mocks = [];
        topics.forEach((topic, index) => {
            const isFreeTopic = subject === 'physics' && (index === 0 || index === 1);
            for (let i = 1; i <= 4; i++) {
                mocks.push({
                    id: currentId++,
                    label: `${topic.name} - Mock ${String(i).padStart(2, '0')}`,
                    category: subject,
                    icon: icon,
                    isFree: isFreeTopic,
                    path: `subject-wise-quick-mock-test/${subject}/${topic.folder}/mock-${i}.json`
                });
            }
        });
        return mocks;
    }

    const physicsTopics = [
        { name: 'Units and Measurements', folder: '1.unit-and-measurement' },
        { name: 'Motion in a Straight Line', folder: '2.motion-in-a-straight-line' },
        { name: 'Motion in a Plane', folder: '3. motion-in-a-plane' },
        { name: 'Laws of Motion', folder: '4. laws-of-motion' },
        { name: 'Work, Energy and Power', folder: '5. work-energy-and-power' },
        { name: 'System of Particles and Rotational Motion', folder: '6. system-of-particles-and-rotational-motion' },
        { name: 'Gravitation', folder: '7. gravitation' },
        { name: 'Mechanical Properties of Solids', folder: '8. mechanical-properties-of-solids' },
        { name: 'Mechanical Properties of Fluids', folder: '9.mechanical-properties-of-fluids' },
        { name: 'Thermal Properties of Matter', folder: '10. thermal-properties-of-matter' },
        { name: 'Thermodynamics', folder: '11. thermodynamics' },
        { name: 'Kinetic Theory', folder: '12. kinetic-theory' },
        { name: 'Oscillations', folder: '13. oscillations' },
        { name: 'Waves', folder: '14. waves' },
        { name: 'Electric Charges and Fields', folder: '15. electric-charges-and-fields' },
        { name: 'Electrostatic Potential and Capacitance', folder: '16. electrostatic-potential-and-capacitance' },
        { name: 'Current Electricity', folder: '17. current-electricity' },
        { name: 'Moving Charges and Magnetism', folder: '18. moving-charges-and-magnetism' },
        { name: 'Magnetism and Matter', folder: '19. magnetism-and-matter' },
        { name: 'Electromagnetic Induction', folder: '20. electromagnetic-induction' },
        { name: 'Alternating Current', folder: '21.alternating-current' },
        { name: 'Electromagnetic Waves', folder: '22.electromagnetic-waves' },
        { name: 'Ray Optics and Optical Instruments', folder: '23. ray-optics-and-optical-instruments' },
        { name: 'Wave Optics', folder: '24.wave-optics' },
        { name: 'Dual Nature of Radiation and Matter', folder: '25.dual-nature-of-radiation-and-matter' },
        { name: 'Atoms', folder: '26.atoms' },
        { name: 'Nuclei', folder: '27.nuclei' },
        { name: 'Semiconductor Electronics', folder: '28.semiconductor-electronics' }
    ];

    const chemistryTopics = [
        { name: 'Some Basic Concepts of Chemistry', folder: 'some-basic-concepts-of-chemistry' },
        { name: 'Structure of the Atom', folder: 'structure-of-the-atom' },
        { name: 'Classification of Elements and Periodicity', folder: 'classification-of-elements-and-periodicity-in-properties' },
        { name: 'Chemical Bonding and Molecular Structure', folder: 'chemical-bonding-and-molecular-structure' },
        { name: 'The d- & f-block elements', folder: 'd-and-f-block-elements' },
        { name: 'Coordination compounds', folder: 'coordination-compounds' },
        { name: 'Thermodynamics', folder: 'thermodynamics' },
        { name: 'Equilibrium', folder: 'equilibrium' },
        { name: 'Redox Reactions', folder: 'redox-reactions' },
        { name: 'Solutions', folder: 'solutions' },
        { name: 'Electrochemistry', folder: 'electrochemistry' },
        { name: 'Chemical Kinetics', folder: 'chemical-kinetics' },
        { name: 'Organic Chemistry - Basic Principles', folder: 'organic-chemistry-some-basic-principles-and-techniques' },
        { name: 'Hydrocarbons', folder: 'hydrocarbons' },
        { name: 'Haloalkanes and haloarenes', folder: 'haloalkanes-and-haloarenes' },
        { name: 'Alcohols, phenols, and ethers', folder: 'alcohols-phenols-and-ethers' },
        { name: 'Aldehydes, ketones, and carboxylic acids', folder: 'aldehydes-ketones-and-carboxylic-acids' },
        { name: 'Organic compounds containing nitrogen', folder: 'organic-compounds-containing-nitrogen' },
        { name: 'Biomolecules', folder: 'biomolecules' }
    ];

    const mathTopics = [
        { name: 'Sets and Logic', folder: 'sets-and-logic' },
        { name: 'Relations & functions', folder: 'relations-and-functions' },
        { name: 'Basic counting techniques', folder: 'basic-counting-techniques' },
        { name: 'Complex numbers and equations', folder: 'complex-numbers-linear-and-quadratic-equations' },
        { name: 'Trigonometric functions', folder: 'trigonometric-functions' },
        { name: 'Vectors', folder: 'vectors' },
        { name: 'Matrices & determinants', folder: 'matrices-and-determinants' },
        { name: 'Coordinate geometry', folder: 'coordinate-geometry' },
        { name: 'Three-dimensional geometry', folder: 'three-dimensional-geometry' },
        { name: 'Sequences & series', folder: 'sequences-and-series' },
        { name: 'Limit & continuity', folder: 'limit-and-continuity' },
        { name: 'Differentiation', folder: 'differentiation' },
        { name: 'Integration', folder: 'integration' },
        { name: 'Differential equations', folder: 'differential-equations' },
        { name: 'Statistics & Probability', folder: 'statistics-probability-and-linear-programming' }
    ];

    const biologyTopics = [
        { name: 'Diversity in the Living World', folder: 'diversity-in-the-living-world' },
        { name: 'Structural Organisation', folder: 'structural-organisation-in-plants-and-animals' },
        { name: 'Cell: Structure And Functions', folder: 'cell-structure-and-functions' },
        { name: 'Plant Physiology', folder: 'plant-physiology' },
        { name: 'Human Physiology', folder: 'human-physiology' },
        { name: 'Reproduction', folder: 'reproduction' },
        { name: 'Biology In Human Welfare', folder: 'biology-in-human-welfare' },
        { name: 'Biotechnology', folder: 'biotechnology' },
        { name: 'Ecology', folder: 'ecology' }
    ];

    return [
        ...miscMocks,
        ...generateTopicMocks('physics', physicsTopics, '⚛️'),
        ...generateTopicMocks('chemistry', chemistryTopics, '🧪'),
        ...generateTopicMocks('mathematics', mathTopics, '📐'),
        ...generateTopicMocks('biology', biologyTopics, '🧬')
    ];
})();
