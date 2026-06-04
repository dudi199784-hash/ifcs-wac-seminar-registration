"use client";

import {
  AGILITY_LEVEL_GROUPS,
  type AgilityLevel,
} from "@/lib/agilityLevels";

type Props = {
  value: AgilityLevel | "";
  onChange: (level: AgilityLevel) => void;
  error?: string;
};

export function AgilityLevelPicker({ value, onChange, error }: Props) {
  return (
    <div className="level-picker">
      {AGILITY_LEVEL_GROUPS.map((group) => (
        <div key={group.id} className="level-group">
          <p className="level-group-label">{group.label}</p>
          <div
            className="level-group-chips"
            role="radiogroup"
            aria-label={`${group.label} 레벨`}
          >
            {group.levels.map((level) => {
              const selected = value === level;
              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`level-chip${selected ? " is-selected" : ""}`}
                  onClick={() => onChange(level)}
                >
                  <span className="level-chip-inner">{level}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
