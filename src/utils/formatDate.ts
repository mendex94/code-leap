export default function formatDate(date: string) {
  const now = new Date()
  const postDate = new Date(date)
  const diff = Math.round((now.getTime() - postDate.getTime()) / 1000)
  if (diff < 60) {
    return diff + ' seconds ago';
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return minutes + ' minutes ago';
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return hours + ' hours ago';
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return days + ' days ago';
  } else {
    return date.toString().slice(0, 10);
  }
}