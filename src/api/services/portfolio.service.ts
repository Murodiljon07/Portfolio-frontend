import api from "@/api/api";

const profileService = {
  getAdminMe: async () => {
    const data = await api.get("admin/me");

    return data.data.data;
  },
};

export default profileService;
