import { SetStateAction, useRef, useState } from "react";

import { NewGameFormValues } from "../NewGameForm/NewGameForm";

import { Box } from "@mui/material";

import "./imageUpload.scss"

interface ImageUploadProps {
  setNewGameFormValues: React.Dispatch<SetStateAction<NewGameFormValues>>
  newGameFormValues: NewGameFormValues
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setNewGameFormValues, newGameFormValues }) => {
  const [dragActive, setDragActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    }
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragleave") {
      setDragActive(false);
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setNewGameFormValues({ ...newGameFormValues, cover: event.dataTransfer.files[0] })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setNewGameFormValues({ ...newGameFormValues, cover: event.target.files[0] })
    }
  }

  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }

  return (
    <div className={"image-upload"}>
      <Box
        id={"image-drop"}
        className={dragActive ? "drag-active" : ""}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input type={"file"} id={"input-file-upload"} onChange={handleChange} ref={inputRef} />
      </Box>
    </div>
  )
}
export default ImageUpload;
