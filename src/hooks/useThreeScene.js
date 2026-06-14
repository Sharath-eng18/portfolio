import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import spidermanImg from '../assets/spiderman_89.png';

export function useThreeScene(canvasRef, reduceMotion) {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0D0D14, 26, 60);
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
    camera.position.set(0, 5, 14);

    const INK = 0xE8E6F0, RED = 0xFF3D4E, BLUE = 0x4D6FFF;

    /* ---------- CITY SKYLINE ---------- */
    function windowTexture(w, h) {
      const c = document.createElement('canvas');
      c.width = 64; c.height = 128;
      const x = c.getContext('2d');
      x.fillStyle = '#12121A'; x.fillRect(0, 0, 64, 128);
      x.fillStyle = 'rgba(232,230,240,.06)';
      for (let r = 8; r < 124; r += 14) {
        for (let col = 8; col < 60; col += 14) {
          if (Math.random() < .55) x.fillRect(col, r, 7, 8);
          else if (Math.random() < .4) {
            x.fillStyle = 'rgba(77,111,255,.4)';
            x.fillRect(col, r, 7, 8);
            x.fillStyle = 'rgba(232,230,240,.06)';
          } else {
            x.fillStyle = 'rgba(255,210,52,.5)';
            x.fillRect(col, r, 7, 8);
            x.fillStyle = 'rgba(232,230,240,.06)';
          }
        }
      }
      const t = new THREE.CanvasTexture(c);
      t.repeat.set(Math.max(1, Math.round(w / 1.4)), Math.max(1, Math.round(h / 2.4)));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    }

    const city = new THREE.Group();
    const buildingDefs = [
      [-13, 3, 7, -6], [-9.5, 2.6, 10, -5], [-6, 3.4, 14, -4.5], [-2.4, 2.4, 8, -6.5],
      [0.8, 3, 11, -5.5], [4.4, 2.8, 9, -6], [8.2, 3.6, 12.5, -2.6],
      [12.6, 3, 8, -6.2], [16.2, 3.4, 10.5, -5.4], [-17, 3, 9, -7], [19.8, 2.8, 7.5, -7]
    ];
    const HERO_BIDX = 6, HERO_BH = 12.5;
    let heroBuilding = null;
    buildingDefs.forEach((d, i) => {
      const [bx, bw, bh, bz] = d;
      const g = new THREE.BoxGeometry(bw, bh, bw);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: windowTexture(bw, bh) }));
      m.position.set(bx, bh / 2 - 4.5, bz);
      city.add(m);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(g),
        new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .9 })
      );
      edges.position.copy(m.position);
      city.add(edges);
      const ledge = new THREE.Mesh(
        new THREE.BoxGeometry(bw + .3, .22, bw + .3),
        new THREE.MeshBasicMaterial({ color: INK })
      );
      ledge.position.set(bx, bh - 4.5 + .11, bz);
      city.add(ledge);
      if (i === HERO_BIDX) heroBuilding = m;
    });
    scene.add(city);

    /* distant silhouette */
    const farRow = new THREE.Group();
    for (let i = 0; i < 16; i++) {
      const w = 2 + Math.random() * 2.5, h = 4 + Math.random() * 8;
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: 0x0A0A12, transparent: true, opacity: .8 })
      );
      m.position.set(-22 + i * 3, h / 2 - 4.5, -16);
      farRow.add(m);
    }
    scene.add(farRow);

    /* clouds */
    const clouds = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const cg = new THREE.Group();
      for (let b = 0; b < 4; b++) {
        const s = new THREE.Mesh(
          new THREE.SphereGeometry(.7 + Math.random() * .5, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0x1E1E2E, transparent: true, opacity: .5 })
        );
        s.position.set(b * .9 - 1.3, Math.random() * .3, 0);
        cg.add(s);
        const o = new THREE.LineSegments(
          new THREE.EdgesGeometry(s.geometry),
          new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .12 })
        );
        o.position.copy(s.position); cg.add(o);
      }
      cg.position.set(-14 + i * 9, 6.5 + Math.random() * 3, -10 - Math.random() * 4);
      cg.userData = { sp: .08 + Math.random() * .12 };
      clouds.add(cg);
    }
    scene.add(clouds);

    /* ---------- SPIDER-MAN HERO (Canvas-painted billboard) ---------- */
    const hero = new THREE.Group();

    const textureLoader = new THREE.TextureLoader();
    const spiderTex = textureLoader.load(spidermanImg);
    spiderTex.colorSpace = THREE.SRGBColorSpace;

    const planeH = 4.2, planeW = planeH * (1067 / 1044);
    const heroPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(planeW, planeH),
      new THREE.MeshBasicMaterial({
        map: spiderTex, transparent: true,
        side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.05
      })
    );
    heroPlane.position.set(0, planeH / 2 - 0.6, 0);
    hero.add(heroPlane);

    hero.scale.setScalar(1.1);
    const perch = new THREE.Vector3(
      heroBuilding.position.x - .4,
      heroBuilding.position.y + (HERO_BH / 2) + .25,
      heroBuilding.position.z + 1.2
    );
    hero.position.copy(perch);
    const HERO_BASE_ROT = 2.75;
    hero.rotation.y = HERO_BASE_ROT;
    scene.add(hero);

    // Position camera to resting state and orient billboard before creating web
    camera.position.set(0, 5, 14);
    heroPlane.lookAt(camera.position);
    hero.updateMatrixWorld(true);
    heroPlane.updateMatrixWorld(true);

    const handPlaneLocal = new THREE.Vector3(2.01, 1.94, 0.02);
    function handWorld() { return heroPlane.localToWorld(handPlaneLocal.clone()); }

    /* ---------- MOON ---------- */
    const moon = new THREE.Group();
    const moonDisc  = new THREE.Mesh(new THREE.CircleGeometry(4.6, 48), new THREE.MeshBasicMaterial({ color: 0x2A1A4A }));
    const moonRing  = new THREE.Mesh(new THREE.RingGeometry(4.6, 4.78, 48), new THREE.MeshBasicMaterial({ color: 0x6040A0 }));
    const moonRing2 = new THREE.Mesh(new THREE.RingGeometry(5.1, 5.16, 48), new THREE.MeshBasicMaterial({ color: 0x4D6FFF, transparent: true, opacity: .3 }));
    moon.add(moonDisc, moonRing, moonRing2);
    for (let i = 0; i < 7; i++) {
      const cr = new THREE.Mesh(
        new THREE.CircleGeometry(.22 + Math.random() * .4, 20),
        new THREE.MeshBasicMaterial({ color: 0x1A0D33 })
      );
      const a = Math.random() * Math.PI * 2, r = Math.random() * 3.4;
      cr.position.set(Math.cos(a) * r, Math.sin(a) * r, .01);
      moon.add(cr);
    }
    moon.position.set(perch.x + .6, perch.y + 2.6, perch.z - 6.5);
    scene.add(moon);

    /* ---------- WEB ---------- */
    const WEB_SEGS = 900, RADIAL = 6;
    function buildWebCurve() {
      const h = handWorld();
      const pts = [
        h,
        h.clone().add(new THREE.Vector3(-3.2, 2.6, 1.2)),
        new THREE.Vector3(3.5, 8, -1),
        new THREE.Vector3(-1, 5, 2.5),
        new THREE.Vector3(-6, 9, -2),
        new THREE.Vector3(-11, 5.5, 3),
        new THREE.Vector3(-16, 10, -3),
        new THREE.Vector3(-21, 6.5, 2),
        new THREE.Vector3(-27, 10.5, -4),
        new THREE.Vector3(-33, 7.5, 1)
      ];
      return new THREE.CatmullRomCurve3(pts);
    }
    let webCurve = buildWebCurve();
    const webGeo = new THREE.TubeGeometry(webCurve, WEB_SEGS, .045, RADIAL, false);
    const web = new THREE.Mesh(webGeo, new THREE.MeshBasicMaterial({ color: INK }));
    web.geometry.setDrawRange(0, 0);
    scene.add(web);
    const web2 = new THREE.Mesh(
      new THREE.TubeGeometry(webCurve, WEB_SEGS, .016, RADIAL, false),
      new THREE.MeshBasicMaterial({ color: RED })
    );
    web2.position.y = .09;
    web2.geometry.setDrawRange(0, 0);
    scene.add(web2);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(.14, 10, 10), new THREE.MeshBasicMaterial({ color: RED }));
    const tipRing = new THREE.Mesh(
      new THREE.TorusGeometry(.3, .02, 6, 24),
      new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: .7 })
    );
    scene.add(tip, tipRing);

    const checkpoints = [];
    [.22, .45, .68, .9].forEach((at) => {
      const grp = new THREE.Group();
      const SP = 10;
      for (let s = 0; s < SP; s++) {
        const a = s / SP * Math.PI * 2;
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(a) * .9, Math.sin(a) * .9, 0)
        ]);
        grp.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .8 })));
      }
      for (let r = .25; r <= .85; r += .2) {
        const ringPts = [];
        for (let s = 0; s <= SP; s++) {
          const a = s / SP * Math.PI * 2;
          ringPts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
        }
        grp.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(ringPts),
          new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .6 })
        ));
      }
      const p = webCurve.getPointAt(at);
      grp.position.copy(p);
      grp.scale.setScalar(0);
      grp.userData = { at, shown: false };
      scene.add(grp);
      checkpoints.push(grp);
    });

    /* ---------- scroll ---------- */
    let webProgress = 0, webTarget = 0;
    const progFill    = document.getElementById('progFill');
    const hudWeb      = document.getElementById('hudWeb');
    const hudScroll   = document.getElementById('hudScroll');

    function onScroll() {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      webTarget = p;
      if (progFill)  progFill.style.width = p * 100 + '%';
      if (hudScroll) hudScroll.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- camera ---------- */
    const camBase = { x: 0, y: 5, z: 14 };
    const mouse = { x: 0, y: 0 };
    function onMove(e) { mouse.x = e.clientX / innerWidth - .5; mouse.y = e.clientY / innerHeight - .5; }
    window.addEventListener('pointermove', onMove);

    /* ---------- click shots ---------- */
    const shots = [];
    const WORDS = ['THWACK!', 'BAM!', 'ZAP!', 'GOTCHA!', 'SNAP!'];

    function comicBurst(x, y) {
      const el = document.createElement('div');
      el.className = 'burst';
      el.style.left = x + 'px'; el.style.top = y + 'px';
      const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      const col = Math.random() < .5 ? '#E0202F' : '#2342D6';
      el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,2 58,30 88,12 70,38 98,46 70,56 86,84 56,68 50,98 42,68 14,86 30,56 2,48 30,40 12,12 42,30" fill="${col}" stroke="rgba(232,230,240,.3)" stroke-width="2"/></svg><b>${word}</b>`;
      document.body.appendChild(el);
      // manual animation fallback (no gsap dependency in this hook)
      el.animate([{ transform: 'translate(-50%,-50%) scale(0) rotate(-20deg)' }, { transform: 'translate(-50%,-50%) scale(1) rotate(6deg)' }], { duration: 350, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' });
      setTimeout(() => {
        el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translate(-50%,-50%) scale(0) rotate(6deg)' }], { duration: 300, fill: 'forwards' }).onfinish = () => el.remove();
      }, 550);
    }

    function webSplat(x, y) {
      const el = document.createElement('div');
      el.className = 'websplat';
      el.style.left = x + 'px'; el.style.top = y + 'px';
      let spokes = '', rings = '';
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2;
        spokes += `<line x1="60" y1="60" x2="${60 + Math.cos(a) * 56}" y2="${60 + Math.sin(a) * 56}"/>`;
      }
      for (let r = 14; r <= 52; r += 13) {
        let d = '';
        for (let i = 0; i <= 10; i++) {
          const a = i / 10 * Math.PI * 2;
          d += (i === 0 ? 'M' : 'L') + (60 + Math.cos(a) * r) + ',' + (60 + Math.sin(a) * r);
        }
        rings += `<path d="${d}Z" fill="none"/>`;
      }
      el.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" stroke="#E8E6F0" stroke-width="1.6" opacity=".5">${spokes}${rings}</svg>`;
      document.body.appendChild(el);
      el.animate([{ transform: 'translate(-50%,-50%) scale(.2)', opacity: '1' }, { transform: 'translate(-50%,-50%) scale(1)', opacity: '1' }], { duration: 300, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' });
      setTimeout(() => {
        el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' }).onfinish = () => el.remove();
      }, 500);
    }

    function onPointerDown(e) {
      const v = new THREE.Vector3((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, .5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const target = camera.position.clone().add(dir.multiplyScalar(13));
      const start = handWorld();
      const mid = start.clone().lerp(target, .5).add(new THREE.Vector3(0, 1.2, 0));
      const curve = new THREE.CatmullRomCurve3([start, mid, target]);
      const SEG = 60;
      const g = new THREE.TubeGeometry(curve, SEG, .03, 5, false);
      g.setDrawRange(0, 0);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: RED }));
      scene.add(m);
      shots.push({ mesh: m, seg: SEG, t: 0 });
      comicBurst(e.clientX, e.clientY);
      webSplat(e.clientX, e.clientY);
    }
    window.addEventListener('pointerdown', onPointerDown);

    /* ---------- render loop ---------- */
    const clock = new THREE.Clock();
    let rafId;

    function tick() {
      const dt = clock.getDelta(), t = clock.getElapsedTime();

      hero.position.y = perch.y + Math.sin(t * 1.6) * .04;
      // Billboard: make the plane face the camera
      heroPlane.lookAt(camera.position);
      hero.rotation.y = HERO_BASE_ROT + Math.sin(t * .5) * .05 + mouse.x * .15;
      moon.lookAt(camera.position);
      const mp = 1 + Math.sin(t * 1.2) * .015;
      moon.scale.set(mp, mp, mp);

      webProgress += (webTarget - webProgress) * .08;
      const segsOn = Math.floor(webProgress * WEB_SEGS);
      web.geometry.setDrawRange(0, Math.max(0, segsOn * RADIAL * 6));
      web2.geometry.setDrawRange(0, Math.max(0, segsOn * RADIAL * 6));
      if (hudWeb) hudWeb.textContent = String(Math.round(webProgress * 100)).padStart(3, '0') + '%';

      const tp = webCurve.getPointAt(Math.max(.001, Math.min(.999, webProgress)));
      tip.position.copy(tp);
      tip.scale.setScalar(1 + Math.sin(t * 8) * .18);
      tipRing.position.copy(tp);
      tipRing.rotation.z = t * 3; tipRing.rotation.y = t * 2;
      tipRing.scale.setScalar(1 + Math.sin(t * 5) * .12);
      web.rotation.z = Math.sin(t * .8) * .012 + mouse.y * .02;
      web2.rotation.z = web.rotation.z;

      checkpoints.forEach(cp => {
        if (!cp.userData.shown && webProgress > cp.userData.at) {
          cp.userData.shown = true;
          const target = { x: 1, y: 1, z: 1 };
          const start = { x: cp.scale.x, y: cp.scale.y, z: cp.scale.z };
          const dur = 600; const t0 = performance.now();
          function animIn() {
            const p = Math.min(1, (performance.now() - t0) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            cp.scale.set(start.x + (target.x - start.x) * e, start.y + (target.y - start.y) * e, start.z + (target.z - start.z) * e);
            if (p < 1) requestAnimationFrame(animIn);
          }
          animIn();
        }
        if (cp.userData.shown && webProgress < cp.userData.at - .03) {
          cp.userData.shown = false;
          const t0 = performance.now(); const dur = 300;
          function animOut() {
            const p = Math.min(1, (performance.now() - t0) / dur);
            const e = p * p;
            cp.scale.setScalar(1 - e);
            if (p < 1) requestAnimationFrame(animOut);
          }
          animOut();
        }
        cp.lookAt(camera.position);
      });

      const followX = THREE.MathUtils.lerp(camBase.x, tp.x * .55, webProgress);
      const followY = THREE.MathUtils.lerp(camBase.y, 2.5 + tp.y * .35, webProgress);
      const followZ = THREE.MathUtils.lerp(camBase.z, 15.5, webProgress);
      camera.position.x += ((followX + mouse.x * 1.6) - camera.position.x) * .05;
      camera.position.y += ((followY - mouse.y * 1.0) - camera.position.y) * .05;
      camera.position.z += (followZ - camera.position.z) * .05;
      const lookStart = new THREE.Vector3(perch.x - 4.6, perch.y - 2.2, perch.z);
      const look = new THREE.Vector3().lerpVectors(lookStart, tp, Math.min(1, webProgress * 1.25 + .05));
      camera.lookAt(look);

      clouds.children.forEach(c => {
        c.position.x += c.userData.sp * dt;
        if (c.position.x > 22) c.position.x = -22;
      });

      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i];
        s.t += dt * 3.2;
        s.mesh.geometry.setDrawRange(0, Math.floor(Math.min(1, s.t) * s.seg) * 5 * 6);
        if (s.t > 1.4) {
          s.mesh.material.transparent = true;
          s.mesh.material.opacity = Math.max(0, 1 - (s.t - 1.4) * 2);
          if (s.mesh.material.opacity <= 0) {
            scene.remove(s.mesh); s.mesh.geometry.dispose(); shots.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
      if (!reduceMotion) rafId = requestAnimationFrame(tick);
    }

    /* store ref for GSAP camera intro */
    sceneRef.current = { camera, tick, renderer };

    function onResize() {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [canvasRef, reduceMotion]);

  return sceneRef;
}
