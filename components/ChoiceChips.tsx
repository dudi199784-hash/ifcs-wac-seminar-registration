"use client";

type Option<T extends string> = {
  value: T;
  label: string;
};

type ChoiceChipsProps<T extends string> = {
  name: string;
  value: T | "";
  options: Option<T>[];
  onChange: (value: T) => void;
  columns?: 2 | 3;
};

export function ChoiceChips<T extends string>({
  name,
  value,
  options,
  onChange,
  columns = 2,
}: ChoiceChipsProps<T>) {
  return (
    <div
      className="choice-chips"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      role="radiogroup"
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            name={name}
            className={`choice-chip${selected ? " is-selected" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="choice-chip-ring" aria-hidden="true" />
            <span className="choice-chip-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
