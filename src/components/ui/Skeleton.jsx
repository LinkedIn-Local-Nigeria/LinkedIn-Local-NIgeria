import { motion } from 'framer-motion';

export const EventSkeleton = () => {
  return (
    <motion.div
      className="min-w-[300px] shrink-0 relative border border-gray-200 bg-gray-100"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      style={{ height: '420px' }}
    >
      <div className="w-full h-full bg-gray-200" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-full bg-gray-200 rounded mb-4" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
    </motion.div>
  );
};
