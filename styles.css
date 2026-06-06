:root {
  --bg: #040914;
  --line: rgba(132, 204, 255, 0.16);
  --text: #eef8ff;
  --muted: #9bb3ca;
  --primary: #63d4ff;
  --primary-2: #8f7cff;
  --success: #61f2b1;
  --warning: #ffbf69;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  --radius: 24px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top left, rgba(39, 111, 255, 0.18), transparent 28%),
    radial-gradient(circle at top right, rgba(132, 48, 255, 0.16), transparent 30%),
    linear-gradient(180deg, #02060f 0%, #050a14 100%);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body { position: relative; overflow-x: hidden; }

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(99, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(circle at center, black 45%, transparent 95%);
  pointer-events: none;
}

.bg-orb {
  position: fixed;
  border-radius: 999px;
  filter: blur(90px);
  opacity: 0.32;
  pointer-events: none;
}

.orb-a { top: 80px; left: -60px; width: 260px; height: 260px; background: #33c7ff; }
.orb-b { top: 240px; right: -50px; width: 300px; height: 300px; background: #7f6bff; }

.app-shell {
  position: relative;
  z-index: 1;
  width: min(1540px, calc(100vw - 28px));
  margin: 18px auto 40px;
}

.card {
  background: linear-gradient(180deg, rgba(14, 22, 38, 0.85), rgba(7, 13, 24, 0.78));
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}

.card-lite {
  background: rgba(8, 15, 28, 0.82);
  border: 1px solid rgba(124, 170, 255, 0.12);
  border-radius: 18px;
}

.topbar {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: center;
  padding: 22px 24px;
}

.brand-block { display: flex; gap: 18px; align-items: center; }

.brand-logo {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, rgba(99, 212, 255, 0.3), rgba(143, 124, 255, 0.28));
  border: 1px solid rgba(146, 222, 255, 0.35);
  box-shadow: inset 0 0 24px rgba(99, 212, 255, 0.16);
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: #87dfff;
  text-transform: uppercase;
}

h1, h2, h3, p { margin-top: 0; }
h1 { margin-bottom: 6px; font-size: clamp(1.55rem, 2vw, 2.4rem); }
h2, h3 { margin-bottom: 8px; }
.muted { color: var(--muted); line-height: 1.6; }

.topbar-actions,
.button-row,
.composer-actions,
.status-row,
.study-input-row,
.wrap-row,
.assistant-summary,
.toggle-group,
.auth-chip-wrap {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.compact-row { gap: 8px; }
.compact-field, label { display: flex; flex-direction: column; gap: 7px; color: var(--muted); font-size: 0.92rem; }
.checkbox-label { justify-content: flex-end; }

input, select, textarea, button { font: inherit; }

input, select, textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(7, 12, 22, 0.82);
  border: 1px solid rgba(136, 202, 255, 0.18);
  color: var(--text);
  outline: none;
}

input:focus, select:focus, textarea:focus {
  border-color: rgba(99, 212, 255, 0.65);
  box-shadow: 0 0 0 3px rgba(99, 212, 255, 0.12);
}

button,
a.ghost-btn,
a.primary-btn {
  border: 0;
  border-radius: 16px;
  padding: 12px 16px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
button:hover,
a.ghost-btn:hover,
a.primary-btn:hover { transform: translateY(-1px); }
.small-btn { padding: 10px 12px; font-size: 0.88rem; }

.primary-btn {
  color: #06101b;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), #a7f0ff);
  box-shadow: 0 12px 30px rgba(99, 212, 255, 0.22);
}

.ghost-btn {
  color: var(--text);
  background: rgba(18, 30, 52, 0.66);
  border: 1px solid rgba(143, 124, 255, 0.18);
}

.main-grid {
  display: grid;
  grid-template-columns: minmax(360px, 1.04fr) minmax(440px, 1.5fr);
  gap: 18px;
  margin-top: 18px;
}

.chat-panel { padding: 22px; display: flex; flex-direction: column; min-height: 82vh; }
.workspace-panel { display: flex; flex-direction: column; gap: 18px; }
.panel-head, .module-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #cbe9ff;
  background: rgba(12, 22, 42, 0.8);
  border: 1px solid rgba(133, 202, 255, 0.14);
}
.status-pill.online { color: #062010; background: rgba(97, 242, 177, 0.9); }

.assistant-summary { justify-content: space-between; margin: 14px 0 16px; padding: 14px; }
.toggle-line { display: flex; flex-direction: row; align-items: center; gap: 8px; }
.boxed-toggle { padding: 8px 10px; border-radius: 14px; background: rgba(12, 22, 42, 0.65); border: 1px solid rgba(124, 170, 255, 0.12); }
.toggle-line input { width: auto; }
.mini-status { font-size: 0.84rem; }

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 6px 2px 20px;
  overflow: auto;
  min-height: 260px;
}

.message { display: grid; grid-template-columns: 36px 1fr; gap: 12px; align-items: flex-start; }
.message.user { grid-template-columns: 1fr 36px; }
.message.user .message-bubble { order: -1; background: linear-gradient(180deg, rgba(18, 54, 92, 0.82), rgba(10, 30, 55, 0.82)); }

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 212, 255, 0.82), rgba(143, 124, 255, 0.8));
  display: grid;
  place-items: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: #05111f;
}
.message.user .message-avatar { background: linear-gradient(135deg, rgba(97, 242, 177, 0.85), rgba(99, 212, 255, 0.85)); }

