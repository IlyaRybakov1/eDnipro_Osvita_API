import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const OVERPASS_API_URL = process.env.OVERPASS_API_URL as string;
const NOMINATIM_API_URL = process.env.NOMINATIM_API_URL as string;
const DEFAULT_LAT = parseFloat(process.env.DEFAULT_LAT as string);
const DEFAULT_LNG = parseFloat(process.env.DEFAULT_LNG as string);
const DEFAULT_RADIUS = parseInt(process.env.DEFAULT_RADIUS as string, 10);

interface SchoolBasic {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface SchoolDetails {
  address: string;
  phoneNumbers: string[];
  location: {
    lat: number;
    lng: number;
  };
}

const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await axios.get(NOMINATIM_API_URL, {
      params: {
        lat,
        lon,
        format: "json",
        addressdetails: 1,
      },
    });

    const address = response.data.address || {};
    const addressComponents = [
      address.road,
      address.housenumber,
      address.borough,
    ];

    const filteredComponents = addressComponents.filter(
      (component) => component !== undefined
    );

    return filteredComponents.join(", ") || "Address not available";
  } catch (error: any) {
    console.error(`Error performing reverse geocoding: ${error.message}`);
    return "Address not available";
  }
};

const fetchSchoolsBasic = async (
  lat: number = DEFAULT_LAT,
  lng: number = DEFAULT_LNG,
  radius: number = DEFAULT_RADIUS
): Promise<SchoolBasic[]> => {
  try {
    const overpassQuery = `
      [out:json];
      (
        way(around:${radius},${lat},${lng})[amenity=school];
        relation(around:${radius},${lat},${lng})[amenity=school];
      );
      out center;
    `;
    const overpassUrl = `${OVERPASS_API_URL}?data=${encodeURIComponent(
      overpassQuery
    )}`;
    const response = await axios.get(overpassUrl);

    return response.data.elements.map((school: any) => ({
      id: school.id.toString(),
      name: school.tags.name || "Unnamed School",
      location: {
        lat: school.lat || school.center.lat,
        lng: school.lon || school.center.lon,
      },
    }));
  } catch (error: any) {
    console.error("Error fetching basic school data:", error.message);
    throw new Error("Failed to fetch basic school data");
  }
};

const fetchSchoolDetailsById = async (id: string): Promise<SchoolDetails> => {
  try {
    const overpassQuery = `
        [out:json];
        (
            way(${id});
            relation(${id});
        );
        out center;
    `;
    const encodedQuery = encodeURIComponent(overpassQuery);
    const overpassUrl = `${OVERPASS_API_URL}?data=${encodedQuery}`;

    const response = await axios.get(overpassUrl);

    if (response.data.elements.length === 0) {
      throw new Error("School not found");
    }

    const schoolDetails = response.data.elements[0];
    let address = "Address not available";

    if (schoolDetails.tags) {
      const addressComponents = [];
      if (schoolDetails.tags["addr:housenumber"]) {
        addressComponents.push(schoolDetails.tags["addr:housenumber"]);
      }
      if (schoolDetails.tags["addr:street"]) {
        addressComponents.push(schoolDetails.tags["addr:street"]);
      }
      address =
        addressComponents.length > 0 ? addressComponents.join(", ") : address;
    }

    let location = { lat: 0, lng: 0 };
    if (schoolDetails.type === "node") {
      location = { lat: schoolDetails.lat, lng: schoolDetails.lon };
    } else if (
      schoolDetails.type === "way" ||
      schoolDetails.type === "relation"
    ) {
      if (schoolDetails.center) {
        location = {
          lat: schoolDetails.center.lat,
          lng: schoolDetails.center.lon,
        };
      }
    }

    if (address === "Address not available" && location.lat && location.lng) {
      address = await reverseGeocode(location.lat, location.lng);
    }

    return {
      address,
      phoneNumbers: schoolDetails.tags?.phone ? [schoolDetails.tags.phone] : [],
      location,
    };
  } catch (error: any) {
    console.error(
      `Error fetching school details with id ${id}:`,
      error.message
    );
    throw new Error(`Failed to fetch school details with id ${id}`);
  }
};

const fetchRandomSchools = async (
  numSchools: number = 3
): Promise<SchoolDetails[]> => {
  try {
    const schools = await fetchSchoolsBasic();

    const shuffled = schools.sort(() => 0.5 - Math.random());
    const selectedSchools = shuffled.slice(
      0,
      Math.min(numSchools, schools.length)
    );

    const schoolDetailsPromises = selectedSchools.map(async (school) => {
      const address = await reverseGeocode(
        school.location.lat,
        school.location.lng
      );

      return {
        id: school.id,
        name: school.name,
        address,
        location: school.location,
        phoneNumbers: [],
      };
    });

    return Promise.all(schoolDetailsPromises);
  } catch (error: any) {
    console.error("Error fetching random school data:", error.message);
    throw new Error("Failed to fetch random school data");
  }
};

export default {
  fetchSchoolsBasic,
  fetchSchoolDetailsById,
  fetchRandomSchools,
};
