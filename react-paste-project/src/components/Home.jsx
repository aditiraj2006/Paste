import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from 'react-hot-toast';

const Home = () => {
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.pastes.pastes);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');

    // Move useEffect here!
    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        } else {
            setTitle('');
            setValue('');
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };
        if (pasteId) {
            dispatch(updateToPastes(paste));
            toast.success("Paste Updated Successfully");
        } else {
            dispatch(addToPastes(paste));
            toast.success("Paste Created Successfully");
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div>
            <div className="flex gap-2 mb-4 items-stretch">
                <input
                    type="text"
                    placeholder="enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full"
                />
                <button
                    className="whitespace-nowrap bg-blue-600 text-white px-4 rounded-md h-full"
                    onClick={createPaste}
                >
                    {pasteId ? 'Update Paste' : 'Create Paste'}
                </button>
            </div>
            <div>
                <textarea
                    value={value}
                    placeholder="enter paste here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
            </div>
        </div>
    );
};

export default Home;