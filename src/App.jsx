import React, { useState, useEffect } from "react"
import { FileText, Search } from "lucide-react"
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import NoteCard from "./components/NoteCard"

function App() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes")
    return storedNotes ? JSON.parse(storedNotes) : []
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // Add or update note
  const handleSaveNote = () => {
    if (title.trim()) {
      if (editingId) {
        // Update existing note
        setNotes(
          notes.map((note) =>
            note.id === editingId ? { ...note, title: title.trim(), content: content.trim() } : note,
          ),
        )
        setEditingId(null)
      } else {
        // Add new note
        const newNote = {
          id: Date.now(),
          title: title.trim(),
          content: content.trim(),
          createdAt: new Date().toLocaleDateString(),
        }
        setNotes([newNote, ...notes])
      }

      // Reset form
      setTitle("")
      setContent("")
      setShowAddForm(false)
    }
  }

  // Start editing a note
  const handleEditNote = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
    setShowAddForm(true)
  }

  // Delete note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  // Cancel add/edit
  const handleCancel = () => {
    setTitle("")
    setContent("")
    setShowAddForm(false)
    setEditingId(null)
  }

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm text-gray-500">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your Notes</h2>
          <p className="text-gray-600 mb-4">
            Organize your thoughts, ideas, and reminders in one place. Create, edit, and manage your notes with ease.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Note Form */}
        <NoteForm
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingId={editingId}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onSave={handleSaveNote}
          onCancel={handleCancel}
        />

        {/* Notes List */}
        <NoteList
          notes={filteredNotes}
          searchTerm={searchTerm}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onShowAddForm={() => setShowAddForm(true)}
        />
      </div>
    </div>
  )
}

export default App
