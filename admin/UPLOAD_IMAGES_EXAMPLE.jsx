import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

const ImageUploader = () => {
  const maxImages = 5;
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    const invalidFiles = files.filter((file) => file.size > maxSize);
    if (invalidFiles.length > 0) {
      alert('Algunas imágenes exceden el tamaño máximo de 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const invalidTypes = files.filter((file) => !validTypes.includes(file.type));
    if (invalidTypes.length > 0) {
      alert('Solo se permiten archivos JPG, PNG, WebP y GIF');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });
      formData.append('folder', 'products');

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const tempUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...tempUrls]);
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      alert('Error al subir las imágenes. Por favor intenta de nuevo.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = async (index) => {
    try {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      alert('Error al eliminar la imagen');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imágenes del Producto ({images.length}/{maxImages})
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
            <img
              src={imageUrl}
              alt={`Imagen ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-pink-50">
            {uploading ? (
              <>
                <Loader className="animate-spin text-pink-500 mb-2" size={32} />
                <span className="text-xs text-gray-600">{uploadProgress}%</span>
              </>
            ) : (
              <>
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-xs text-gray-600">Subir imagen</span>
              </>
            )}
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <ImageIcon className="text-blue-600 mt-0.5" size={16} />
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">Requisitos de las imágenes:</p>
            <ul className="list-disc list-inside space-y-0.5 text-blue-700">
              <li>Formato: JPG, PNG, WebP o GIF</li>
              <li>Tamaño máximo: 5MB por imagen</li>
              <li>Máximo {maxImages} imágenes por producto</li>
              <li>Recomendado: imágenes cuadradas de al menos 800x800px</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

export const ProductFormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Producto a crear:', formData);
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="admin-input"
      />

      <ImageUploader />

      <button type="submit" className="admin-button admin-button-primary">
        Crear Producto
      </button>
    </form>
  );
};
