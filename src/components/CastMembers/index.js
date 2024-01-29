import './index.css'

const CastMembers = props => {
  const {items} = props
  const {oname, character, oposter} = items
  return (
    <div className="castCard">
      <img className="castImg" src={oposter} alt={oname} />
      <p>{oname}</p>
      <p className="characterName">{character}</p>
    </div>
  )
}
export default CastMembers
