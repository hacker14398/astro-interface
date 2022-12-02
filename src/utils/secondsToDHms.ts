export default function secondsToDHms(d: number, all?: boolean) {
  d = Number(d);
  var h = Math.floor(Math.floor(d / 3600) % 24);
  var days = Math.floor(Math.floor(d / 3600) / 24);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  
  var daysDisplay = days > 0 ? days + (days === 1 ? " day " : " days ") : "";
  var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " sec" : " secs") : "";

  if(all && daysDisplay!=="" && hDisplay === "") return daysDisplay + mDisplay + sDisplay
  if (all && hDisplay !== "") return daysDisplay + hDisplay + mDisplay;
  if (all) return hDisplay + mDisplay + sDisplay;
  if (days > 0) return daysDisplay;
  if (h > 0) return hDisplay;
  if (m > 0) return mDisplay;
  if (s > 0) return sDisplay;
}
