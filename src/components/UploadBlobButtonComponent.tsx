'use client'
import { blobUpload } from '@/utils/DataServices';
import { useState } from 'react'

type Props = {
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadBlobButtonComponent = (prop: Props) => {
    const {setImageUrl} = prop;
//We Need a useState for our file
  const [file, setFile] = useState<File | null>(null);
  const [canUpload, setCanUpload] = useState<boolean>(false);
//A function that Gets our File / Sets our file 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
          setCanUpload(true);
      }
  };
  //A Function that Handles the submitting of file to our backend
  const handleSubmit = async (e: React.FormEvent) => {
  //Prevent default so our app doesn't reload on submitting
      e.preventDefault();
  
		  //Check if the file is inside of our state Variable
      if (!file) {
          alert('Please select a file to upload.');
          return;
      }
		  //A Unique file name so data isn't being overwritten in our blob
      const uniqueFileName = `${Date.now()}-${file.name}`;
		  
		  //New Form Data Object to append our file and file name
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', uniqueFileName);
  
		  //Finally passing that formData into our Backend
          console.log(formData)
      const uploadedUrl = await blobUpload(formData);

      if (uploadedUrl) {
          console.log('File uploaded at:', uploadedUrl);
          // You can now store this URL in your component state or send it to your backend
          setImageUrl(Array.isArray(uploadedUrl) ? uploadedUrl : [uploadedUrl]);
      }
    }

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className='text-[#E1FF00] text-xl'>Add a Photo:</h1>
      <div>
        <label htmlFor="file" className="block text-sm font-semibold text-[#E1FF00] cursor-pointer">
          Choose a file
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-[#E1FF00] border rounded-md p-2 cursor-pointer"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={!canUpload}
      >
        Upload
      </button>
    </form>
    </>
  )
}


export default UploadBlobButtonComponent