/**
 * @param from Initial value
 * @param to Target value
 * @param divisor Speed divisor (more == less speed)
 * @returns New value
 */
 export function smoothOut(from: number, to: number, divisor = 3): number {
  // Calculate speed
  let speed = Math.abs(to - from) / divisor

  // Terminate speed below certain number
  if (speed < 0.001) speed = 0

  return from + (to > from ? speed : -speed)
}