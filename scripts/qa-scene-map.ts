import fs from "node:fs";
import path from "node:path";
import storyModule from "../../qa-story.cjs";

const { resolveSceneShot } = storyModule;

const source = fs.readFileSync(
  path.join(process.cwd(), "components/story-experience.tsx"),
  "utf8",
);
const sceneCounts: Record<string, number> = {
  "عصر کشاورزی": 4,
  "عصر صنعت": 2,
  "مسیر سنتی توزیع": 3,
  "عصر ارتباطات": 2,
  "فروش مستقیم": 2,
  "چرخش سود": 2,
  "نتورک سالم یا هرمی؟": 2,
};

const results: Record<string, { text: string; shot: number }[]> = {};
for (const scene of Object.keys(sceneCounts)) {
  const start = source.indexOf(`title="${scene}"`);
  const next = source.indexOf("<Scene ", start + 10);
  const chunk = source.slice(start, next < 0 ? source.length : next);
  const texts = [...chunk.matchAll(/"([^"\n]{35,})"/g)]
    .map((match) => match[1])
    .filter((text) => !text.includes("className"));
  results[scene] = texts.map((text) => ({
    text: text.slice(0, 70),
    shot: resolveSceneShot(scene, text, sceneCounts[scene]),
  }));
  if (scene === "عصر کشاورزی") {
    results[scene].push({
      text: "پول، ابزار مشترک",
      shot: resolveSceneShot(scene, "پول، ابزار مشترک", 4),
    });
  }
}

for (const [scene, entries] of Object.entries(results)) {
  const used = [...new Set(entries.map((entry) => entry.shot))].sort();
  console.log(`${scene}: shots=${used.join(",")} beats=${entries.length}`);
  if (used.length !== sceneCounts[scene]) process.exitCode = 1;
}
