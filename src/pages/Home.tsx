import { Box, Container } from '@mui/material'
import DiagramViewer from '../components/DiagramViewer'

function Home() {

  return (
    <Container maxWidth="lg">
        <DiagramViewer height="600px" />
    </Container>
  )
}

export default Home

