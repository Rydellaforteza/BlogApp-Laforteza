import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    user: null, 
  }),

  actions: {
    
    setUserFromToken(token) {
      if (!token) {
        this.user = null;
        localStorage.removeItem("token");
        return;
      }

      localStorage.setItem("token", token);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.user = payload;
      } catch (err) {
        console.error("Invalid token", err);
        this.user = null;
        localStorage.removeItem("token");
      }
    },

    
    loadUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.user = null;
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.user = payload;
      } catch (err) {
        this.user = null;
        localStorage.removeItem("token");
      }
    },

   
    logout() {
      this.user = null;
      localStorage.removeItem("token");
    }
  },

  persist: true 
});
