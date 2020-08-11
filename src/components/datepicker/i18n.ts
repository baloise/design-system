function deProcessRelativeTime(num: number, withoutSuffix: boolean, key: string): any {
  const format = {
    m: ["eine Minute", "einer Minute"],
    h: ["eine Stunde", "einer Stunde"],
    d: ["ein Tag", "einem Tag"],
    dd: [num + " Tage", num + " Tagen"],
    M: ["ein Monat", "einem Monat"],
    MM: [num + " Monate", num + " Monaten"],
    y: ["ein Jahr", "einem Jahr"],
    yy: [num + " Jahre", num + " Jahren"],
  };
  return withoutSuffix ? format[key][0] : format[key][1];
}

export const i18n: { [key: string]: any } = {
  de: {
    months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
    monthsParseExact: true,
    weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd, D. MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[heute um] LT [Uhr]",
      sameElse: "L",
      nextDay: "[morgen um] LT [Uhr]",
      nextWeek: "dddd [um] LT [Uhr]",
      lastDay: "[gestern um] LT [Uhr]",
      lastWeek: "[letzten] dddd [um] LT [Uhr]",
    },
    relativeTime: {
      future: "in %s",
      past: "vor %s",
      s: "ein paar Sekunden",
      ss: "%d Sekunden",
      m: deProcessRelativeTime,
      mm: "%d Minuten",
      h: deProcessRelativeTime,
      hh: "%d Stunden",
      d: deProcessRelativeTime,
      dd: deProcessRelativeTime,
      M: deProcessRelativeTime,
      MM: deProcessRelativeTime,
      y: deProcessRelativeTime,
      yy: deProcessRelativeTime,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4,  // The week that contains Jan 4th is the first week of the year.
    },
  },
  it: {
    months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
    monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
    weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
    weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
    weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Oggi alle] LT",
      nextDay: "[Domani alle] LT",
      nextWeek: "dddd [alle] LT",
      lastDay: "[Ieri alle] LT",
      lastWeek: (): string => {
        switch (this.day()) {
          case 0:
            return "[la scorsa] dddd [alle] LT";
          default:
            return "[lo scorso] dddd [alle] LT";
        }
      },
      sameElse: "L",
    },
    relativeTime: {
      future: (s: string): string => {
        return ((/^[0-9].+$/).test(s) ? "tra" : "in") + " " + s;
      },
      past: "%s fa",
      s: "alcuni secondi",
      ss: "%d secondi",
      m: "un minuto",
      mm: "%d minuti",
      h: "un'ora",
      hh: "%d ore",
      d: "un giorno",
      dd: "%d giorni",
      M: "un mese",
      MM: "%d mesi",
      y: "un anno",
      yy: "%d anni",
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº" as any,
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4,  // The week that contains Jan 4th is the first week of the year.
    },
  },
  fr: {
    months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    monthsParseExact: true,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Aujourd’hui à] LT",
      nextDay: "[Demain à] LT",
      nextWeek: "dddd [à] LT",
      lastDay: "[Hier à] LT",
      lastWeek: "dddd [dernier à] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      ss: "%d secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal: (num: number, period: string): string => {
      switch (period) {
        case "D":
          return num + (num === 1 ? "er" : "");
        default:
        case "M":
        case "Q":
        case "DDD":
        case "d":
          return num + (num === 1 ? "er" : "e");
        case "w":
        case "W":
          return num + (num === 1 ? "re" : "e");
      }
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4,  // The week that contains Jan 4th is the first week of the year.
    },
  },
  en: {
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: (num: number): string => {
      const b = num % 10;
      // tslint:disable-next-line
      const output = (~~(num % 100 / 10) === 1) ? "th" :
        (b === 1) ? "st" :
          (b === 2) ? "nd" :
            (b === 3) ? "rd" : "th";
      return num + output;
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4,  // The week that contains Jan 4th is the first week of the year.
    },
  },
};
