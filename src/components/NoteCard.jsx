import React from "react"
import { Edit3, Trash2 } from "lucide-react"

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">{note.title}</h4>
        <div className="flex space-x-1 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit note"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {note.content && <p className="text-gray-600 text-sm line-clamp-4 mb-3">{note.content}</p>}

      {note.createdAt && <p className="text-xs text-gray-400">Created: {note.createdAt}</p>}
    </div>
  )
}

export default NoteCard
