export default function timeText(minutes: number) {
  return minutes < 60
    ? minutes + " mins"
    : Math.round(minutes / 60) +
        " hr" +
        (Math.round(minutes / 60) > 1 ? "s" : "");
}
