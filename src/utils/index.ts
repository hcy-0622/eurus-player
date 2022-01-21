export function timeFormat(times = 0) {
  let minutes = 0;
  let seconds = 0;
  if (times < 60) {
    seconds = times;
  } else {
    minutes = Math.floor(times / 60);
    seconds = times % 60;
  }

  return (
    (minutes + "").padStart(2, "0") +
    ":" +
    (Math.floor(seconds) + "").padStart(2, "0")
  );
}
