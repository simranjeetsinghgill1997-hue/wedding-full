import groomImg from '../assets/images/groom_portrait_1788904379199.jpg';
import brideImg from '../assets/images/bride_portrait_1788904390083.jpg';
import marriageArtImg from '../assets/images/marriage_ceremony_art_1790026566756.jpg';
import saganArtImg from '../assets/images/sagan_ring_minimal_1790027730602.jpg';
import mehendiArtImg from '../assets/images/mehendi_art_minimal_1790027739866.jpg';
import jaggoArtImg from '../assets/images/jaggo_cocktail_minimal_1790027750993.jpg';
import weddingArtImg from '../assets/images/wedding_art_minimal_1790027761391.jpg';
import { WeddingCeremony, PersonProfile } from '../types';

export {
  marriageArtImg,
  saganArtImg,
  mehendiArtImg,
  jaggoArtImg,
  weddingArtImg,
};

export const WEDDING_DETAILS = {
  groomName: "Simranjeet Singh Gill",
  groomShortName: "Simranjeet",
  brideName: "Ravneet Kaur",
  brideShortName: "Ravneet",
  weddingDate: "On Saturday, 31ˢᵗ October, 2026",
  videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_39pXjLcmPadwlBMctX1yshQ5O5N/hf_20260908_152425_90839a05-e7f6-45a0-83df-cf2d1aec7da8.mp4",
  backgroundMusic: {
    songName: "Tasveer",
    artist: "Ali Brothers",
    youtubeId: "yEADEOaVaXo",
    youtubeUrl: "https://www.youtube.com/watch?v=yEADEOaVaXo&list=RDyEADEOaVaXo&start_radio=1",
    startTime: 44, // Starts at 0:44 as requested
  },
  gurbaniHeader: "ੴ ਸਤਿਗੁਰੂ ਪ੍ਰਸਾਦਿ ॥",
  gurbaniLine1: "ਸਤਿਗੁਰ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ ਆਪਣੀ ਮੇਹਰ ਕਰਾਈ ॥",
  gurbaniLine2: "ਦਾਸਾਂ ਕਾਰਜ ਆਪ ਸਵਾਰੇ ਇਹ ਉਸਦੀ ਵਡਿਆਈ ॥",
};

export const INVITATION_CARDS_DATA = {
  marriageCard: {
    gurbaniHeader: "ੴ ਸਤਿਗੁਰੂ ਪ੍ਰਸਾਦਿ ॥",
    gurbaniLine1: "ਸਤਿਗੁਰ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ ਆਪਣੀ ਮੇਹਰ ਕਰਾਈ ॥",
    gurbaniLine2: "ਦਾਸਾਂ ਕਾਰਜ ਆਪ ਸਵਾਰੇ ਇਹ ਉਸਦੀ ਵਡਿਆਈ ॥",
    hosts: "Sdn. Jasmail Kaur & S. Jagir Singh Gill",
    invitationText: "Request the honour of your presence at the\nauspicious occasion of the",
    ceremonyTitle: "Marriage Ceremony",
    relationship: "of their beloved grandson",
    groomName: "Simranjeet Singh Gill",
    groomParentage: "(S/o Sdn. Narinder kaur & S. Gurpreet Singh Gill)",
    brideName: "Ravneet Kaur",
    brideParentage: "(S/o Sdn. Narinder kaur & S. Lakhwinder Singh Chopra)",
    date: "On Saturday, 31ˢᵗ October, 2026",
    rsvpList: [
      "Sarabpreet Singh",
      "Paramjit Singh",
      "Devinder Singh",
      "Gurmukh Singh",
      "Gurbachan Singh",
      "Baldev Singh",
    ],
    awaiting: ["Nanke", "&", "Dadke"],
  },
  saganCard: {
    hosts: "Sdn. Narinder Kaur and S. Gurpreet Singh Gill",
    invitationText: "Cordially invite you to celebrate the",
    ceremonyTitle: "Sagan & Ring Ceremony",
    relationship: "of their Son",
    groomName: "Simranjeet Singh Gill",
    groomParentage: "(S/o Sdn. Narinder kaur & S. Gurpreet Singh Gill)",
    brideName: "Ravneet Kaur",
    brideParentage: "(S/o Sdn. Narinder kaur & S. Lakhwinder Singh Chopra)",
    date: "on Thursday, 29ᵗʰ October, 2026",
    time: "11:00 am",
    note: "followed by Lunch",
    venueLabel: "venue: Majestic Crown - Luxury Banquet",
    venueAddress: "24, Shivaji Marg, Najafgarh Rd, Delhi - 110015",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Majestic+Crown+Luxury+Banquet+24+Shivaji+Marg+Najafgarh+Rd+Delhi+110015",
  },
  ceremonyCard: {
    ceremonyTitle: "Wedding Ceremony",
    date: "On Saturday, 31ˢᵗ October, 2026",
    events: [
      {
        title: "Sehra bandi: 8:00am",
      },
      {
        title: "Departure of Barat: 9:30am",
        location: "at KK residence, Yamunanagar",
      },
      {
        title: "Anand karaj: 10:30am",
        location: "at Gurudwara Buria Sahib, Jagadhri, yamunanagar",
      },
      {
        title: "Lunch: 1:00pm",
      },
    ],
    venueTitle: "Venue: Ambience Resort",
    venueAddress: "Agarsen Chowk, National Highway 73A,\nnear JK filling station, Indira Colony,\nJagadhri, Haryana 135003",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ambience+Resort+Agarsen+Chowk+National+Highway+73A+near+JK+filling+station+Indira+Colony+Jagadhri+Haryana+135003",
  },
};

