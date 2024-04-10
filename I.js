;(() => {
   function n(e) {
      return Array.from(document.querySelectorAll(`[ift-curresnt='${e}']`))
   }
   function d() {
      let r = new Date().getFullYear(),
         a = new Date(r, 11, 31)
      return i(a)
   }
   function E() {
      let e = new Date(),
         r = e.getFullYear(),
         a = e.getMonth(),
         m = new Date(r, a + 1, 0)
      return i(m)
   }
   function l() {
      let e = new Date(),
         a = (h(e.getFullYear()) ? 366 : 365) * 24 * 3600 * 1e3,
         m = new Date(e.getFullYear(), 0, 1, 0, 0, 0, 0)
      return (100 * (e.getTime() - m.getTime())) / a
   }
   function h(e) {
      return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0
   }
   function i(e) {
      let r = new Date(),
         a = e.getTime() - r.getTime()
      return Math.ceil(a / (1e3 * 60 * 60 * 24))
   }
   window.Webflow || (window.Webflow = [])
   window.Webflow.push(() => {
      let e = new Date(),
         r = document.documentElement.lang || "en"
      n("year").forEach(t => (t.textContent = `${e.getFullYear()}`)),
         n("month").forEach(t => (t.textContent = e.toLocaleString(r, { month: "long" }))),
         n("weekday").forEach(t => (t.textContent = e.toLocaleString(r, { weekday: "long" }))),
         n("hour").forEach(t => (t.textContent = `${e.getHours()}`)),
         n("minute").forEach(t => (t.textContent = `${e.getMinutes()}`)),
         n("second").forEach(t => (t.textContent = `${e.getSeconds()}`)),
         n("month-number").forEach(t => (t.textContent = `${e.getMonth() + 1}`)),
         n("weekday-number").forEach(t => (t.textContent = `${e.getDay()}`)),
         n("quarter").forEach(t => {
            let o = e.getMonth()
            o < 3 ? (t.textContent = "1") : o < 6 ? (t.textContent = "2") : o < 9 ? (t.textContent = "3") : (t.textContent = "4")
         }),
         n("day-of-month").forEach(t => (t.textContent = String(e.getDate()))),
         n("day-of-year").forEach(t => {
            let o = new Date(e.getFullYear(), 0, 1),
               s = e.getTime() - o.getTime()
            t.textContent = String(Math.floor(s / (1e3 * 60 * 60 * 24)) + 1)
         }),
         n("days-left-in-year").forEach(t => (t.textContent = String(d()))),
         n("days-left-in-month").forEach(t => (t.textContent = String(E()))),
         n("percentage-of-year-passed").forEach(t => (t.textContent = l().toFixed(2))),
         n("percentage-of-year-left").forEach(t => (t.textContent = (100 - l()).toFixed(2))),
         n("days-until-date").forEach(t => {
            let s = (t.getAttribute("ift-current-target-date") ?? "").split("-")
            if (s.length !== 3) return
            let u = Number(s[0]),
               c = Number(s[1]) - 1,
               f = Number(s[2]),
               g = i(new Date(u, c, f))
            t.textContent = String(g)
         }),
         n("timezone").forEach(t => {
            let o = t.getAttribute("ift-current-timezone-format")?.toLowerCase()
            if (!o || o === "generic") {
               let c = new Intl.DateTimeFormat(r, { timeZoneName: "long" })
                  .formatToParts(new Date())
                  .find(f => f.type === "timeZoneName")?.value
               if (!c) return
               t.textContent = c
            } else o === "iana" && (t.textContent = new Intl.DateTimeFormat(r, {}).resolvedOptions().timeZone)
         }),
         n("time").forEach(t => {
            let o = t.getAttribute("ift-current-time-format")?.toLowerCase()
            !o || o === "24-hour"
               ? (t.textContent = `${e.getHours()}:${e.getMinutes()}`)
               : o === "12-hour" && (t.textContent = e.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: !0 }))
         })
   })
})()
