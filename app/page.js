import FormularioPrestamo from './components/FormularioPrestamo'; // Asegúrate que la ruta sea correcta

export const metadata = {
  title: "Préstamos Rápidos | Tu Financiera",
  description: "Solicitá tu préstamo personal 100% online. Rápido, fácil y seguro. Completá el formulario y nos contactamos.",
  robots: "index, follow",
  openGraph: {
    title: "Préstamos Rápidos | Tu Financiera",
    description: "Solicitá tu préstamo personal 100% online. Rápido, fácil y seguro.",
  },
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800 p-6 flex items-center justify-center">
        <FormularioPrestamo />
      </main>
    </>
  );
}
