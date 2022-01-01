import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import clienteAxios from "services/config"

const Dropzone = () => {

  const onDrop = useCallback(async acceptedFiles => {
    console.log(acceptedFiles)

    // Crear un formData
    const formData = new FormData()
    formData.append("archivo", acceptedFiles[0])

    const resultado = await clienteAxios.post("/api/archivos", formData)
    console.log(resultado.data)
  }, [])

  // Extraer el contenido del dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      <div {...getRootProps({ classsName: "dropzone w-full py-32" })}>
        <input className="h-100" {...getInputProps()} />
        {
          isDragActive
            ?
            <p className="text-2xl text-center text-gray-600">Suelta el archivo </p>
            :
            (
              <div className="text-center">
                <p className="text-2xl text-center text-gray-600">
                  Selecciona un archivo y arrastralo aqui
                </p>
                <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                  Selecciona archivos para subir
                </button>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Dropzone;