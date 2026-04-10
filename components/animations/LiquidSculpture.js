'use client'

import React from 'react'

const LiquidSculpture = () => {
  return (
    <div className="ls-wrap">
      <div className="ls-scene">
        {/* Primary liquid-metal orb */}
        <div className="ls-orb ls-metal">
          <div className="ls-metal-highlight"></div>
          <div className="ls-metal-caustic"></div>
        </div>
        {/* Aurora glass orb */}
        <div className="ls-orb ls-aurora">
          <div className="ls-aurora-core"></div>
          <div className="ls-aurora-ring"></div>
        </div>
        {/* Void obsidian orb */}
        <div className="ls-orb ls-void">
          <div className="ls-void-depth"></div>
        </div>
        {/* Satellite pebble */}
        <div className="ls-orb ls-pebble"></div>
        {/* Micro dark satellite */}
        <div className="ls-orb ls-micro"></div>
        {/* Floating motes */}
        <div className="ls-mote ls-mote-1"></div>
        <div className="ls-mote ls-mote-2"></div>
        <div className="ls-mote ls-mote-3"></div>
      </div>

      <style>{`
        .ls-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .ls-scene {
          position: relative;
          width: 380px;
          height: 420px;
        }

        .ls-orb {
          position: absolute;
          will-change: transform, border-radius;
          pointer-events: none;
        }

        /* ═══════════════════════════════════
           1. LIQUID METAL ORB — large, dark chrome
           Unique: animated internal caustic light pattern
           ═══════════════════════════════════ */
        .ls-metal {
          width: 195px;
          height: 195px;
          top: 50px;
          left: 12px;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          background:
            radial-gradient(ellipse at 28% 18%, rgba(140,140,140,0.8) 0%, transparent 45%),
            radial-gradient(ellipse at 75% 85%, rgba(0,0,0,0.4) 0%, transparent 38%),
            linear-gradient(148deg, #3d3d3d 0%, #1c1c1c 32%, #080808 58%, #1f1f1f 80%, #2d2d2d 100%);
          box-shadow:
            inset -10px -14px 28px rgba(0,0,0,0.5),
            inset 8px 10px 20px rgba(200,200,200,0.08),
            0 25px 55px rgba(0,0,0,0.18),
            0 5px 15px rgba(0,0,0,0.08);
          animation: metalMorph 14s ease-in-out infinite, metalDrift 10s ease-in-out infinite;
          overflow: hidden;
        }

        .ls-metal-highlight {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            120deg, transparent 0%, transparent 36%,
            rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.13) 48%,
            rgba(255,255,255,0.06) 54%, transparent 60%, transparent 100%
          );
          animation: sweepLight 7s ease-in-out infinite;
        }

        .ls-metal-caustic {
          position: absolute;
          width: 140%;
          height: 140%;
          top: -20%;
          left: -20%;
          border-radius: inherit;
          background:
            radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 25%),
            radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 20%),
            radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.035) 0%, transparent 22%);
          animation: causticShift 11s ease-in-out infinite;
          mix-blend-mode: overlay;
        }

        /* ═══════════════════════════════════
           2. AURORA GLASS ORB — frosted, iridescent ring
           Unique: rotating prismatic ring around a frosted core
           ═══════════════════════════════════ */
        .ls-aurora {
          width: 162px;
          height: 162px;
          top: 72px;
          left: 140px;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          background:
            radial-gradient(ellipse at 24% 16%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.18) 38%, transparent 60%),
            linear-gradient(155deg,
              rgba(245,242,238,0.88) 0%, rgba(230,224,234,0.7) 28%,
              rgba(220,230,240,0.6) 50%, rgba(234,230,220,0.7) 72%,
              rgba(245,240,234,0.85) 100%);
          box-shadow:
            inset -6px -10px 18px rgba(0,0,0,0.05),
            inset 5px 8px 14px rgba(255,255,255,0.5),
            0 14px 38px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.4);
          animation: auroraMorph 12s ease-in-out infinite, auroraDrift 8s ease-in-out infinite;
          animation-delay: -2.5s;
          overflow: hidden;
        }

        .ls-aurora-core {
          position: absolute;
          inset: 8px;
          border-radius: inherit;
          background: radial-gradient(
            circle at 40% 35%,
            rgba(255,255,255,0.6) 0%,
            rgba(240,238,235,0.3) 40%,
            transparent 70%
          );
          animation: corePulse 6s ease-in-out infinite alternate;
        }

        .ls-aurora-ring {
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          border: 2px solid transparent;
          background:
            linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.05)) padding-box,
            conic-gradient(
              from 0deg,
              rgba(255,180,140,0.25), rgba(140,180,255,0.3),
              rgba(180,255,200,0.2), rgba(255,200,255,0.25),
              rgba(255,180,140,0.25)
            ) border-box;
          animation: ringRotate 16s linear infinite;
        }

        /* ═══════════════════════════════════
           3. VOID OBSIDIAN ORB — deep black, inner depth illusion
           Unique: concentric depth layers creating a "looking into void" effect
           ═══════════════════════════════════ */
        .ls-void {
          width: 152px;
          height: 152px;
          top: 215px;
          left: 172px;
          border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          background:
            radial-gradient(ellipse at 35% 24%, rgba(55,55,68,0.65) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, #18181f 0%, #0e0e14 40%, #060609 70%, #0a0a10 100%);
          box-shadow:
            inset -8px -12px 22px rgba(0,0,0,0.6),
            inset 4px 6px 12px rgba(90,90,110,0.06),
            0 18px 48px rgba(0,0,0,0.16);
          animation: voidMorph 16s ease-in-out infinite, voidDrift 11s ease-in-out infinite;
          animation-delay: -5s;
          overflow: hidden;
        }

        .ls-void-depth {
          position: absolute;
          width: 60%;
          height: 60%;
          top: 20%;
          left: 20%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(80,70,120,0.12) 0%,
            rgba(40,40,60,0.08) 40%,
            transparent 70%
          );
          box-shadow: inset 0 0 30px rgba(60,50,100,0.1);
          animation: depthPulse 8s ease-in-out infinite alternate;
        }

        /* ═══════════════════════════════════
           4. SATELLITE PEBBLE — small, warm-toned stone
           ═══════════════════════════════════ */
        .ls-pebble {
          width: 60px;
          height: 60px;
          top: 325px;
          left: 55px;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 28% 22%, rgba(255,255,255,0.45) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, #d0ccc6 0%, #b8b4ae 45%, #a09c96 100%);
          box-shadow:
            inset -3px -5px 10px rgba(0,0,0,0.12),
            inset 2px 3px 7px rgba(255,255,255,0.3),
            0 8px 20px rgba(0,0,0,0.08);
          animation: pebbleMorph 9s ease-in-out infinite, pebbleDrift 7s ease-in-out infinite;
          animation-delay: -1.5s;
        }

        /* ═══════════════════════════════════
           5. MICRO SATELLITE — tiny dark accent
           ═══════════════════════════════════ */
        .ls-micro {
          width: 44px;
          height: 44px;
          top: 178px;
          left: 310px;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 30% 22%, rgba(60,60,60,0.4) 0%, transparent 50%),
            radial-gradient(circle, #1c1c1c 0%, #080808 100%);
          box-shadow: inset -2px -3px 6px rgba(0,0,0,0.4), 0 5px 12px rgba(0,0,0,0.1);
          animation: microMorph 10s ease-in-out infinite, microDrift 6s ease-in-out infinite;
          animation-delay: -3.5s;
        }

        /* ═══════════════════════════════════
           6. FLOATING MOTES — ambient particles
           ═══════════════════════════════════ */
        .ls-mote {
          position: absolute;
          border-radius: 50%;
          background: #111;
          pointer-events: none;
        }
        .ls-mote-1 {
          width: 10px; height: 10px;
          top: 30px; left: 200px;
          opacity: 0.7;
          animation: moteA 9s ease-in-out infinite;
        }
        .ls-mote-2 {
          width: 7px; height: 7px;
          top: 260px; left: 18px;
          opacity: 0.4;
          animation: moteB 7s ease-in-out infinite;
          animation-delay: -3s;
        }
        .ls-mote-3 {
          width: 5px; height: 5px;
          top: 360px; left: 282px;
          opacity: 0.3;
          animation: moteC 8s ease-in-out infinite;
          animation-delay: -1.5s;
        }

        /* ═══ MORPH KEYFRAMES ═══ */
        @keyframes metalMorph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          20% { border-radius: 55% 45% 50% 50% / 50% 42% 58% 50%; }
          40% { border-radius: 48% 52% 35% 65% / 55% 35% 65% 45%; }
          60% { border-radius: 35% 65% 58% 42% / 62% 40% 60% 38%; }
          80% { border-radius: 58% 42% 45% 55% / 38% 55% 45% 62%; }
        }
        @keyframes auroraMorph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 42% 58% 55% 45% / 48% 58% 42% 52%; }
          50% { border-radius: 55% 45% 45% 55% / 38% 52% 48% 62%; }
          75% { border-radius: 38% 62% 60% 40% / 55% 40% 60% 45%; }
        }
        @keyframes voidMorph {
          0%, 100% { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
          20% { border-radius: 65% 35% 45% 55% / 42% 58% 42% 58%; }
          40% { border-radius: 48% 52% 68% 32% / 55% 45% 55% 45%; }
          60% { border-radius: 58% 42% 38% 62% / 45% 55% 45% 55%; }
          80% { border-radius: 35% 65% 55% 45% / 60% 40% 60% 40%; }
        }
        @keyframes pebbleMorph {
          0%, 100% { border-radius: 50%; }
          33% { border-radius: 42% 58% 52% 48% / 55% 45% 55% 45%; }
          66% { border-radius: 55% 45% 45% 55% / 48% 52% 48% 52%; }
        }
        @keyframes microMorph {
          0%, 100% { border-radius: 50%; }
          50% { border-radius: 40% 60% 55% 45% / 58% 42% 58% 42%; }
        }

        /* ═══ DRIFT / FLOAT KEYFRAMES ═══ */
        @keyframes metalDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(7px, -14px) rotate(1.5deg); }
          50% { transform: translate(-4px, 8px) rotate(-1deg); }
          75% { transform: translate(5px, -6px) rotate(0.8deg); }
        }
        @keyframes auroraDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-8px, -6px) rotate(-1.2deg); }
          40% { transform: translate(5px, 10px) rotate(0.8deg); }
          60% { transform: translate(8px, -4px) rotate(1deg); }
          80% { transform: translate(-4px, 6px) rotate(-0.6deg); }
        }
        @keyframes voidDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-6px, -12px) rotate(-1deg); }
          66% { transform: translate(4px, 8px) rotate(0.7deg); }
        }
        @keyframes pebbleDrift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(10px, -8px); }
          66% { transform: translate(-5px, 6px); }
        }
        @keyframes microDrift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 7px); }
          50% { transform: translate(7px, -5px); }
          75% { transform: translate(-3px, -4px); }
        }

        /* ═══ MATERIAL EFFECT KEYFRAMES ═══ */
        @keyframes sweepLight {
          0%, 15% { transform: translateX(-60%); opacity: 0; }
          40%, 60% { transform: translateX(0%); opacity: 1; }
          85%, 100% { transform: translateX(60%); opacity: 0; }
        }
        @keyframes causticShift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(10%, -8%) scale(1.05); opacity: 0.9; }
          66% { transform: translate(-8%, 6%) scale(0.95); opacity: 0.7; }
        }
        @keyframes corePulse {
          0% { opacity: 0.5; transform: scale(0.95); }
          100% { opacity: 0.9; transform: scale(1.05); }
        }
        @keyframes ringRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes depthPulse {
          0% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes sheenPulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes moteA {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-6px, -10px); }
          50% { transform: translate(4px, -16px); }
          75% { transform: translate(-3px, -5px); }
        }
        @keyframes moteB {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(8px, -6px); }
          66% { transform: translate(-4px, 8px); }
        }
        @keyframes moteC {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5px, 8px); }
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 1200px) {
          .ls-scene { width: 340px; height: 380px; }
          .ls-metal { width: 170px; height: 170px; }
          .ls-aurora { width: 142px; height: 142px; }
          .ls-void { width: 132px; height: 132px; }
        }
        @media (max-width: 1024px) {
          .ls-scene { width: 300px; height: 340px; }
          .ls-metal { width: 148px; height: 148px; top: 46px; left: 6px; }
          .ls-aurora { width: 120px; height: 120px; top: 60px; left: 112px; }
          .ls-void { width: 116px; height: 116px; top: 176px; left: 130px; }
          .ls-pebble { width: 50px; height: 50px; top: 268px; left: 36px; }
          .ls-micro { width: 36px; height: 36px; top: 150px; left: 248px; }
        }
        @media (max-width: 768px) {
          .ls-scene { width: 280px; height: 300px; }
          .ls-metal { width: 126px; height: 126px; top: 40px; left: 8px; }
          .ls-aurora { width: 106px; height: 106px; top: 50px; left: 100px; }
          .ls-void { width: 106px; height: 106px; top: 150px; left: 120px; }
          .ls-pebble { width: 44px; height: 44px; top: 225px; left: 26px; }
          .ls-micro { width: 32px; height: 32px; top: 130px; left: 216px; }
        }
        @media (max-width: 480px) {
          .ls-scene { width: 240px; height: 260px; }
          .ls-metal { width: 106px; height: 106px; top: 36px; left: 4px; }
          .ls-aurora { width: 90px; height: 90px; top: 44px; left: 84px; }
          .ls-void { width: 90px; height: 90px; top: 126px; left: 100px; }
          .ls-pebble { width: 38px; height: 38px; top: 196px; left: 16px; }
          .ls-micro { width: 26px; height: 26px; top: 110px; left: 182px; }
          .ls-mote-1 { top: 22px; left: 158px; }
          .ls-mote-3 { top: 216px; left: 190px; }
        }
      `}</style>
    </div>
  )
}

export default LiquidSculpture
