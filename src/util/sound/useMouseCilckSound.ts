const soundConfig: Record<'click', string> = {
  click: '/music/Mouse-click-sound-effect.mp3'
}

export function useSound() {
  let lastPlayTime = 0
  const THROTTLE = 150 // 150ms 内不重复播放

  const play = (type: 'click' = 'click') => {
    const now = Date.now()
    if (now - lastPlayTime < THROTTLE) return

    const src = soundConfig[type]
    const audio = new Audio(src)
    audio.play().catch(() => { })
    lastPlayTime = now
  }

  return { play }
}
