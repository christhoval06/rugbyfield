import {useRef, useEffect, useCallback} from 'react';
import { basic, greenPalette, redPalette } from '../../constants/colors';

const activeSlot = (slot) => {
  slot.stroke(redPalette[4]);
  slot.fill(greenPalette[4]);
  slot.opacity(0.5);
  slot.cache();
  slot.moveToTop();
};

const deactiveSlot = (slot) => {
  slot.stroke(basic.basic100);
  slot.fill('transparent');
  slot.opacity(0.5);
  slot.cache();
  slot.moveToBottom();
};

export const useDraggable = () => {
  const groupRef = useRef();
  const slotRef = useRef();

  useEffect(() => {
    const group = groupRef.current;
    const slot = slotRef.current;

    return () => {
      group.clearCache();
      slot.clearCache();
    };
  }, []);

  const onDrag = useCallback(() => {
    activeSlot(slotRef.current);
  }, []);

  const onDrop = useCallback(() => {
    deactiveSlot(slotRef.current);
  }, []);

  const onDragLeave = useCallback(() => {
    onDrop();
  }, [onDrop]);

  const onDragEnter = useCallback(() => {
    onDrag();
  }, [onDrag]);

  const onDragOver = useCallback(() => {}, []);

  return {
    groupRef,
    slotRef,
    onDrag,
    onDragLeave,
    onDragEnter,
    onDragOver,
    onDrop,
  };
};
