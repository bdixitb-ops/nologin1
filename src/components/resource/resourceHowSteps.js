/** Steps 3 & 4 — shared across all resource marketing pages. */
export const RESOURCE_HOW_STEPS_3_4 = [
  {
    num: 3,
    title: "Share the link",
    body: "Say it verbally, write it on a board, or send it in a message.",
  },
  {
    num: 4,
    title: "They open it instantly",
    body: "Any device, any browser. No login required on their end either.",
  },
];

export function withResourceHowSteps(step1, step2) {
  return [step1, step2, ...RESOURCE_HOW_STEPS_3_4];
}
