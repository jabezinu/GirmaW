import { Routes, Route } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext'
import Layout from './components/Layout'
import GemstonesList from './components/GemstonesList'
import GemstoneForm from './components/GemstoneForm'
import CoursesList from './components/CoursesList'
import CourseForm from './components/CourseForm'
import EquipmentsList from './components/EquipmentsList'
import EquipmentForm from './components/EquipmentForm'
import ContactMessagesList from './components/ContactMessagesList'
import VideosList from './components/VideosList'
import VideoForm from './components/VideoForm'

export default function App() {
  return (
    <ModalProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<GemstonesList />} />
          <Route path="/gemstones/new" element={<GemstoneForm />} />
          <Route path="/gemstones/:id/edit" element={<GemstoneForm />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/:id/edit" element={<CourseForm />} />
          <Route path="/equipments" element={<EquipmentsList />} />
          <Route path="/equipments/new" element={<EquipmentForm />} />
          <Route path="/equipments/:id/edit" element={<EquipmentForm />} />
          <Route path="/contact-messages" element={<ContactMessagesList />} />
          <Route path="/videos" element={<VideosList />} />
          <Route path="/videos/new" element={<VideoForm />} />
          <Route path="/videos/:id/edit" element={<VideoForm />} />
        </Routes>
      </Layout>
    </ModalProvider>
  )
}