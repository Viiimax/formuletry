"use client";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Términos de Servicio</h1>
      <p className="mb-4">
        Bienvenido a Formuletry. Al utilizar nuestro sitio, aceptas los siguientes términos y condiciones.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Uso de Datos</h2>
      <p className="mb-4">
        Los datos proporcionados en este sitio son referenciales y no oficiales de Fórmula 1. No garantizamos la precisión de la información.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Código Abierto</h2>
      <p>
        Formuletry es un proyecto de código abierto bajo la licencia AGPL-3.0. Puedes contribuir o usar el código según los términos de esta licencia.
      </p>
    </div>
  );
}