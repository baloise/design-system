/*!
 * (C) Helvetia Design System https://design.baloise.dev/ - Apache License 2.0
 */
const n=(n,t=[])=>{const o={};return t.forEach((t=>{n.hasAttribute(t)&&(null!==n.getAttribute(t)&&(o[t]=n.getAttribute(t)),n.removeAttribute(t))})),o};export{n as i}