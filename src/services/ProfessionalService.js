import API from "../api/api"


const useMock = import.meta.env.VITE_USE_MOCK === "true";

export const getProfessionals = async () => {
  if (useMock) return mockData.professionals;
  const res = await API.get("/professionals");
  return res.data;
};

export const getProfessionalById = async (id) => {
  if (useMock) return mockData.professionals.find(prof => prof.id === id);
  const res = await API.get(`/professionals/${id}`);
  return res.data;
}

export const postReview = async (professionalId, review) => {
  if (useMock) return { success: true };
  const res = await API.post(`professionals/${professionalId}/reviews`, review);
  return res.data;
}

export const getServicesByProfessional = async (professionalId) => {
  if (useMock) return mockData.services.filter(s => s.professionalId === professionalId);
  const res = await API.get(`/professionals/${professionalId}/services`);
  return res.data;
};
export const getReviewsByProfessional = async (professionalId) => {
  if (useMock) return mockData.reviews.filter(r => r.professionalId === professionalId);
  const res = await API.get(`/professionals/${professionalId}/reviews`);
  return res.data;
};
export const getAgendaByProfessional = async (professionalId) => {
  if (useMock) return mockData.agenda.filter(a => a.professionalId === professionalId);
  const res = await API.get(`/professionals/${professionalId}/agenda`);
  return res.data;
};

