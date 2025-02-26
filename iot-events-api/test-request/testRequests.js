const axios = require('axios');

// URL base da API
const BASE_URL = 'http://localhost:3000/api/events';

// Criar um evento
const createEvent = async () => {
  try {
    const response = await axios.post(BASE_URL, {
      person: { id: 1, name: 'Juca' },
      deviceId: 2,
      description: 'Comunicação falhou',
      type: 'falha',
      additionalDetails: 'Perda de sinal'
    });
    console.log('Evento criado:', response.data);
  } catch (error) {
    console.error('Erro ao criar evento:', error.message);
  }
};

// Buscar todos os eventos
const getAllEvents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log('Eventos:', response.data);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error.message);
  }
};

// Buscar um evento por ID
const getEventById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log('Evento:', response.data);
  } catch (error) {
    console.error('Erro ao buscar evento:', error.message);
  }
};

// Atualizar um evento
const updateEvent = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      description: 'Comunicação restaurada',
      type: 'sucesso',
      additionalDetails: 'Sinal restabelecido'
    });
    console.log('Evento atualizado:', response.data);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error.message);
  }
};

// Deletar um evento
const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    console.log('Evento deletado:', response.data);
  } catch (error) {
    console.error('Erro ao deletar evento:', error.message);
  }
};

// Testar as funções
const testAPI = async () => {
  await createEvent();
  await getAllEvents();
  const id = 'id_do_evento_aqui'; // Substitua pelo ID real do evento
  await getEventById(id);
  await updateEvent(id);
  await deleteEvent(id);
};

testAPI();
