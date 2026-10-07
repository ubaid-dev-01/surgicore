export const surgeryKPIs = {
  todaySurgeries: 24,
  orUtilization: 87,
  avgCaseDuration: 142,
  complicationRate: 1.8,
  pendingPreOp: 12,
  recoveryBeds: 18,
  activeORs: 8,
  totalORs: 10,
};

export const orUtilizationTrend = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  utilization: 70 + Math.random() * 25,
  target: 85,
}));

export const todaysSurgeries = [
  { id: "SRG-2024-001", patient: "Robert Mitchell", procedure: "Total Knee Arthroplasty", surgeon: "Dr. Sarah Chen", or: "OR-1", time: "07:30 AM", status: "In Progress", duration: "2h 15m" },
  { id: "SRG-2024-002", patient: "Maria Santos", procedure: "Laparoscopic Cholecystectomy", surgeon: "Dr. James Wilson", or: "OR-2", time: "08:00 AM", status: "Completed", duration: "1h 45m" },
  { id: "SRG-2024-003", patient: "David Johnson", procedure: "Coronary Artery Bypass", surgeon: "Dr. Aisha Patel", or: "OR-3", time: "08:30 AM", status: "In Progress", duration: "4h 30m" },
  { id: "SRG-2024-004", patient: "Jennifer Lee", procedure: "Spinal Fusion L4-L5", surgeon: "Dr. Michael Brooks", or: "OR-4", time: "09:00 AM", status: "Pre-Op", duration: "3h 00m" },
  { id: "SRG-2024-005", patient: "Thomas Wright", procedure: "Rotator Cuff Repair", surgeon: "Dr. Sarah Chen", or: "OR-5", time: "10:30 AM", status: "Scheduled", duration: "2h 00m" },
  { id: "SRG-2024-006", patient: "Lisa Anderson", procedure: "Hip Replacement", surgeon: "Dr. James Wilson", or: "OR-1", time: "11:00 AM", status: "Scheduled", duration: "2h 30m" },
  { id: "SRG-2024-007", patient: "Carlos Rivera", procedure: "Appendectomy", surgeon: "Dr. Emily Nakamura", or: "OR-6", time: "07:45 AM", status: "Completed", duration: "0h 55m" },
  { id: "SRG-2024-008", patient: "Patricia Moore", procedure: "Cataract Surgery", surgeon: "Dr. Richard Kim", or: "OR-7", time: "09:30 AM", status: "In Progress", duration: "0h 40m" },
];

export const surgeonLeaderboard = [
  { name: "Dr. Sarah Chen", specialty: "Orthopedic Surgery", surgeries: 342, successRate: 99.1, avgDuration: "2h 10m", rating: 4.9 },
  { name: "Dr. James Wilson", specialty: "General Surgery", surgeries: 289, successRate: 98.7, avgDuration: "1h 45m", rating: 4.8 },
  { name: "Dr. Aisha Patel", specialty: "Cardiac Surgery", surgeries: 256, successRate: 98.9, avgDuration: "4h 20m", rating: 4.9 },
  { name: "Dr. Michael Brooks", specialty: "Neurosurgery", surgeries: 198, successRate: 99.3, avgDuration: "3h 30m", rating: 4.7 },
  { name: "Dr. Emily Nakamura", specialty: "General Surgery", surgeries: 312, successRate: 98.5, avgDuration: "1h 30m", rating: 4.8 },
];

export const equipmentAlerts = [
  { equipment: "Arthroscopy Tower #3", status: "Maintenance Due", severity: "warning", details: "Scheduled maintenance in 2 days" },
  { equipment: "Sterilization Unit B", status: "Cycle Complete", severity: "success", details: "Ready for use — Batch #ST-4421" },
  { equipment: "C-Arm Fluoroscopy", status: "In Use — OR-3", severity: "info", details: "Dr. Patel — CABG procedure" },
  { equipment: "Electrosurgical Unit #7", status: "Calibration Required", severity: "warning", details: "Last calibrated 89 days ago" },
];

export const postOpRecovery = [
  { patient: "Maria Santos", procedure: "Lap. Cholecystectomy", surgeon: "Dr. Wilson", recoveryBed: "RB-04", vitalStatus: "Stable", painLevel: 3, timeInRecovery: "1h 20m" },
  { patient: "Anna Chen", procedure: "Knee Arthroscopy", surgeon: "Dr. Chen", recoveryBed: "RB-07", vitalStatus: "Stable", painLevel: 4, timeInRecovery: "2h 05m" },
  { patient: "Carlos Rivera", procedure: "Appendectomy", surgeon: "Dr. Nakamura", recoveryBed: "RB-02", vitalStatus: "Monitoring", painLevel: 5, timeInRecovery: "0h 45m" },
];

