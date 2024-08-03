import { Outlet } from 'react-router-dom'
import { Header, Container, Footer } from './components/index'


function App() {

  return (
    <>
      <Header />
      <Container className={`min-h-[calc(100vh-4rem)] bg-[url('/images/bubbleLightBg.webp')] dark:bg-[url('/images/bubbleDarkBg.webp')]`}>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default App
