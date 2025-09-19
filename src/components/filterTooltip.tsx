import { MouseEvent } from "react";

type FilterToolTipProps = {
  skills: string[];
  addSelectedSkill: (skill: string) => void;
  removeSelectedSkill: (skill: string) => void;
  selectedSkills: string[];
};

export default function FilterToolTip({
  skills,
  addSelectedSkill,
  removeSelectedSkill,
  selectedSkills,
}: FilterToolTipProps) {
  const handleSkillClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      removeSelectedSkill(skill);
    } else {
      addSelectedSkill(skill);
    }
  };

  return (
    <section className="absolute bg-white rounded-lg border-[#B98A3C] border-2 w-full max-w-xs p-4 flex flex-col items-center shadow-lg top-16 z-10">
      <h3 className="font-bold text-lg mb-2">Filter by skills:</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => handleSkillClick(skill)}
            className={`p-2 rounded-lg text-sm text-white transition-colors duration-200 ease-in-out
              ${
                selectedSkills.includes(skill)
                  ? "bg-color-primary-green text-white"
                  : "bg-color-secondary-green text-gray-800"
              }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </section>
  );
}
