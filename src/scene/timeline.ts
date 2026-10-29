/** One normalized scroll timeline (0..1 over the hero stage), shared by the 3D scene and the HTML overlay. */
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
/** Smoothstep progress of `p` between a and b. */
export const seg = (p: number, a: number, b: number) => smooth((p - a) / (b - a));

export const T = {
  poseStart: 0.08, // greeting pose holds until here
  poseEnd: 0.3, // pointing pose fully established
  hintEnd: 0.5, // "scroll to explore" visible until here
  camStart: 0.42, // camera begins moving toward the monitor (after the pointing pose has settled)
  camEnd: 0.97,
  textStart: 0.44, // heading / bottom bar fade out
  textEnd: 0.62,
  charStart: 0.5, // character fades as the monitor takes over
  charEnd: 0.7,
} as const;

/** Simplified timeline for the HTML-only hero (mobile, no WebGL): pose change only. */
export const T_LITE = { poseStart: 0.1, poseEnd: 0.6 } as const;

/** Opacity of the greeting pose (A) and the pointing pose (B). B fades in *over* A, so the figure never dims;
 *  A is removed only once B is fully opaque. */
export function poseOpacity(p: number, start: number, end: number) {
  // double smoothstep: dwells at both poses and crosses the mid-point quickly, which keeps ghosting brief
  const b = smooth(seg(p, start, end));
  const a = 1 - seg(p, end, end + (end - start) * 0.2);
  return { a, b };
}
