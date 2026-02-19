import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">

      {/* Floating Glow 1 */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20 left-1/4
          w-[500px] h-[500px]
          bg-primary/10
          blur-[120px]
          rounded-full
        "
      />

      {/* Floating Glow 2 */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-10 right-1/4
          w-[400px] h-[400px]
          bg-muted/40
          blur-[120px]
          rounded-full
        "
      />

      {/* subtle gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
    </div>
  );
};

export default HeroBackground;
