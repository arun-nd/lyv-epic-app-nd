<template>
<v-container>
  <v-row>
    <v-col lg="12">
       <v-layout row >
    <v-flex xs12 pb-1 pl-1 pr-3>
      <div ref="plotContainer" class="plot-container" v-resize="onResize">
      </div>
    </v-flex>
  </v-layout>
    </v-col>
   
  </v-row>
  
</v-container>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  name: 'PercentageGraph',
  props: {
    visible: Boolean,
    data: Array
  },
  data () {
    return {
      config: {
        responsive: true,
        displayModeBar: false,
        staticPlot: true
      },
      layout: {
        xaxis: {
          fixedrange: true,
          title: {
            text: '%',
            x: 1
          },
          range: [0, 100],
          showline: true,
          mirror: true
        },
        yaxis: {
          fixedrange: true,
          showline: true,
          mirror: true
        },
        margin: {
          l: 100,
          t: 10,
          b: 30,
          r: 40
        },
        height: 80,
        font: {
          family: "Roboto",
          size: 14
        }
      }
    }
  },
  methods: {
    onResize () {
      this.layout.width = this.$refs.plotContainer.offsetWidth
      Plotly.react(this.$refs.plotContainer, this.data, this.layout, this.config)
    }
  },
  mounted () {
    Plotly.react(this.$refs.plotContainer, this.data, this.layout, this.config)
  },
  watch: {
    data () {
      Plotly.react(this.$refs.plotContainer, this.data, this.layout, this.config)
    },
    visible (val) {// eslint-disable-line no-unused-vars
      this.onResize()
    }
  }
}
</script>

<style lang="scss" scoped>
.plot-container {
  height: 80px;
}
.js-plotly-plot .plotly, .js-plotly-plot .plotly div{
padding: 10px !important;
}
.js-plotly-plot .plotly div{
  padding: 10px !important;
}
</style>
