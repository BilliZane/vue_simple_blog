<template>
  <Line :data="data" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  props: ['emails', 'length', 'labelText', 'chartColor'],
  components: {
    Line,
  },

  setup(props) {
    const data = ref({
      labels: props.emails,
      datasets: [
        {
          label: props.labelText,
          backgroundColor: props.chartColor,
          data: props.length,
        },
      ],
    })

    const options = ref({
      responsive: true,
    })

    return {
      data,
      options,
    }
  },
}
</script>
