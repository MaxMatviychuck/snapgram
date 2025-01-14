import { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'

import { Button } from '../ui/button';

interface FileUploaderProps {
    fieldChange: (files: File[]) => void
    mediaUrl: string
    type?: 'profile' | 'post'
}

const FileUploader = ({ fieldChange, mediaUrl, type = 'post' }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        setFile(acceptedFiles);
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file]);

    const { getRootProps, getInputProps } =
        useDropzone({
            onDrop,
            accept: {
                'image/*': ['.png', '.jpg', '.jpeg', '.svg']
            }
        })


    return (
        <div
            {...getRootProps()}
            className={`flex flex-center cursor-pointer ${type === 'profile' && 'w-fit'} ${type === 'post' && 'flex-col bg-dark-3 rounded-xl'}`}
        >
            <input
                {...getInputProps()}
                className='cursor-pointer'
            />
            {
                fileUrl ? (
                    <>
                        <div
                            className={` ${type === 'profile' && 'rounded-full flex-auto w-[200px]'} flex flex-1 justify-center ${type === 'post' && 'p-5 lg:p-10 w-full'}`}
                        >
                            <img src={fileUrl} alt="" className={type === 'profile' ? 'profile_file_uploader-img' : 'file_uploader-img'} />
                        </div>
                        <p className={type === 'profile' ? 'profile_file_uploader-label' : 'file_uploader-label'}>
                            {type === 'profile' ? 'Change profile photo' : 'Click or drag photo to replace'}
                        </p>
                    </>


                ) : (
                    type === 'post' && <div className='file_uploader-box'>
                        <img src="/assets/icons/file-upload.svg" width={96} height={77} alt="" />
                        <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                        <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

                        <Button className='shad-button_dark_4'>
                            Select from computer
                        </Button>
                    </div>
                )

            }
        </div >
    )
}

export default FileUploader