export const allSurgeries = [
  ...todaysSurgeries,
  { id: "SRG-2024-009", patient: "William Harris", procedure: "ACL Reconstruction", surgeon: "Dr. Sarah Chen", or: "OR-2", time: "01:00 PM", status: "Scheduled", duration: "2h 30m" },
  { id: "SRG-2024-010", patient: "Sarah Kim", procedure: "Thyroidectomy", surgeon: "Dr. Emily Nakamura", or: "OR-5", time: "02:00 PM", status: "Scheduled", duration: "1h 45m" },
];

export const patients = [
  { id: "PT-10001", name: "Robert Mitchell", age: 67, gender: "Male", bloodType: "O+", allergies: "Penicillin", preOpStatus: "Cleared", surgeries: 2, lastVisit: "2024-01-15", insurance: "BlueCross PPO" },
  { id: "PT-10002", name: "Maria Santos", age: 45, gender: "Female", bloodType: "A+", allergies: "None", preOpStatus: "Cleared", surgeries: 1, lastVisit: "2024-01-14", insurance: "Aetna HMO" },
  { id: "PT-10003", name: "David Johnson", age: 72, gender: "Male", bloodType: "B+", allergies: "Latex, Sulfa", preOpStatus: "Pending Labs", surgeries: 3, lastVisit: "2024-01-15", insurance: "Medicare" },
  { id: "PT-10004", name: "Jennifer Lee", age: 55, gender: "Female", bloodType: "AB-", allergies: "None", preOpStatus: "Cleared", surgeries: 1, lastVisit: "2024-01-13", insurance: "UnitedHealth" },
  { id: "PT-10005", name: "Thomas Wright", age: 38, gender: "Male", bloodType: "O-", allergies: "Iodine", preOpStatus: "Cleared", surgeries: 1, lastVisit: "2024-01-15", insurance: "Cigna" },
  { id: "PT-10006", name: "Lisa Anderson", age: 61, gender: "Female", bloodType: "A-", allergies: "None", preOpStatus: "Pending Cardiology", surgeries: 2, lastVisit: "2024-01-12", insurance: "BlueCross PPO" },
];

export const billingData = [
  { id: "INV-5001", patient: "Robert Mitchell", procedure: "Total Knee Arthroplasty", amount: 45200, insurance: "BlueCross PPO", status: "Paid", date: "2024-01-10" },
  { id: "INV-5002", patient: "Maria Santos", procedure: "Lap. Cholecystectomy", amount: 18500, insurance: "Aetna HMO", status: "Pending", date: "2024-01-14" },
  { id: "INV-5003", patient: "David Johnson", procedure: "CABG", amount: 125000, insurance: "Medicare", status: "In Review", date: "2024-01-15" },
  { id: "INV-5004", patient: "Anna Chen", procedure: "Knee Arthroscopy", amount: 12800, insurance: "UnitedHealth", status: "Paid", date: "2024-01-08" },
  { id: "INV-5005", patient: "Carlos Rivera", procedure: "Appendectomy", amount: 22100, insurance: "Cigna", status: "Paid", date: "2024-01-14" },
];

export const revenueByProcedure = [
  { procedure: "Orthopedic", revenue: 2450000, cases: 156 },
  { procedure: "Cardiac", revenue: 3200000, cases: 89 },
  { procedure: "General", revenue: 1800000, cases: 234 },
  { procedure: "Neuro", revenue: 2100000, cases: 67 },
  { procedure: "Ophthalmic", revenue: 890000, cases: 312 },
];

export const staffMembers = [
  { id: "STF-001", name: "Dr. Sarah Chen", role: "Lead Orthopedic Surgeon", department: "Orthopedics", status: "On Duty", shift: "Day", experience: "15 years", surgeriesToday: 3 },
  { id: "STF-002", name: "Dr. James Wilson", role: "General Surgeon", department: "General Surgery", status: "On Duty", shift: "Day", experience: "12 years", surgeriesToday: 2 },
  { id: "STF-003", name: "Dr. Aisha Patel", role: "Cardiac Surgeon", department: "Cardiology", status: "In Surgery", shift: "Day", experience: "18 years", surgeriesToday: 1 },
  { id: "STF-004", name: "Nurse Rachel Green", role: "OR Nurse Manager", department: "Nursing", status: "On Duty", shift: "Day", experience: "10 years", surgeriesToday: 0 },
  { id: "STF-005", name: "Dr. Mark Stevens", role: "Anesthesiologist", department: "Anesthesiology", status: "On Duty", shift: "Day", experience: "14 years", surgeriesToday: 4 },
  { id: "STF-006", name: "Tech. Lisa Park", role: "Surgical Technologist", department: "OR Support", status: "On Duty", shift: "Day", experience: "8 years", surgeriesToday: 3 },
];

