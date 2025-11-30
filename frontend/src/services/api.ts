// API Service for Resume Builder & E-Portfolio
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Auth API
export const authAPI = {
  register: async (userData: { fullName: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData: { fullName?: string; profilePicture?: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  }
};

// Resume API
export const resumeAPI = {
  create: async (resumeData: any) => {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(resumeData)
    });
    return handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  update: async (id: string, resumeData: any) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(resumeData)
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  }
};

// Upload API
export const uploadAPI = {
  uploadProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    return handleResponse(response);
  },

  uploadProjectImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/project`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    return handleResponse(response);
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    return handleResponse(response);
  }
};

// Portfolio API
export const portfolioAPI = {
  createOrUpdate: async (portfolioData: any) => {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(portfolioData)
    });
    return handleResponse(response);
  },

  getMy: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolios/me`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_BASE_URL}/portfolios/${slug}`);
    return handleResponse(response);
  },

  togglePublish: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolios/publish`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  delete: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  }
};
