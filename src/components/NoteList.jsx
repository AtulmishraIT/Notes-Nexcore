import React from "react"
import { FileText, Plus } from "lucide-react"
import NoteCard from "./NoteCard"

function NoteList({ notes, searchTerm, onEdit, onDelete, onShowAddForm }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {searchTerm ? `Search Results (${notes.length})` : "Your Notes"}
      </h3>

      {notes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">{searchTerm ? "No notes found" : "No notes yet"}</h4>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "Try adjusting your search terms" : "Start by creating your first note to get organized!"}
          </p>
          {!searchTerm && (
            <button
              onClick={onShowAddForm}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Create Your First Note</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default NoteList