export const inventoryItems = [
  { id: "INV-001", name: "Titanium Knee Implant (Size M)", category: "Implants", stock: 12, minStock: 5, status: "In Stock", sterilized: true, expiry: "2025-06-15", lastUsed: "2024-01-14" },
  { id: "INV-002", name: "Surgical Suture Kit (Vicryl 3-0)", category: "Consumables", stock: 245, minStock: 100, status: "In Stock", sterilized: true, expiry: "2025-03-20", lastUsed: "2024-01-15" },
  { id: "INV-003", name: "Laparoscopic Trocar Set", category: "Instruments", stock: 8, minStock: 4, status: "In Stock", sterilized: true, expiry: "N/A", lastUsed: "2024-01-14" },
  { id: "INV-004", name: "Bone Cement (Simplex P)", category: "Consumables", stock: 3, minStock: 10, status: "Low Stock", sterilized: true, expiry: "2024-09-30", lastUsed: "2024-01-13" },
  { id: "INV-005", name: "Cardiac Stent (DES 3.0x18mm)", category: "Implants", stock: 15, minStock: 8, status: "In Stock", sterilized: true, expiry: "2025-12-01", lastUsed: "2024-01-15" },
  { id: "INV-006", name: "Sterile Drape Pack (Universal)", category: "Consumables", stock: 2, minStock: 20, status: "Critical", sterilized: true, expiry: "2024-08-15", lastUsed: "2024-01-15" },
];

export const analyticsData = {
  caseDurationTrend: Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    orthopedic: 120 + Math.random() * 40,
    cardiac: 200 + Math.random() * 60,
    general: 80 + Math.random() * 30,
    neuro: 180 + Math.random() * 50,
  })),
  outcomeDistribution: [
    { outcome: "Successful", count: 1842 },
    { outcome: "Minor Complication", count: 34 },
    { outcome: "Major Complication", count: 8 },
    { outcome: "Readmission", count: 12 },
  ],
  surgeonBenchmark: surgeonLeaderboard.map(s => ({
    ...s,
    casesThisMonth: Math.floor(Math.random() * 30) + 15,
    complications: Math.floor(Math.random() * 3),
    patientSatisfaction: (4.5 + Math.random() * 0.5).toFixed(1),
  })),
};

export const testimonials = [
  { name: "Dr. Richard Hartley", role: "Chief of Surgery, Mayo Regional", quote: "SurgiCore Pro has transformed how we manage our 14 operating rooms. OR utilization improved by 23% in the first quarter.", avatar: "RH" },
  { name: "Dr. Priya Sharma", role: "Director of Surgical Services, Cleveland Health", quote: "The real-time scheduling and conflict detection alone saved us hundreds of hours per month. Truly enterprise-grade.", avatar: "PS" },
  { name: "Michael Torres", role: "COO, Pacific Surgical Center", quote: "We evaluated 8 platforms before choosing SurgiCore Pro. Nothing comes close in terms of depth and reliability.", avatar: "MT" },
  { name: "Dr. Amanda Foster", role: "Orthopedic Surgeon, Johns Hopkins Affiliate", quote: "The surgeon dashboard gives me everything I need — case history, analytics, scheduling — all in one place.", avatar: "AF" },
];

