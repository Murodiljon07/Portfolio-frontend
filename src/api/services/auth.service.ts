import api from "../api";

export const auth = {
  login: async (form: any) => {
    const data = await api.post("/auth/admin/login", form);

    return data;
  },
};
