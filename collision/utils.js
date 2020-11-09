function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

const getRandomColor = () => {
    const colors = [
        '#e53935',
        '#d81b60',
        '#8e24aa',
        '#5e35b1',
        '#3949ab',
        '#1e88e5',
        '#039be5',
        '#00acc1',
        '#00897b',
        '#43a047',
        '#ffeb3b',
        '#ef6c00'
    ]

    const idx = getRandomInt(0, colors.length - 1)
    return colors[idx]
}

const getContext = () => {
    const canvas = document.querySelector('canvas')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    return canvas.getContext('2d')
}