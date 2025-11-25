import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ModalProvider } from './contexts/ModalContext'
import { DataProvider } from './contexts/DataContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Layout from './components/Layout'
import GemstonesList from './components/GemstonesList'
import GemstoneForm from './components/GemstoneForm'
import ContactMessagesList from './components/ContactMessagesList'
import VideosList from './components/VideosList'
import VideoForm from './components/VideoForm'
import FaqList from './components/FaqList'
import FaqForm from './components/FaqForm'
import AwardsList from './components/AwardsList'
import AwardForm from './components/AwardForm'

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ModalProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<GemstonesList />} />
                      <Route path="/gemstones/new" element={<GemstoneForm />} />
                      <Route path="/gemstones/:id/edit" element={<GemstoneForm />} />
                      <Route path="/contact-messages" element={<ContactMessagesList />} />
                      <Route path="/videos" element={<VideosList />} />
                      <Route path="/videos/new" element={<VideoForm />} />
                      <Route path="/videos/:id/edit" element={<VideoForm />} />
                      <Route path="/faqs" element={<FaqList />} />
                      <Route path="/faqs/new" element={<FaqForm />} />
                      <Route path="/faqs/:id/edit" element={<FaqForm />} />
                      <Route path="/awards" element={<AwardsList />} />
                      <Route path="/awards/new" element={<AwardForm />} />
                      <Route path="/awards/:id/edit" element={<AwardForm />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </ModalProvider>
      </DataProvider>
    </AuthProvider>
  )
}