.message-bubble {
  padding: 14px 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(11, 18, 32, 0.88), rgba(9, 15, 27, 0.8));
  border: 1px solid rgba(124, 170, 255, 0.12);
  line-height: 1.7;
  white-space: pre-wrap;
}

.source-panel {
  margin: 6px 0 16px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(8, 15, 27, 0.8);
  border: 1px solid rgba(124, 170, 255, 0.12);
}

.composer textarea { min-height: 120px; resize: vertical; }
.composer-actions { justify-content: space-between; margin-top: 12px; }

.hero-grid,
.module-grid,
.slider-grid,
.pinterest-grid,
.settings-grid,
.action-grid,
.voice-grid,
.auth-grid {
  display: grid;
  gap: 18px;
}

.hero-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.hero-card, .module { padding: 22px; }
.warning-card { border-color: rgba(255, 191, 105, 0.22); }
.feature-list { margin: 0; padding-left: 18px; color: #d8e8f7; line-height: 1.8; }
.module-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

.study-tags { display: flex; flex-wrap: wrap; gap: 10px; margin: 14px 0; }
.study-tag {
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(14, 25, 45, 0.78);
  border: 1px solid rgba(135, 188, 255, 0.12);
  color: #cee6ff;
  font-size: 0.88rem;
}

.resource-list, .result-box { margin-top: 16px; display: flex; flex-direction: column; gap: 12px; }
.resource-card, .result-box {
  padding: 14px;
  border-radius: 16px;
  background: rgba(8, 15, 27, 0.8);
  border: 1px solid rgba(124, 170, 255, 0.12);
}
.resource-card a { color: #9fe8ff; }
.small-box { margin-top: 12px; font-size: 0.92rem; }

.code-preview {
  margin: 0;
  margin-top: 16px;
  min-height: 220px;
  max-height: 420px;
  overflow: auto;
  padding: 16px;
  border-radius: 18px;
  background: #03070e;
  color: #9ce7ff;
  border: 1px solid rgba(124, 170, 255, 0.12);
}

.image-module canvas {
  width: 100%;
  max-width: 100%;
  border-radius: 18px;
  margin-top: 18px;
  background: linear-gradient(180deg, rgba(5, 9, 15, 0.98), rgba(10, 16, 29, 0.96));
  border: 1px solid rgba(124, 170, 255, 0.12);
}
.image-note { margin-top: 12px; }
.slider-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 12px; }
.slider-grid label { font-size: 0.86rem; }
.pinterest-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 14px; }
.voice-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 14px; }
.voice-card {
  padding: 14px;
  border-radius: 16px;
  background: rgba(8, 15, 27, 0.82);
  border: 1px solid rgba(124, 170, 255, 0.12);
}
.voice-card .voice-meta { display: flex; justify-content: space-between; gap: 12px; color: var(--muted); font-size: 0.84rem; margin-top: 8px; }
.action-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 14px; }
.action-btn {
  min-height: 68px;
  background: linear-gradient(180deg, rgba(13, 24, 43, 0.88), rgba(8, 14, 25, 0.88));
  border: 1px solid rgba(124, 170, 255, 0.12);
  color: var(--text);
}

.qr-wrap { display: flex; gap: 16px; align-items: center; margin-top: 16px; flex-wrap: wrap; }
#qrImage {
  width: 220px;
  min-height: 220px;
  border-radius: 20px;
  background: rgba(8, 15, 27, 0.8);
  border: 1px dashed rgba(124, 170, 255, 0.2);
  object-fit: cover;
}
.qr-note { max-width: 360px; }

.settings-drawer {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 12, 0.68);
  display: grid;
  place-items: center;
  z-index: 20;
  padding: 20px;
}
.hidden { display: none !important; }
.settings-card { width: min(1080px, 100%); padding: 22px; max-height: calc(100vh - 40px); overflow: auto; }
.auth-card { width: min(820px, 100%); }
.settings-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 16px 0; }
.auth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 18px 0; }
.settings-grid label:last-child { grid-column: span 2; }
.result-box { white-space: pre-wrap; line-height: 1.7; }

@media (max-width: 1200px) {
  .main-grid, .hero-grid, .module-grid, .settings-grid, .auth-grid { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .app-shell { width: min(100vw - 16px, 100%); margin-top: 8px; }
  .topbar, .panel-head, .module-head, .brand-block, .assistant-summary, .composer-actions, .auth-chip-wrap {
    flex-direction: column; align-items: flex-start;
  }
  .action-grid, .slider-grid, .voice-grid, .pinterest-grid, .auth-grid { grid-template-columns: 1fr; }
  .chat-panel, .hero-card, .module, .settings-card { padding: 16px; }
  .message { grid-template-columns: 30px 1fr; }
  .message.user { grid-template-columns: 1fr 30px; }
}
