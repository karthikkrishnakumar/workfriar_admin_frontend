import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import styles from "./custom-scrollbar.module.scss";

/**
 * CustomScrollbar Component
 *
 * A custom scrollbar component that allows users to scroll through a set of items
 * with a draggable thumb. The component supports both mouse and touch interactions.
 *
 * @param {number} totalItems - The total number of items to scroll through.
 * @param {number} visibleItemCount - The number of items visible at a time.
 * @param {function} onScrollPositionChange - Callback function invoked with the current scroll position (0 to 1).
 * @param {string} [className] - Optional additional class names for the component container.
 */
interface CustomScrollbarProps {
  totalItems: number;
  visibleItemCount: number;
  onScrollPositionChange: (position: number) => void;
  className?: string;
  scrollTrackClassName?: string; // Scroll track class
  scrollThumbClassName?: string; // Scroll thumb class
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  totalItems,
  visibleItemCount,
  onScrollPositionChange,
  className = "",
  scrollTrackClassName = "",
  scrollThumbClassName = "",
}) => {
  // State variables
  const [scrollPosition, setScrollPosition] = useState(0); // Current scroll position (0 to 1)
  const [isDragging, setIsDragging] = useState(false); // Tracks if the thumb is being dragged
  const [startX, setStartX] = useState(0); // Starting X coordinate of drag
  const [scrollLeft, setScrollLeft] = useState(0); // Scroll position when dragging started

  // Refs for DOM elements
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLButtonElement>(null);

  // Debounced callback for notifying scroll position changes
  const debouncedScrollPositionChange = useCallback(
    debounce((position: number) => {
      onScrollPositionChange(position); // Notify parent component of the scroll position
    }, 50),
    [onScrollPositionChange]
  );

  useEffect(() => {
    // Update the debounced scroll position whenever scrollPosition changes
    debouncedScrollPositionChange(scrollPosition);
  }, [scrollPosition, debouncedScrollPositionChange]);

  /**
   * Handles the start of a drag event (mouse or touch).
   */
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouchEvent = "touches" in e;
    const clientX = isTouchEvent
      ? (e as React.TouchEvent).touches[0].clientX
      : (e as React.MouseEvent).pageX;

    setIsDragging(true);
    setStartX(clientX - (scrollTrackRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollPosition);
  };

  /**
   * Handles the drag movement (mouse or touch).
   */
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !scrollTrackRef.current || !scrollThumbRef.current)
      return;

    e.preventDefault();
    const isTouchEvent = "touches" in e;
    const clientX = isTouchEvent
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).pageX;

    const x = clientX - scrollTrackRef.current.offsetLeft;
    const walk = x - startX;
    const scrollTrackWidth = scrollTrackRef.current.offsetWidth;
    const thumbWidth = scrollThumbRef.current.offsetWidth;

    let newPosition = scrollLeft + walk / (scrollTrackWidth - thumbWidth);
    newPosition = Math.max(0, Math.min(1, newPosition)); // Clamp between 0 and 1

    setScrollPosition(newPosition);
  };

  /**
   * Handles the end of a drag event (mouse or touch).
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Event listeners for drag events
    const handleTouchStart = (e: TouchEvent) =>
      handleMouseDown(e as unknown as React.TouchEvent);
    const handleTouchMove = (e: TouchEvent) => handleMouseMove(e);
    const handleTouchEnd = () => handleMouseUp();

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Cleanup event listeners
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  // Calculate thumb width and position
  const thumbWidth = Math.max((visibleItemCount / totalItems) * 100, 10); // Minimum thumb width is 10%
  const thumbPosition = scrollPosition * (100 - thumbWidth);

  return (
    <div className={`${className}`}>
      {totalItems > visibleItemCount && (
        <div
          ref={scrollTrackRef}
          className={`${styles.scrollTrack} ${scrollTrackClassName}`}
        >
          <button
            ref={scrollThumbRef}
            className={`${styles.scrollThumb} ${scrollThumbClassName}`}
            style={{
              width: `${thumbWidth + 1.7}%`,
              transform: `translateX(${thumbPosition}%)`,
            }}
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
    </div>
  );
};

export default CustomScrollbar;
