import { Http } from "@/services/service";

export default {
  methods: {
    updateField(key, property, value) {
      const index = this.fields.findIndex(field => field.key === key);
      if (index !== -1) {
        this.fields[index][property] = value;
        this.fields = this.fields.map((field, i) => {
          if (i === index) {
            return { ...field, [property]: value };
          }
          return field;
        });
      }
    },
    async remoteValidate(key, url, payload) {
      try {
        this.updateField(key, "loading", true);
        const resp = await new Http({
          auth: true
        }).post(url, payload);
        return resp.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.updateField(key, "loading", false);
      }
    }
  }
};
