import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import GemstonesList from './components/GemstonesList'
import GemstoneForm from './components/GemstoneForm'
import CommentsList from './components/CommentsList'
import CommentForm from './components/CommentForm'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<GemstonesList />} />
        <Route path="/gemstones/new" element={<GemstoneForm />} />
        <Route path="/gemstones/:id/edit" element={<GemstoneForm />} />
        <Route path="/comments" element={<CommentsList />} />
        <Route path="/comments/new" element={<CommentForm />} />
        <Route path="/comments/:id/edit" element={<CommentForm />} />
      </Routes>
    </Layout>
  )
}