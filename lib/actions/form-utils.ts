export function requiredString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export function optionalString(formData: FormData, key: string): string | undefined {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

export function linesToArray(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function csvToArray(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export interface ProcessStepInput {
  step: string;
  title: string;
  desc: string;
}

/** Each line: "Title | Description" — the step number is derived from line order. */
export function parseProcessSteps(formData: FormData, key: string): ProcessStepInput[] {
  return String(formData.get(key) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [title, ...rest] = line.split("|");
      return {
        step: String(index + 1).padStart(2, "0"),
        title: (title ?? "").trim(),
        desc: rest.join("|").trim(),
      };
    });
}
