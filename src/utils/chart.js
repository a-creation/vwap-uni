import dayjs from 'dayjs'

export const CHART_OPTIONS = {
  height: 500,
  width: 700,
  layout: {
    backgroundColor: 'transparent',
    textColor: 'black'
  },
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0,
    },

    drawTicks: false,
    borderVisible: false,
    visible: true,
  },
  timeScale: {
    borderVisible: true,
    fixLeftEdge: true,
    fixRightEdge: true,
    timeVisible: true,
  },
  watermark: {
    color: 'rgba(0, 0, 0, 0)',
  },
  grid: {
    horzLines: {
      visible: false,
    },
    vertLines: {
      visible: false,
    },
  },
  crosshair: {
    horzLine: {
      visible: true,
      labelVisible: true,
    },
    vertLine: {
      visible: true,
      style: 3,
      width: 1,
      labelBackgroundColor: 'black',
      labelVisible: true,
    },
  }
}

export const CHART_OPTIONS2 = {
  height: 500,
  width: 700,
  layout: {
    backgroundColor: 'transparent',
    textColor: 'black'
  },
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0,
    },

    drawTicks: false,
    borderVisible: false,
    visible: true,
  },
  timeScale: {
    borderVisible: true,
    fixLeftEdge: true,
    fixRightEdge: true,
    tickMarkFormatter: (unixTime ) => {
      return dayjs.unix(unixTime).format('HH:mm')
    }
  },
  watermark: {
    color: 'rgba(0, 0, 0, 0)',
  },
  grid: {
    horzLines: {
      visible: false,
    },
    vertLines: {
      visible: false,
    },
  },
  crosshair: {
    horzLine: {
      visible: false,
      labelVisible: false,
    },
    vertLine: {
      visible: true,
      style: 3,
      width: 1,
      labelBackgroundColor: 'black',
      labelVisible: false,
    },
  }
}
