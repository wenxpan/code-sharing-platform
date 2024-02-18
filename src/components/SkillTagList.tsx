interface SkillTagListProps {
  skills: {
    name: string
  }[]
  showFull: boolean
}

const SkillTagList: React.FC<SkillTagListProps> = ({
  skills,
  showFull = true,
}) => {
  const displayedSkills = showFull ? skills : skills.slice(0, 3)
  const showMore = showFull ? false : skills.length > 3
  return (
    <ul className="flex gap-1 text-xs">
      {displayedSkills.map((skill) => (
        <li key={skill.name} className="bg-gray-200 rounded-full px-3 py-1">
          {skill.name}
        </li>
      ))}
      {showMore && (
        <li key="_more" className="bg-gray-200 rounded-full px-3 py-1">
          ...
        </li>
      )}
    </ul>
  )
}
export default SkillTagList
