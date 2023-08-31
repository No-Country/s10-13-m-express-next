interface Props {
  params: {
    initiativeId: string
  }
}

export default function InitiativeDetailPage(props: Props) {
  const { initiativeId } = props.params
  return <h1>Initiatives: {initiativeId}</h1>
}
