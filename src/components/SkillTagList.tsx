const SkillTagList: React.FC<{ skills: string[] }> = ({ skills }) => {
  return (
    <ul className="flex gap-1">
      {skills.map((skill) => (
        <li key={skill} className="bg-gray-200 rounded-full px-3 py-1">
          {skill}
        </li>
      ))}
    </ul>
  )
}
export default SkillTagList
