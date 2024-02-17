interface SkillTagListProps {
  skills: {
    name: string
  }[]
}

const SkillTagList: React.FC<SkillTagListProps> = ({ skills }) => {
  return (
    <ul className="flex gap-1">
      {skills.map((skill) => (
        <li key={skill.name} className="bg-gray-200 rounded-full px-3 py-1">
          {skill.name}
        </li>
      ))}
    </ul>
  )
}
export default SkillTagList
