<template>
  <v-card>
    <!-- <v-footer v-bind="localAttrs" padless>
      <v-card class="flex theme-footer-color" text tile>
        <v-container fluid>
          <v-row>
            <v-col sm="12" lg="2">
              <v-img
                class="mx-2"
                src="@/assets/pumas-brand-footer.png"
                max-height="100"
                max-width="100"
                contain
              ></v-img>
            </v-col>
            <v-col sm="12" lg="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="white--text fs-13"
                    >Healthcare</v-list-item-title
                  >
                  <v-list-item-title class="white--text fs-13"
                    >Intelligence</v-list-item-title
                  >
                  <v-list-item-title class="white--text fs-13"
                    >Augmented</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col sm="12" lg="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="grey--text fs-13"
                    >PRODUCTS & SERVICES</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="white--text"
                    ><a
                      target="_blank"
                      href="https://pumas.ai/products/pumas/overview"
                      >Pumas</a
                    >
                  </v-list-item-subtitle>
                  <v-list-item-title class="white--text"
                    ><a target="_blank" href="https://pumas.ai/products/lyv"
                      >Lyv</a
                    ></v-list-item-title
                  >
                  <v-list-item-title class="white--text"
                    ><a target="_blank" href="https://pumas.ai/services"
                      >Consulting</a
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col sm="12" lg="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle size="12" class="grey--text fs-13"
                    >QUICKLINKS</v-list-item-subtitle
                  >
                  <v-list-item-title size="12" class="white--text"
                    ><a target="_blank" href="https://pumas.ai/company/news"
                      >News</a
                    ></v-list-item-title
                  >
                  <v-list-item-title class="white--text"
                    ><a
                      target="_blank"
                      href="https://pumas.ai/products/pumas/download"
                      >Download</a
                    ></v-list-item-title
                  >
                  <v-list-item-title class="white--text"
                    ><a target="_blank" href="https://pumas.ai/resources"
                      >Resource</a
                    ></v-list-item-title
                  >
                  <v-list-item-title class="white--text"
                    ><a
                      target="_blank"
                      href="https://pumas.ai/company/contact-us"
                      >Contact</a
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col sm="12" lg="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="grey--text fs-13"
                    >LEGAL</v-list-item-subtitle
                  >
                  <v-list-item-title class="white--text"
                    ><a target="_blank" href="https://pumas.ai/terms"
                      >Terms</a
                    ></v-list-item-title
                  >
                  <v-list-item-title class="white--text"
                    ><a target="_blank" href="https://pumas.ai/privacy"
                      >Privacy</a
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col sm="12" lg="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="white--text">
                    <a target="_blank" href="https://twitter.com/pumas_ai">
                      <v-icon medium color="white">
                        mdi-twitter
                      </v-icon>
                    </a>

                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/pumas-ai/"
                    >
                      <v-icon medium color="white">
                        mdi-linkedin
                      </v-icon>
                    </a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>
        <v-card-text class="py-2 white--text text-center">
          <strong>© Pumas-AI, Inc. </strong> {{ new Date().getFullYear() }}. All
          rights reserved.
        </v-card-text>
      </v-card>
    </v-footer> -->
  </v-card>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    items: ["default", "absolute", "fixed"],
    padless: false,
    variant: "default",
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    footerItem: [
      { text: "Healthcare" },
      { text: "Intelligence" },
      { text: "Augmented" },
    ],
  }),
  computed: {
    localAttrs() {
      const attrs = {};
      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>
<style scoped>
v-list-item {
  font-size: 13px;
}
a {
  color: white !important;
  text-decoration: none;
  font-size: 13px;
}
.fs-13 {
  font-size: 13px;
}
</style>
