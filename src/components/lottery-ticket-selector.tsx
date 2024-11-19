"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LotteryTicketSelector = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // esto vendría de una base de datos
  const soldNumbers: number[] = [];

  const handleNumberClick = (number: number) => {
    if (soldNumbers.includes(number)) return;

    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en base de datos
    setSuccessMessage(`¡Números reservados exitosamente!`);
    setSelectedNumbers([]);
    setFormData({ name: '', phone: '' });
    setShowForm(false);
  };

  const getNumberColor = (number: number) => {
    if (soldNumbers.includes(number)) return 'bg-gray-400';
    if (selectedNumbers.includes(number)) return 'bg-green-500';
    return 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Rifa</CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-4">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-10 gap-2 mb-6">
            {[...Array(100)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleNumberClick(i + 1)}
                className={`${getNumberColor(i + 1)} text-white p-2 rounded-lg text-center 
                  ${soldNumbers.includes(i + 1) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={soldNumbers.includes(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="text-center mb-4">
            <div className="flex justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span>Vendido</span>
              </div>
            </div>
          </div>

          {selectedNumbers.length > 0 && !showForm && (
            <div className="text-center">
              <p className="mb-4">
                Has seleccionado los números: {selectedNumbers.sort((a, b) => a - b).join(', ')}
              </p>
              <Button onClick={() => setShowForm(true)}>
                Reservar Números
              </Button>
            </div>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={ handleInputChange}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Whatsapp o teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit">Enviar</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LotteryTicketSelector;