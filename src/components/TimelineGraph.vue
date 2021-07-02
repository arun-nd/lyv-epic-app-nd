<template>
  <v-layout row>
    <v-flex xs12 pb-1>
      <div ref="plotContainer" class="plot-container"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import Plotly from "plotly.js-dist";
import { toLocalDateTimeString } from "@/misc/utils";

export default {
  name: "TimelineGraph",
  props: {
    visible: Boolean,
    data: Array,
  },
  data() {
    return {
      currentTimeTrace: {},
      config: {
        responsive: true,
        displayModeBar: true,
        modeBarButtons: [
          ["zoom2d", "pan2d", "zoomIn2d", "zoomOut2d", "resetScale2d"],
        ],
        displaylogo: false,
      },
      layout: {
        xaxis: {
          showline: true,
          mirror: true,
        },
        yaxis: {
          fixedrange: true,
          title: {
            text: "Concentration (mg/L)",
          },
          range: [0, 40],
          showline: true,
          mirror: true,
        },
        legend: {
          orientation: "h",
          y: -0.2,
        },
        margin: {
          l: 50,
          t: 30,
          b: 10,
          r: 25,
        },
        font: {
          family: "Roboto",
          size: 14,
        },
      },
    };
  },
  // mounted () {
  //   this.showPlot()
  // },
  methods: {
    onResize() {
      this.layout.width = this.$refs.plotContainer.offsetWidth;
      this.showPlot();
    },
    showPlot() {
      // if (this.fixedData && this.fixedData[0] && this.fixedData[0].x) {
      //   this.layout.xaxis.range = [this.fixedData[0].x[0], this.fixedData[0].x[this.fixedData[0].x.length - 1]]
      // }
      Plotly.react(
        this.$refs.plotContainer,
        this.fixedData,
        this.layout,
        this.config
      );
    },
    computeCurrentTimeTrace() {
      this.currentTimeTrace = {
        type: "scatter",
        x: [new Date(), new Date()],
        y: [0, 40],
        mode: "lines",
        fill: "tozerox",
        fillcolor: "rgba(0,0,0,0.05)",
        line: {
          color: "rgba(0,0,0,0.3)",
        },
        showlegend: true,
        name: "Current Time",
        hoverinfo: "none",
      };
      this.showPlot();

      // update once a minute
      setTimeout(this.computeCurrentTimeTrace, 1000 * 60);
    },
  },
  mounted() {
    this.showPlot();
    this.computeCurrentTimeTrace();
  },
  watch: {
    data() {
      this.showPlot();
    },
    visible() {
      this.onResize();
    },
  },
  computed: {
    fixedData() {
      let out = [];
      for (let trace of this.data) {
        if (trace.x) {
          for (const ind in trace.x) {
            trace.x[ind] = toLocalDateTimeString(trace.x[ind]);
          }
        }
        out.push(trace);
      }
      out.push(this.currentTimeTrace);
      return out;
    },
  },
};
</script>

<style lang="scss" scoped>
.plot-container {
  height: 550px;
}
</style>
