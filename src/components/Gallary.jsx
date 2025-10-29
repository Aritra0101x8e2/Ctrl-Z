
import DomeGallery from './DomeGallery';
import { useState } from "react";
export default function Gallary() {

    const [title, setTitle] = useState(20);
    const [description, setDescription] = useState("Default description.");
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const updateCard = () => {
      if (newTitle!= null) {
        setTitle(newTitle);
        // setNewTitle("");
      }
    };
    return (
      <>
      <div className=' text-white px-20 py-10'>
        <h1 className="text-2xl font-bold mb-4">THE MEMBERS OF CTRL Z</h1>

        {/* Input Section */}
        {/* <div className="flex gap-4 mb-6">
          <input
          autoFocus="true"
            type="text"
            placeholder="Enter segment size"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 rounded border-solid"
            

          />
          <button
            onClick={updateCard}
            className='border-2 px-8 py-2 rounded-2xl hover:cursor-pointer hover:bg-[#564b45ca]'
          >
            Update
          </button> */}
      {/* </div> */}
    </div>
      <div style={{ width: '100vw', height: '100vh' }}>
        <DomeGallery segments={title} />
      </div>
    
    </>
    );
  }