export const blogPosts = [
  { id: 1, title: "Optimizing OR Utilization: A Data-Driven Approach", excerpt: "Learn how leading surgical centers are using real-time analytics to maximize operating room efficiency and reduce turnover times.", category: "Operations", date: "Jan 12, 2024", readTime: "8 min", author: "Dr. Sarah Chen" },
  { id: 2, title: "The Future of Surgical Scheduling: AI & Predictive Analytics", excerpt: "Explore how artificial intelligence is revolutionizing surgical scheduling, from case duration prediction to resource allocation.", category: "Technology", date: "Jan 8, 2024", readTime: "12 min", author: "James Morton" },
  { id: 3, title: "HIPAA Compliance in Modern Surgical Management Systems", excerpt: "A comprehensive guide to ensuring your surgical management platform meets the latest HIPAA security and privacy requirements.", category: "Compliance", date: "Jan 5, 2024", readTime: "10 min", author: "Dr. Lisa Park" },
  { id: 4, title: "Reducing Surgical Site Infections Through Better Inventory Tracking", excerpt: "How automated sterilization tracking and inventory management can significantly reduce SSI rates in your facility.", category: "Patient Safety", date: "Dec 28, 2023", readTime: "7 min", author: "Dr. Michael Brooks" },
  { id: 5, title: "Building a High-Performance Surgical Team: Metrics That Matter", excerpt: "Discover the key performance indicators that distinguish top surgical teams and how to implement effective benchmarking.", category: "Management", date: "Dec 20, 2023", readTime: "9 min", author: "Amanda Foster" },
  { id: 6, title: "Revenue Cycle Management for Ambulatory Surgical Centers", excerpt: "Strategies for optimizing billing workflows, reducing claim denials, and improving collections in surgical practices.", category: "Finance", date: "Dec 15, 2023", readTime: "11 min", author: "Robert Kim" },
];

export const doctors = [
  { name: "Dr. Sarah Chen", specialty: "Orthopedic Surgery", experience: "15 years", education: "Harvard Medical School", certifications: ["ABOS Board Certified", "Fellowship — Sports Medicine"], bio: "Dr. Chen specializes in minimally invasive joint replacement and sports medicine surgery with over 3,400 successful procedures." },
  { name: "Dr. James Wilson", specialty: "General Surgery", experience: "12 years", education: "Johns Hopkins School of Medicine", certifications: ["ABS Board Certified", "FACS"], bio: "Dr. Wilson is an expert in laparoscopic and robotic-assisted general surgery procedures." },
  { name: "Dr. Aisha Patel", specialty: "Cardiac Surgery", experience: "18 years", education: "Stanford School of Medicine", certifications: ["ABTS Board Certified", "Fellowship — Cardiac Surgery"], bio: "Dr. Patel is a nationally recognized cardiac surgeon specializing in complex bypass and valve repair procedures." },
  { name: "Dr. Michael Brooks", specialty: "Neurosurgery", experience: "20 years", education: "Columbia University", certifications: ["ABNS Board Certified", "Fellowship — Spine Surgery"], bio: "Dr. Brooks leads our spine surgery program with expertise in minimally invasive spinal fusion techniques." },
  { name: "Dr. Emily Nakamura", specialty: "General Surgery", experience: "10 years", education: "UCLA School of Medicine", certifications: ["ABS Board Certified"], bio: "Dr. Nakamura specializes in emergency and elective general surgery with a focus on patient-centered care." },
  { name: "Dr. Richard Kim", specialty: "Ophthalmology", experience: "14 years", education: "Yale School of Medicine", certifications: ["ABO Board Certified", "Fellowship — Retina"], bio: "Dr. Kim is a leading ophthalmic surgeon performing over 500 cataract and retinal procedures annually." },
];

export const services = [
  { title: "Operating Room Management", description: "Complete digital management of all operating rooms with real-time status tracking, utilization analytics, and automated scheduling.", icon: "Monitor" },
  { title: "Surgical Case Scheduling", description: "Advanced multi-OR scheduling with conflict detection, surgeon availability heatmaps, and drag-and-drop calendar management.", icon: "Calendar" },
  { title: "Patient Management", description: "Comprehensive patient records with pre-op assessments, consent management, surgical history, and post-op recovery tracking.", icon: "Users" },
  { title: "Surgical Analytics", description: "Deep analytics including case duration trends, OR utilization metrics, surgeon benchmarking, and outcome analysis.", icon: "BarChart3" },
  { title: "Inventory & Sterilization", description: "Track surgical instruments, implants, and consumables with automated sterilization cycle management and expiry alerts.", icon: "Package" },
  { title: "Billing & Revenue", description: "Surgical procedure billing, insurance claims tracking, revenue analytics by surgeon and procedure type, and P&L reporting.", icon: "DollarSign" },
  { title: "Staff & Surgeon Management", description: "Manage surgical teams with performance metrics, cross-theater scheduling, credential tracking, and workload balancing.", icon: "UserCheck" },
  { title: "Compliance & Reporting", description: "HIPAA-compliant data handling, automated regulatory reporting, audit trails, and quality metric dashboards.", icon: "Shield" },
];
