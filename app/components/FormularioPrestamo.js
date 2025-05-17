"use client";
import { useState } from 'react';
import Image from 'next/image';

const initialFormData = {
  nombre: '',
  dni: '',
  telefono: '',
  email: '',
  monto: ''
};

export default function FormularioPrestamo() {
  const [formData, setFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'sending', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/enviar', { // Asegúrate que esta ruta a tu API es correcta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmissionStatus('success');
        setMessage('¡Formulario enviado correctamente! Pronto nos contactaremos.');
        setFormData(initialFormData); // Resetear formulario
      } else {
        const errorData = await res.json().catch(() => ({})); // Intenta obtener datos del error
        setSubmissionStatus('error');
        setMessage(errorData.message || 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setSubmissionStatus('error');
      setMessage('Error de conexión. Por favor, verifica tu conexión e inténtalo de nuevo.');
    }
  };

  return (
    <section className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="Logo de ExpresCash" width={150} height={150} className="rounded-full" />
      </div>
      <h1 className="text-4xl font-bold text-center text-green-700 mb-2">Préstamos rápidos y seguros</h1>
      <p className="text-center text-lg text-gray-600 mb-8">Completá el formulario y nos pondremos en contacto con vos.</p>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input type="text" name="nombre" id="nombre" required className="mt-1 w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
          <input type="text" name="dni" id="dni" required className="mt-1 w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input type="tel" name="telefono" id="telefono" required className="mt-1 w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" required className="mt-1 w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
        </div>
        <div>
         <label htmlFor="monto" className="block text-sm font-medium text-gray-700">Monto deseado</label>
          <input type="number" name="monto" id="monto" required className="mt-1 w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
        </div>
        <button
          type="submit"
          disabled={submissionStatus === 'sending'}
          className="mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submissionStatus === 'sending' ? 'Enviando...' : 'Solicitar préstamo'}
        </button>
      </form>
      {submissionStatus && message && (
        <div className="mt-4 text-center">
          {submissionStatus === 'success' && (
            <p className="text-green-600">{message}</p>
          )}
          {submissionStatus === 'error' && (
            <p className="text-red-600">{message}</p>
          )}
        </div>
      )}
    </section>
  );
}
