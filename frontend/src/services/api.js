const API_BASE_URL =
  "http://localhost:8080/api";

const referrals = [
  {
    id: "REF-1001",
    patientName: "Ananya Rao",
    age: 67,
    gender: "Female",
    priority: "Emergency",
    score: 94,
    reason: "Severe chest pain and shortness of breath",
    department: "Cardiology",
    referringDoctor: "Dr. Rahul Sharma",
    facility: "Bangalore Heart Institute",
    createdAt: "21 Aug 2026, 10:32 AM",
    status: "Awaiting Acceptance",
    vitals: {
      heartRate: 118,
      bloodPressure: "90/60",
      oxygen: 91,
      temperature: 37.8,
    },
  },
  {
    id: "REF-1002",
    patientName: "Vikram Kumar",
    age: 52,
    gender: "Male",
    priority: "Urgent",
    score: 82,
    reason: "Persistent abdominal pain and vomiting",
    department: "Gastroenterology",
    referringDoctor: "Dr. Priya Menon",
    facility: "City Care Hospital",
    createdAt: "21 Aug 2026, 09:48 AM",
    status: "Facility Matched",
    vitals: {
      heartRate: 102,
      bloodPressure: "110/70",
      oxygen: 96,
      temperature: 38.1,
    },
  },
  {
    id: "REF-1003",
    patientName: "Meera Nair",
    age: 34,
    gender: "Female",
    priority: "High",
    score: 71,
    reason: "Suspected acute kidney infection",
    department: "Nephrology",
    referringDoctor: "Dr. Arjun Rao",
    facility: "Bangalore General Hospital",
    createdAt: "21 Aug 2026, 09:15 AM",
    status: "Under Review",
    vitals: {
      heartRate: 96,
      bloodPressure: "118/76",
      oxygen: 98,
      temperature: 38.5,
    },
  },
  {
    id: "REF-1004",
    patientName: "Ramesh Gowda",
    age: 71,
    gender: "Male",
    priority: "Medium",
    score: 54,
    reason: "Breathing difficulty during physical activity",
    department: "Pulmonology",
    referringDoctor: "Dr. Kavya Shah",
    facility: "City Care Hospital",
    createdAt: "21 Aug 2026, 08:40 AM",
    status: "Accepted",
    vitals: {
      heartRate: 88,
      bloodPressure: "125/80",
      oxygen: 94,
      temperature: 36.8,
    },
  },
];

const facilities = [
  {
    id: 1,
    name: "Bangalore Heart Institute",
    location: "Jayanagar",
    beds: 12,
    eta: "18 min",
    available: true,
  },
  {
    id: 2,
    name: "City Care Hospital",
    location: "Indiranagar",
    beds: 7,
    eta: "25 min",
    available: true,
  },
  {
    id: 3,
    name: "Bangalore General Hospital",
    location: "Yeshwanthpur",
    beds: 4,
    eta: "32 min",
    available: false,
  },
  {
    id: 4,
    name: "St. Mary's Medical Center",
    location: "Hebbal",
    beds: 15,
    eta: "21 min",
    available: true,
  },
  {
    id: 5,
    name: "North Bangalore Hospital",
    location: "Yelahanka",
    beds: 9,
    eta: "14 min",
    available: true,
  },
  {
    id: 6,
    name: "Metro Multispeciality Hospital",
    location: "Whitefield",
    beds: 3,
    eta: "39 min",
    available: false,
  },
];

export async function getReferrals() {
  await fakeDelay();
  return referrals;
}

export async function getReferralById(id) {
  await fakeDelay();

  return referrals.find(
    (referral) => referral.id === id
  );
}

export async function getFacilities() {
  await fakeDelay();
  return facilities;
}

export async function createReferral(data) {
  await fakeDelay();

  const score = calculatePriorityScore(data);

  const priority =
    score >= 90
      ? "Emergency"
      : score >= 80
        ? "Urgent"
        : score >= 65
          ? "High"
          : score >= 40
            ? "Medium"
            : "Low";

  const newReferral = {
    id: `REF-${1000 + referrals.length + 1}`,
    patientName: data.patientName,
    age: Number(data.age),
    gender: data.gender,
    priority,
    score,
    reason: data.reason,
    department: data.department,
    referringDoctor: "Dr. Rahul Sharma",
    facility: "AI Facility Matching Pending",
    createdAt: new Date().toLocaleString("en-IN"),
    status: "AI Prioritized",
    vitals: {
      heartRate: Number(data.heartRate) || 80,
      bloodPressure: data.bloodPressure || "120/80",
      oxygen: Number(data.oxygen) || 98,
      temperature: Number(data.temperature) || 37,
    },
  };

  referrals.unshift(newReferral);

  return newReferral;
}

function calculatePriorityScore(data) {
  let score = 35;

  const oxygen = Number(data.oxygen);
  const heartRate = Number(data.heartRate);
  const temperature = Number(data.temperature);

  if (oxygen && oxygen < 90) {
    score += 35;
  } else if (oxygen && oxygen < 94) {
    score += 20;
  }

  if (heartRate && heartRate > 120) {
    score += 20;
  } else if (heartRate && heartRate > 100) {
    score += 10;
  }

  if (temperature && temperature > 39) {
    score += 10;
  }

  if (
    data.symptoms?.toLowerCase().includes("chest") ||
    data.reason?.toLowerCase().includes("chest")
  ) {
    score += 20;
  }

  return Math.min(score, 99);
}

async function fakeDelay() {
  await new Promise((resolve) =>
    setTimeout(resolve, 250)
  );
}

/*
  BACKEND CONNECTION

  When the backend is ready, functions can be changed
  to fetch from:

  ${API_BASE_URL}/referrals
  ${API_BASE_URL}/referrals/:id
  ${API_BASE_URL}/facilities
*/