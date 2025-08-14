export function formatTime(date){
  return new Date(date).toLocaleTimeString('en-US', { date:"", hour:"2-digit",minute:"2-digit",hour12:true})
}