export const CEREMONIES: WeddingCeremony[] = [
  {
    id: "sagan-ring",
    title: "Sagan & Ring Ceremony",
    dateLabel: "Thursday, 29th October, 2026",
    timeLabel: "11:00 AM onwards · Followed by Lunch",
    hosts: "Sdn. Narinder Kaur & S. Gurpreet Singh Gill",
    venueName: "Majestic Crown – Luxury Banquet",
    venueAddress: "24 Shivaji Marg, Najafgarh Rd, Delhi 110015",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Majestic+Crown+Luxury+Banquet+24+Shivaji+Marg+Najafgarh+Rd+Delhi+110015",
    calendarTitle: "Simranjeet & Ravneet — Sagan & Ring Ceremony",
    calendarDateStart: "20261029T110000",
    calendarDateEnd: "20261029T160000",
  },
  {
    id: "wedding-day",
    title: "Wedding Day & Anand Karaj",
    dateLabel: "Saturday, 31st October, 2026",
    timeLabel: "8:00 AM onwards · Lunch at 1:00 PM",
    venueName: "Ambience Resort",
    venueAddress: "Agarsen Chowk, National Highway 73A, near JK Filling Station, Indira Colony, Jagadhri, Haryana 135003",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ambience+Resort+Agarsen+Chowk+National+Highway+73A+near+JK+Filling+Station+Jagadhri+Haryana+135003",
    calendarTitle: "Simranjeet & Ravneet — Anand Karaj & Wedding Celebration",
    calendarDateStart: "20261031T080000",
    calendarDateEnd: "20261031T170000",
    timeline: [
      {
        time: "8:00 AM",
        title: "Sehra Bandi",
        description: "Auspicious turban and sehra tying ceremony with family blessings.",
        location: "Groom's Residence, Yamunanagar"
      },
      {
        time: "9:30 AM",
        title: "Departure of Barat",
        description: "Joyous procession departs with dhol and celebration.",
        location: "KK Residence, Yamunanagar"
      },
      {
        time: "10:30 AM",
        title: "Anand Karaj",
        description: "Sacred Laavan ceremony in the presence of Sri Guru Granth Sahib Ji.",
        location: "Gurudwara Buria Sahib, Jagadhri, Yamunanagar"
      },
      {
        time: "1:00 PM",
        title: "Lunch & Celebrations",
        description: "Feast and reception in honour of the newly married couple.",
        location: "Ambience Resort, Jagadhri"
      }
    ]
  }
];

export const BRIDE_AND_GROOM: { groom: PersonProfile; bride: PersonProfile } = {
  groom: {
    name: "Simranjeet Singh Gill",
    role: "Groom",
    parentage: "S/o Sdn. Narinder Kaur & S. Gurpreet Singh Gill",
    bio: "Grandson of Sdn. Jasmail Kaur & S. Jagir Singh Gill. Excited to begin this sacred life chapter with Ravneet, surrounded by the love and blessings of dear family and friends.",
    defaultImage: groomImg,
  },
  bride: {
    name: "Ravneet Kaur",
    role: "Bride",
    parentage: "D/o Sdn. Jaswinder Kaur & S. Lakhwinder Singh Chopra",
    bio: "Stepping into forever with Simranjeet. Grateful for our families' timeless traditions, joyous celebrations, and looking forward to making memories of a lifetime with all of you.",
    defaultImage: brideImg,
  }
};
