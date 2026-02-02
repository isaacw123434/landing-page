import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- DATA CONSTANTS ---
const RAW_NODES = [
    // Stage 0: Start
    { id: 5, label: "START", depth: 0 },

    // Stage 1: Access Options (Nodes 4, 16, 3, 15)
    { id: 4, label: "Drive", depth: 1 },
    { id: 16, label: "Taxi/Uber", depth: 1 },
    { id: 3, label: "Public Transport", depth: 1 },
    { id: 15, label: "Park & Ride", depth: 1 },

    // Stage 2: Core Journey (Directly from Access)
    { id: 11, label: "Coach Journey", depth: 2 },
    { id: 10, label: "Train Journey", depth: 2 },

    // Stage 3: Last Mile
    { id: 14, label: "Public Transport", depth: 3 },
    { id: 9, label: "Walking", depth: 3 },
    { id: 7, label: "Taxi/Uber", depth: 3 },

    // Stage 4: End
    { id: 17, label: "END", depth: 4 },
];

const RAW_EDGES = [
    // Start -> Access
    { from: 5, to: 4 }, { from: 5, to: 16 }, { from: 5, to: 3 }, { from: 5, to: 15 },

    // Access -> Core Journey (Mixing options)
    { from: 4, to: 11 }, { from: 4, to: 10 },
    { from: 16, to: 11 }, { from: 16, to: 10 },
    { from: 3, to: 11 }, { from: 3, to: 10 },
    { from: 15, to: 11 }, { from: 15, to: 10 },

    // Core Journey -> Last Mile
    { from: 11, to: 14 }, { from: 11, to: 9 }, { from: 11, to: 7 },
    { from: 10, to: 14 }, { from: 10, to: 9 }, { from: 10, to: 7 },

    // Last Mile -> End
    { from: 14, to: 17 }, { from: 9, to: 17 }, { from: 7, to: 17 },
];

