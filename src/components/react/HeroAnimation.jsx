import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroAnimation() {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        setNodes(Array.from({ length: 20 }).map(() => ({
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            duration: Math.random() * 5 + 5
        })));
    }, []);

    return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            {/* Central Core */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 rounded-full bg-electric-500/20 blur-3xl absolute"
            />

            <div className="relative w-full h-[500px] max-w-lg">
                {nodes.map((node, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-electric-500 rounded-full"
                        initial={{
                            x: node.x,
                            y: node.y,
                            opacity: 0.2
                        }}
                        animate={{
                            x: node.x,
                            y: node.y,
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: node.duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    />
                ))}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255, 68, 0, 0)" />
                            <stop offset="50%" stopColor="rgba(255, 68, 0, 0.2)" />
                            <stop offset="100%" stopColor="rgba(255, 68, 0, 0)" />
                        </linearGradient>
                    </defs>
                    {/* Connection lines would go here mathematically, skipping for perf/simplicity of this visual */}
                </svg>
            </div>
        </div>
    );
}
