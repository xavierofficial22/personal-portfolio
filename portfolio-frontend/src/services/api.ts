import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_URL = `${BACKEND_URL}/api`;

// Public axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Admin axios instance (sends X-Admin-Key header)
const adminApi = axios.create({
  baseURL: API_URL,
});

adminApi.interceptors.request.use((config) => {
  const key = sessionStorage.getItem('admin_key');
  if (key) {
    config.headers['X-Admin-Key'] = key;
  }
  return config;
});

// ── Auth ────────────────────────────────────────────────────────

export const verifyAdminKey = async (key: string) => {
  const response = await axios.post(`${API_URL}/admin/verify`, null, {
    headers: { 'X-Admin-Key': key },
  });
  return response.data;
};

export const isAdminAuthenticated = (): boolean => {
  return !!sessionStorage.getItem('admin_key');
};

export const adminLogout = () => {
  sessionStorage.removeItem('admin_key');
};

// ── Public ──────────────────────────────────────────────────────

export const getUpdates = async () => {
  const response = await api.get('/updates');
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

export const getCertificates = async () => {
  const response = await api.get('/certificates');
  return response.data;
};

export const getImages = async () => {
  const response = await api.get('/images');
  return response.data;
};

export const getImagesByCategory = async (category: string) => {
  const response = await api.get(`/images/category/${category}`);
  return response.data;
};

export const getImagesByUpdate = async (updateId: number) => {
  const response = await api.get(`/images/update/${updateId}`);
  return response.data;
};

// ── Admin: Updates ──────────────────────────────────────────────

export const getAdminUpdates = async () => {
  const response = await adminApi.get('/admin/updates');
  return response.data;
};

export const createUpdate = async (data: FormData) => {
  const response = await adminApi.post('/admin/updates', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateUpdate = async (id: number, data: FormData) => {
  data.append('_method', 'PUT');
  const response = await adminApi.post(`/admin/updates/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteUpdate = async (id: number) => {
  const response = await adminApi.delete(`/admin/updates/${id}`);
  return response.data;
};

// ── Admin: Skills ───────────────────────────────────────────────

export const getAdminSkills = async () => {
  const response = await adminApi.get('/admin/skills');
  return response.data;
};

export const createSkill = async (data: any) => {
  const response = await adminApi.post('/admin/skills', data);
  return response.data;
};

export const updateSkill = async (id: number, data: any) => {
  const response = await adminApi.put(`/admin/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id: number) => {
  const response = await adminApi.delete(`/admin/skills/${id}`);
  return response.data;
};

// ── Admin: Certificates ─────────────────────────────────────────

export const getAdminCertificates = async () => {
  const response = await adminApi.get('/admin/certificates');
  return response.data;
};

export const createCertificate = async (data: any) => {
  const response = await adminApi.post('/admin/certificates', data);
  return response.data;
};

export const updateCertificate = async (id: number, data: any) => {
  const response = await adminApi.put(`/admin/certificates/${id}`, data);
  return response.data;
};

export const deleteCertificate = async (id: number) => {
  const response = await adminApi.delete(`/admin/certificates/${id}`);
  return response.data;
};

// ── Admin: Images ───────────────────────────────────────────────

export const createImage = async (data: any) => {
  const response = await adminApi.post('/admin/images', data);
  return response.data;
};

export const updateImage = async (id: number, data: any) => {
  const response = await adminApi.put(`/admin/images/${id}`, data);
  return response.data;
};

export const deleteImage = async (id: number) => {
  const response = await adminApi.delete(`/admin/images/${id}`);
  return response.data;
};

// ── Page View Tracking ──────────────────────────────────────────

export const trackPageView = async (page: string = '/') => {
  try {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);
    }
    await api.post('/track', { page, visitor_id: visitorId });
  } catch {
    // Silently fail — tracking is non-critical
  }
};

// ── Admin: Metrics ──────────────────────────────────────────────

export const getMetrics = async () => {
  const response = await adminApi.get('/admin/metrics');
  return response.data;
};

export default api;