// --- DIAGRAM COMPONENT ---
function NeuralDiagram({ activeSection }) {
    const containerRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    // Layout Calculation
    useEffect(() => {
        const calculateLayout = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            const paddingX = Math.max(30, width * 0.05);
            const paddingY = 40;
            const usableWidth = width - (paddingX * 2);
            const usableHeight = height - (paddingY * 2);

            const layers = {};
            RAW_NODES.forEach(n => {
                if (!layers[n.depth]) layers[n.depth] = [];
                layers[n.depth].push(n);
            });

            const calculatedNodes = [];
            const maxDepth = 4;

            Object.keys(layers).forEach(depth => {
                const layerNodes = layers[depth];
                const depthInt = parseInt(depth);
                const layerX = paddingX + (depthInt / maxDepth) * usableWidth;

                layerNodes.forEach((node, index) => {
                    const layerCount = layerNodes.length;
                    let layerY = height / 2;
                    if (layerCount > 1) {
                        const totalLayerHeight = Math.min(usableHeight, layerCount * 90);
                        const step = totalLayerHeight / (layerCount - 1);
                        layerY = (height - totalLayerHeight) / 2 + (step * index);
                    }
                    calculatedNodes.push({ ...node, x: layerX, y: layerY });
                });
            });

            const calculatedEdges = RAW_EDGES.map((edge) => {
                const start = calculatedNodes.find(n => n.id === edge.from);
                const end = calculatedNodes.find(n => n.id === edge.to);
                if (!start || !end) return null;
                return {
                    id: `e-${edge.from}-${edge.to}`,
                    start, end,
                    fromDepth: start.depth,
                    toDepth: end.depth
                };
            }).filter(Boolean);

            setNodes(calculatedNodes);
            setEdges(calculatedEdges);
        };

        calculateLayout();
        window.addEventListener('resize', calculateLayout);
        return () => window.removeEventListener('resize', calculateLayout);
    }, []);

    // Helper: Determine if edge/node is active based on scroll section
    const isEdgeActive = (edge) => {
        // Logic State 1 (First Mile)
        if (activeSection === 1) return edge.fromDepth < 2;
        // Logic State 2 (Core)
        if (activeSection === 2) return edge.fromDepth >= 2 && edge.toDepth <= 3;
        // Logic State 3 (Last Mile)
        if (activeSection === 3) return edge.fromDepth >= 3;
        return false;
    };

    const isNodeActive = (node) => {
        if (activeSection === 1) return node.depth <= 1;
        if (activeSection === 2) return node.depth >= 2 && node.depth <= 3;
        if (activeSection === 3) return node.depth >= 3;
        return false;
    };

    const getPathD = (s, e) => {
        const dist = e.x - s.x;
        return `M ${s.x} ${s.y} C ${s.x + dist * 0.5} ${s.y} ${e.x - dist * 0.5} ${e.y} ${e.x} ${e.y}`;
    };

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <svg className="w-full h-full">
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Passive Edges */}
                {edges.map(edge => (
                    <path
                        key={`bg-${edge.id}`}
                        d={getPathD(edge.start, edge.end)}
                        stroke="#334155"
                        strokeWidth="1"
                        fill="none"
                        className="transition-opacity duration-1000"
                        opacity={0.1}
                    />
                ))}

                {/* Active Edges */}
                {edges.map(edge => {
                    const active = isEdgeActive(edge);
                    return (
                        <motion.path
                            key={`fg-${edge.id}`}
                            d={getPathD(edge.start, edge.end)}
                            stroke="url(#gradient-line)"
                            strokeWidth={active ? 2.5 : 0}
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: active ? 1 : 0,
                                opacity: active ? 1 : 0
                            }}
                            transition={{ duration: 1.0, ease: "easeInOut" }}
                            style={{ filter: 'url(#glow)' }}
                        />
                    );
                })}
            </svg>

            {/* Nodes */}
            {nodes.map(node => {
                const active = isNodeActive(node);
                const isMain = node.depth === 0 || node.depth === 4;
                return (
                    <div
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                        style={{
                            left: node.x,
                            top: node.y,
                            opacity: active ? 1 : 0.2,
                            transform: `translate(-50%, -50%) scale(${active ? 1.05 : 0.95})`
                        }}
                    >
                        <div className={`
                            flex items-center justify-center text-center backdrop-blur-sm border rounded
                            ${active
                                ? 'bg-slate-900/90 border-cyan-500/60 text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                                : 'bg-slate-950/20 border-slate-800/50 text-slate-600'}
                            ${isMain ? 'px-3 py-1.5 text-[10px] md:text-xs font-bold' : 'px-2 py-1 text-[9px] md:text-[10px]'}
                        `}
                        style={{ minWidth: '60px', lineHeight: '1.2' }}
                        >
                            {node.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// --- STORY CARD COMPONENT ---
const StorySection = ({ index, isActive, title, children, align = "start" }) => {
    return (
        <div
            id={`neural-section-${index}`}
            className={`min-h-screen flex items-center p-4 md:p-8 relative z-10 pointer-events-none
                ${align === 'end' ? 'justify-end' : 'justify-start'}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6, once: false }}
                transition={{ duration: 0.8 }}
                className={`
                    max-w-[280px] w-full p-4 rounded-lg bg-slate-950/30 backdrop-blur-sm border border-slate-800/30 pointer-events-auto
                    ${isActive ? 'border-l-2 border-l-cyan-400' : 'border-l-2 border-l-transparent'}
                `}
            >
                <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{title}</h2>
                <div className="text-slate-300 text-xs leading-5">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

// --- MAIN EXPORT ---
const NeuralRoutingSection = () => {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const sections = [0, 1, 2];
            const current = sections.find(idx => {
                const el = document.getElementById(`neural-section-${idx}`);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
            });

            if (current !== undefined && current !== activeSection) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    return (
        <div className="relative bg-slate-950 font-sans text-slate-200">
            {/* Sticky Diagram Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/*
                   We pass activeSection + 1 to NeuralDiagram because:
                   Visual State 1: First Mile (App Section 0)
                   Visual State 2: Core Journey (App Section 1)
                   Visual State 3: Last Mile (App Section 2)
                */}
                <NeuralDiagram activeSection={activeSection + 1} />
            </div>

            {/* Scrolling Content - Pulled up to overlap sticky container */}
            <div className="relative z-10 -mt-[100vh]">

                {/* Section 0: First Mile (Mapped to Visual State 1) */}
                <StorySection index={0} isActive={activeSection === 0} title="The First Mile" align="end">
                    <p>
                        We assess all options for your initial leg. Driving, taxis, or local transit are optimized to connect you to the main network.
                    </p>
                </StorySection>

                {/* Section 1: Core Journey (Mapped to Visual State 2) */}
                <StorySection index={1} isActive={activeSection === 1} title="The Core Journey" align="start">
                    <p>
                        We link you directly to major Coach and Train lines. Your transfer is synchronized for a perfect transition.
                    </p>
                </StorySection>

                {/* Section 2: Last Mile (Mapped to Visual State 3) */}
                <StorySection index={2} isActive={activeSection === 2} title="The Last Mile" align="start">
                    <p>
                        We don't leave you at the station. Walking, ride-shares, or transit options are ready to take you to your final destination.
                    </p>
                </StorySection>

                {/* Spacer */}
                <div className="h-[40vh]"></div>
            </div>
        </div>
    );
};

export default NeuralRoutingSection;
