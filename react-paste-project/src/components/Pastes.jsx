import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Pastes = () => {

  const pastes = useSelector((state) => state.pastes.pastes);

  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (pastes) => pastes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }


  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5 bg-black' 
        type="search"
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5 text-center'>
        {
          filterData.length > 0 && filterData.map(
            (pastes) => {
              return (
                <div className='border' key={pastes?._id}>
                  <div>
                    {pastes.title}
                  </div>
                  <div >
                    {pastes.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <NavLink to={'/?pastesId=${pastes?.id}'}>
                        Edit
                      </NavLink>
                    </button>
                    <button >
                      <NavLink to={'/pastes/${pastes?.id}'}>
                        View
                      </NavLink>
                      
                    </button>
                    <button onClick={() => {handleDelete(pastes?._id)}}>
                      Delete
                    </button>
                    <button onClick={() => {navigator.clipboard.writeText(pastes?.content)
                      toast.success("Copied to Clipboard")
                    }}>
                      Copy
                    </button>
                    <button>
                      Share
                    </button>
                  </div>
                  <div>
                    {pastes.createdAt}
                  </div>
                </div>
                
              )
            }
          )
        }
        
      </div>
    </div>
  )
}

export default Pastes