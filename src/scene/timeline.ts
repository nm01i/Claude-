/** One normalized scroll timeline (0..1 over the hero stage), shared by the 3D scene and the HTML overlay. */
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
/** Smoothstep progress of `p` between a and b. */
export const seg = (p: number, a: number, b: number) => smooth((p - a) / (b - a));

export const T = {
  poseStart: 0.04, // character video starts following the scroll here (greeting frame before)
  poseEnd: 0.38, // video reaches its last frame: pointing pose established
  hintEnd: 0.5, // "scroll to explore" visible until here
  camStart: 0.42, // camera begins moving toward the monitor (after the pointing pose has settled)
  camEnd: 0.97,
  textStart: 0.44, // heading / bottom bar fade out
  textEnd: 0.62,
  charStart: 0.5, // character fades as the monitor takes over
  charEnd: 0.7,
} as const;

/** Simplified timeline for the HTML-only hero (mobile, no WebGL): the character video only. */
export const T_LITE = { poseStart: 0.05, poseEnd: 0.75 } as const;
