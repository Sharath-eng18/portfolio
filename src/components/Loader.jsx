import { useEffect, useRef } from 'react';

const STATUSES = [
  'CLIMBING THE TOWER…',
  'TAKING POSITION…',
  'LOADING WEB FLUID…',
  'INKING THE SKYLINE…',
  'READY TO FIRE!',
];

export default function Loader({ onDone }) {
  const fillRef   = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    let progress = 0, si = 0;
    const interval = setInterval(() => {
      progress = Math.min(100, progress + Math.random() * 14);
      if (fillRef.current)   fillRef.current.style.width = progress + '%';
      if (progress / 100 * STATUSES.length > si && si < STATUSES.length - 1) {
        si++;
        if (statusRef.current) statusRef.current.textContent = STATUSES[si];
      }
      if (progress >= 100) {
        clearInterval(interval);
        if (statusRef.current) statusRef.current.textContent = STATUSES[STATUSES.length - 1];
        setTimeout(onDone, 400);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div id="loader">
      <div className="loader-logo">SHARATH!</div>
      <div className="loader-bar"><i ref={fillRef} id="loadFill" /></div>
      <div className="loader-status" ref={statusRef} id="loadStatus">
        {STATUSES[0]}
      </div>
    </div>
  );
}
