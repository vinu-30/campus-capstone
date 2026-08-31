// Rule-based AI-style matching service; replace with an AI API later if required.
export async function analyzeSkillGap(studentSkills, requiredSkills) {
  return new Promise((resolve) => setTimeout(() => {
    const normalized = studentSkills.map((skill) => skill.toLowerCase());
    const matched = requiredSkills.filter((skill) => normalized.includes(skill.toLowerCase()));
    const missing = requiredSkills.filter((skill) => !normalized.includes(skill.toLowerCase()));
    resolve({ matched, missing, score: Math.round((matched.length / requiredSkills.length) * 100) });
  }, 700));
}

export async function recommendTeam(studentSkills, candidates) {
  return new Promise((resolve) => setTimeout(() => {
    const recommendations = candidates.map((candidate) => ({ ...candidate, complementarySkills: candidate.skills.filter((skill) => !studentSkills.includes(skill)), score: Math.min(98, 65 + candidate.skills.length * 8) })).sort((a, b) => b.score - a.score);
    resolve(recommendations);
  }, 700));
}
