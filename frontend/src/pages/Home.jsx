import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";


function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => setNotes(data))
            .catch((err) => alert(err));
    }
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Node deleted sucessfully")
                else alert("Failed to delete note")
            getNotes();
            })
            .catch((error) => alert(error));
        
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created successfully")
                } else {
                    alert("Failed to create Note")
                }
                 getNotes();
            }).catch((error) => alert(error));
       
    }
    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <br />
            <br />
            <label htmlFor="content">Content:</label>
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)} 
            />
            <br/>
            <br />
            <input type="submit" value="submit"></input>
        </form>
    </div>;
}

export default Home;