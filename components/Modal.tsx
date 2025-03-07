import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 120,
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
  },
};

interface IModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

const Modal: React.FC<IModal> = ({ showModal, setShowModal }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (showText) {
      timer = setTimeout(() => {
        setShowModal(false);
        setShowText(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showText, setShowModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className='fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-black bg-opacity-50'
          variants={backdrop}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <motion.div
            variants={modal}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='max-w-[400px] mx-auto px-6 py-8 bg-white rounded-lg shadow-lg text-center'
          >
            <p className='text-lg font-semibold'>
              Really want to delete this user?
            </p>
            <div className='flex justify-center gap-6 mt-4'>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowText(false);
                }}
                className='text-blue-500 font-medium'
              >
                No
              </button>
              <button
                onClick={() => setShowText(true)}
                className='text-red-500 font-medium'
              >
                Yes
              </button>
            </div>
            {showText && (
              <p className='text-xs text-gray-600 mt-3'>
                * Delete does not work at this time
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
