import { useState, useCallback, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar       from './components/Navbar';
import Loader       from './components/Loader';
import Home         from './pages/Home';
import AboutPage    from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

import { useThreeScene } from './hooks/useThreeScene';
import { useWebTrail }   from './hooks/useWebTrail';
import { useCursor }     from './hooks/useCursor';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const glRef    = useRef(null);
  const trailRef = useRef(null);
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const labelRef = useRef(null);

  const sceneRef = useThreeScene(glRef, reduceMotion);
  useWebTrail(trailRef, reduceMotion);
  useCursor(dotRef, ringRef, labelRef);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded || !sceneRef.current?.tick) return;
    sceneRef.current.tick();
  }, [loaded, sceneRef]);

  return (
    <>
      {/* ── Loader (home only on first visit) ── */}
      {isHome && !loaded && <Loader onDone={handleLoaded} />}

      {/* ── Canvases ── */}
      <canvas id="gl" className={isHome ? 'gl-home' : 'gl-subpage'} ref={glRef}    />
      <canvas id="webTrail" ref={trailRef} />

      {/* ── Cursor ── */}
      <div className="cursor-dot"   ref={dotRef}   />
      <div className="cursor-ring"  ref={ringRef}  />
      <div className="cursor-label" id="cursorLabel" ref={labelRef} />

      {/* ── HUD ── */}
      {(!isHome || loaded) && (
        <>
          <div className="hud hud-tl">SYS // <b>SHARATH.AI</b><br />NODE: HYD-INDIA</div>
          <div className="hud hud-br">WEB FIRED <b id="hudWeb">000%</b><br />SCROLL <b id="hudScroll">000%</b></div>
        </>
      )}

      {/* ── Shared atmosphere layers ── */}
      <div className="halftone"      />
      <div className="halftone-red"  />
      <div className="glow-blob-blue"/>
      <div className="glow-blob-red" />
      <div className="progress"><i id="progFill" /></div>

      {/* ── Nav ── */}
      {(!isHome || loaded) && <Navbar />}

      {/* ── Routes ── */}
      <Routes>
        <Route path="/"         element={<Home         loaded={loaded} />} />
        <Route path="/about"    element={<AboutPage    />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
