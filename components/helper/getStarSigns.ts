enum StarSign {
    Aries = 'Aries',
    Taurus = 'Taurus',
    Gemini = 'Gemini',
    Cancer = 'Cancer',
    Leo = 'Leo',
    Virgo = 'Virgo',
    Libra = 'Libra',
    Scorpio = 'Scorpio',
    Sagittarius = 'Sagittarius',
    Capricorn = 'Capricorn',
    Aquarius = 'Aquarius',
    Pisces = 'Pisces'
  }
  
  export function getStarSign(date: Date): string {
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
  
    switch (month) {
      case 1:
        return day <= 20 ? StarSign.Capricorn : StarSign.Aquarius;
      case 2:
        return day <= 19 ? StarSign.Aquarius : StarSign.Pisces;
      case 3:
        return day <= 20 ? StarSign.Pisces : StarSign.Aries;
      case 4:
        return day <= 20 ? StarSign.Aries : StarSign.Taurus;
      case 5:
        return day <= 21 ? StarSign.Taurus : StarSign.Gemini;
      case 6:
        return day <= 21 ? StarSign.Gemini : StarSign.Cancer;
      case 7:
        return day <= 22 ? StarSign.Cancer : StarSign.Leo;
      case 8:
        return day <= 23 ? StarSign.Leo : StarSign.Virgo;
      case 9:
        return day <= 23 ? StarSign.Virgo : StarSign.Libra;
      case 10:
        return day <= 23 ? StarSign.Libra : StarSign.Scorpio;
      case 11:
        return day <= 22 ? StarSign.Scorpio : StarSign.Sagittarius;
      case 12:
        return day <= 21 ? StarSign.Sagittarius : StarSign.Capricorn;
      default:
        throw new Error('Invalid date');
    }
  }
  