export const labs = [
  { id: 1, name: "Lab 1 - Tifo", description: "Praktik jaringan TKJ", capacity: 36, status: "Available", type: "Jaringan" },
  { id: 2, name: "Lab 2 - SMC", description: "Rapat, tamu studi tiru, diskusi", capacity: 40, status: "In Use", type: "Multipurpose" },
  { id: 3, name: "Lab 3 - Tefa", description: "Teaching Factory & kantor industri", capacity: 20, status: "Available", type: "Industri" },
  { id: 4, name: "Lab 4 - Extra", description: "Pemrograman & studio karawitan", capacity: 30, status: "Maintenance", type: "Ekstrakurikuler" },
  { id: 5, name: "Lab 5 - Robotika", description: "Ruang robotika dan IoT", capacity: 25, status: "Available", type: "IoT" },
  { id: 6, name: "Lab 6 - Gim 1", description: "Praktik pemrograman dan pengembangan gim", capacity: 36, status: "Available", type: "Pemrograman" },
  { id: 7, name: "Lab 7 - Gim 2", description: "Praktik pemrograman dan pengembangan gim", capacity: 36, status: "In Use", type: "Pemrograman" },
  { id: 8, name: "Lab 8 - Showcase", description: "Pameran karya siswa RPL TKJ PG", capacity: 50, status: "Available", type: "Pameran" },
  { id: 9, name: "Lab 9 - AI", description: "Praktik pembelajaran AI", capacity: 30, status: "Available", type: "AI" },
  { id: 10, name: "Lab 10 - Cyber Security", description: "Praktik pembelajaran Cyber Security", capacity: 30, status: "Available", type: "Keamanan" },
];

export const inventory = [
  { id: 1, labId: 1, name: "PC Client", total: 36, working: 34, broken: 2 },
  { id: 2, labId: 1, name: "Switch Manageable", total: 4, working: 4, broken: 0 },
  { id: 3, labId: 2, name: "Smart TV 75\"", total: 1, working: 1, broken: 0 },
  { id: 4, labId: 2, name: "Conference Mic", total: 1, working: 1, broken: 0 },
  { id: 5, labId: 5, name: "Arduino Kit", total: 20, working: 18, broken: 2 },
  { id: 6, labId: 9, name: "Workstation GPU", total: 30, working: 30, broken: 0 },
  { id: 7, labId: 10, name: "Server Rack", total: 2, working: 2, broken: 0 },
];

export const feedback = [
  { id: 1, labId: 1, user: "Siswa Kelas 11 TKJ", rating: 4, comment: "Koneksi internet stabil, tapi AC kurang dingin." },
  { id: 2, labId: 2, user: "Tamu Studi Banding", rating: 5, comment: "Fasilitas sangat modern dan nyaman." },
  { id: 3, labId: 9, user: "Siswa Kelas 12 RPL", rating: 5, comment: "GPU sangat membantu untuk training model AI." },
  { id: 4, labId: 4, user: "Guru Ekstrakurikuler", rating: 3, comment: "Beberapa alat musik karawitan perlu perbaikan." },
];
