export const AGILITY_LEVEL_GROUPS = [
  {
    id: "beginner",
    label: "비기너",
    levels: ["비기너1", "비기너2"],
  },
  {
    id: "novice",
    label: "노비스",
    levels: ["노비스1", "노비스2"],
  },
  {
    id: "jumping",
    label: "점핑 & 어질리티",
    levels: ["점핑1&어질리티1", "점핑2&어질리티2", "점핑3&어질리티3"],
  },
] as const;

export type AgilityLevel =
  (typeof AGILITY_LEVEL_GROUPS)[number]["levels"][number];

export const ALL_AGILITY_LEVELS: AgilityLevel[] = AGILITY_LEVEL_GROUPS.flatMap(
  (g) => [...g.levels]
);
