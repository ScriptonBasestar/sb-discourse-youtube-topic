import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "add-youtube-field",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.modifyClass("controller:composer", {
        pluginId: "discourse-plugin-youtube-topic",

        youtubeUrls: [],

        actions: {
          addYoutubeUrl(url) {
            this.youtubeUrls = [...this.youtubeUrls, url];
          },
        },

        save() {
          if (!this.youtubeUrls) {
            this.youtubeUrls = [];
          }

          // Save to extra params
          this.model.set("youtubeUrls", this.youtubeUrls);
          return this._super(...arguments);
        },
      });

      // hook into composer extra fields
      api.modifyClass("model:composer", {
        pluginId: "discourse-plugin-youtube-topic",

        youtubeUrls: null,

        init() {
          this._super(...arguments);
          this.youtubeUrls = [];
        },

        saveAttrs() {
          let attrs = this._super(...arguments);
          attrs.youtubeUrls = this.youtubeUrls || [];
          return attrs;
        },
      });
    });
  },
};