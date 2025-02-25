
import admin from '../firebase.js';
const db = admin.firestore();
import geolib from 'geolib';

const equipmentList = [
    {
      name: "John Deere Tractor",
      latitude: 22.8340,  // Bavla
      longitude: 72.3687,
      type: "Tractor",
      price_per_day: 1500,
      availability: true,
      owner_id: "owner_001"
    },
    {
      
      name: "Mahindra Rotavator",
      latitude: 22.990240600438167,  // Sanand
      longitude: 72.34505815026313,
      type: "Rotavator",
      price_per_day: 800,
      availability: true,
      owner_id: "owner_002"
    },
    {
      name: "Kubota Harvester",
      latitude: 22.7430,  // Dholka
      longitude: 72.4397,
      type: "Harvester",
      price_per_day: 2500,
      availability: false,
      owner_id: "owner_003"
    },
    {
      name: "Honda Water Pump",
      latitude: 22.7523,  // Kheda
      longitude: 72.6853,
      type: "Water Pump",
      price_per_day: 500,
      availability: true,
      owner_id: "owner_004"
    },
    {
      name: "Sonalika Plough",
      latitude: 23.1250,  // Viramgam
      longitude: 72.0477,
      type: "Plough",
      price_per_day: 1200,
      availability: true,
      owner_id: "owner_005"
    },
    {
      name: "Eicher Tractor",
      latitude: 22.8388,  // Bareja
      longitude: 72.6521,
      type: "Tractor",
      price_per_day: 1300,
      availability: true,
      owner_id: "owner_006"
    },
    {
      name: "Kartar Harvester",
      latitude: 23.2475,  // Kalol
      longitude: 72.4925,
      type: "Harvester",
      price_per_day: 2700,
      availability: true,
      owner_id: "owner_007"
    },
    {
      name: "Fieldking Plough",
      latitude: 22.6826,  // Matar
      longitude: 72.5975,
      type: "Plough",
      price_per_day: 1100,
      availability: true,
      owner_id: "owner_008"
    },
    {
      name: "Tafe Rotavator",
      latitude: 23.2453,  // Mandal
      longitude: 72.1849,
      type: "Rotavator",
      price_per_day: 900,
      availability: true,
      owner_id: "owner_009"
    },
    {
      name: "New Holland Tractor",
      latitude: 23.4204,  // Detroj
      longitude: 72.2485,
      type: "Tractor",
      price_per_day: 1600,
      availability: true,
      owner_id: "owner_010"
    }
  ];
 class EquimentController {
    static seedData = async () => {
        try {
          const collectionRef = db.collection("equipment");
      
          for (const equipment of equipmentList) {
            await collectionRef.add({
              ...equipment,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
            console.log(`✅ Added: ${equipment.name}`);
          }
      
          console.log("🎉 Dummy data successfully added to Firestore!");
        } catch (error) {
          console.error("❌ Error seeding data:", error);
        }
      }
    static AddEquipment = async (data) => {
        try {
            await db.collection('equipment').doc().set({
                ...data,
                createdAt: new Date().toISOString()
            });
            return { success: true };
        } catch (err) {
            console.error("Error Creating Equipment:", err.message);
            return { success: false, error: err.message };
        }
    }
    static getAllEquipments = async () => {
        try {
            const snapshot = await db.collection("equipment").get();
            let equipmentList = [];

            snapshot.forEach((doc) => {
                equipmentList.push({ id: doc.id, ...doc.data() });
            });

            res.status(200).json({ data: equipmentList });
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch equipment", details: error.message });
        }
    }
    static filterByDistance = async (req, res) => {
        try {
            // this.seedData();
            const userLat = parseFloat(req.query.lat);
            const userLon = parseFloat(req.query.lon);
            const maxDistance = parseInt(req.query.maxKM) * 1000 // Convert KM to meters
           

            if (!userLat || !userLon || !maxDistance) {
                return res.status(400).json({ error: "Missing required parameters" });
            }

            const equipmentRef = db.collection("equipment");
            const snapshot = await equipmentRef.get();

            let nearbyEquipment = [];

            snapshot.forEach((doc) => {
                const equipment = doc.data();
                if (equipment.latitude && equipment.longitude) {
                    const distance = geolib.getDistance(
                        { latitude: userLat, longitude: userLon },
                        { latitude: equipment.latitude, longitude: equipment.longitude }
                    );
                    // console.log(distance,equipment.name)

                    if (distance <= maxDistance) {
                        nearbyEquipment.push({ id: doc.id, ...equipment, distance });
                    }
                }
            });

            // Sort by distance (closest first)
            nearbyEquipment.sort((a, b) => a.distance - b.distance);

            res.status(200).json({ data: nearbyEquipment });
        } catch (error) {
            res.status(500).json({ error: "Server Error", details: error.message });
        }
    }
}
export default EquimentController
