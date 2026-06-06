import api from "@/api/api";

const profileService = {
  getAdminMe: async () => {
    const data = await api.get("admin/me");

    return data.data.data;
  },

  sendMessage: async (message: any) => {
    const messageData = await api.post("/messages/send", message);

    return messageData;
  },

  projects: async () => {
    const projectsData = await api.get("/projects");

    return projectsData.data;
  },
};

export default profileService;
