const mongoose = require('mongoose');
const Donor = require('./models/Donor');
const Donation = require('./models/Donation');
const NGO = require('./models/NGO');
const Delivery = require('./models/Delivery');

const MONGO_URI = 'mongodb://127.0.0.1:27017/servebyte';

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
        Donor.deleteMany({}),
        Donation.deleteMany({}),
        NGO.deleteMany({}),
        Delivery.deleteMany({})
    ]);

    // Create Donors
    const donors = await Donor.insertMany([
        { name: 'Ravi Sharma', email: 'ravi@example.com', phone: '9876543210', organization: 'Sharma Caterers', location: { address: 'MG Road, Bangalore', lat: 12.9716, lng: 77.5946 }, totalDonations: 45 },
        { name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', organization: 'Hotel Grand', location: { address: 'Koramangala, Bangalore', lat: 12.9352, lng: 77.6245 }, totalDonations: 32 },
        { name: 'Amit Verma', email: 'amit@example.com', phone: '9876543212', organization: 'Verma Foods', location: { address: 'Indiranagar, Bangalore', lat: 12.9784, lng: 77.6408 }, totalDonations: 28 },
        { name: 'Sunita Reddy', email: 'sunita@example.com', phone: '9876543213', organization: 'Reddy Kitchen', location: { address: 'Whitefield, Bangalore', lat: 12.9698, lng: 77.7500 }, totalDonations: 15 },
        { name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '9876543214', organization: 'Kumar Restaurant', location: { address: 'JP Nagar, Bangalore', lat: 12.9063, lng: 77.5857 }, totalDonations: 50 }
    ]);

    // Create NGOs
    const ngos = await NGO.insertMany([
        { name: 'FeedIndia Foundation', description: 'Providing meals to homeless shelters', location: { address: 'HSR Layout, Bangalore', lat: 12.9116, lng: 77.6389 }, mealsReceived: 1250, category: 'Shelter', active: true },
        { name: 'Akshaya Patra', description: 'Mid-day meal program for schools', location: { address: 'Rajajinagar, Bangalore', lat: 12.9907, lng: 77.5519 }, mealsReceived: 890, category: 'School Program', active: true },
        { name: 'Robin Hood Army', description: 'Redistributing surplus food', location: { address: 'BTM Layout, Bangalore', lat: 12.9166, lng: 77.6101 }, mealsReceived: 720, category: 'Community Kitchen', active: true },
        { name: 'Bangalore Food Bank', description: 'Central food storage and distribution', location: { address: 'Marathahalli, Bangalore', lat: 12.9591, lng: 77.6974 }, mealsReceived: 650, category: 'Food Bank', active: true },
        { name: 'Hope Foundation', description: 'Meals for hospital patients', location: { address: 'Jayanagar, Bangalore', lat: 12.9250, lng: 77.5938 }, mealsReceived: 480, category: 'Hospital', active: true },
        { name: 'Annapoorna Trust', description: 'Daily free meal service', location: { address: 'Electronic City, Bangalore', lat: 12.8440, lng: 77.6608 }, mealsReceived: 240, category: 'Community Kitchen', active: true }
    ]);

    // Create Donations
    const donations = await Donation.insertMany([
        { donor: donors[0]._id, donorName: 'Ravi Sharma', foodName: 'Biryani', quantity: 50, preparedAt: new Date(Date.now() - 2 * 3600000), condition: 'Freshly Cooked', expiresIn: 10, status: 'Delivered', location: donors[0].location },
        { donor: donors[1]._id, donorName: 'Priya Patel', foodName: 'Dal & Rice', quantity: 80, preparedAt: new Date(Date.now() - 1 * 3600000), condition: 'Freshly Cooked', expiresIn: 8, status: 'In Transit', location: donors[1].location },
        { donor: donors[2]._id, donorName: 'Amit Verma', foodName: 'Chapati & Sabzi', quantity: 35, preparedAt: new Date(), condition: 'Freshly Cooked', expiresIn: 6, status: 'Available', location: donors[2].location },
        { donor: donors[3]._id, donorName: 'Sunita Reddy', foodName: 'Idli & Sambar', quantity: 100, preparedAt: new Date(Date.now() - 3 * 3600000), condition: 'Packaged', expiresIn: 12, status: 'Delivered', location: donors[3].location },
        { donor: donors[4]._id, donorName: 'Rajesh Kumar', foodName: 'Mixed Curry', quantity: 60, preparedAt: new Date(), condition: 'Freshly Cooked', expiresIn: 10, status: 'Available', location: donors[4].location },
        { donor: donors[0]._id, donorName: 'Ravi Sharma', foodName: 'Pulao', quantity: 40, preparedAt: new Date(Date.now() - 4 * 3600000), condition: 'Refrigerated', expiresIn: 24, status: 'Delivered', location: donors[0].location },
        { donor: donors[2]._id, donorName: 'Amit Verma', foodName: 'Roti & Dal', quantity: 70, preparedAt: new Date(Date.now() - 5 * 3600000), condition: 'Freshly Cooked', expiresIn: 8, status: 'Delivered', location: donors[2].location }
    ]);

    // Create Deliveries
    await Delivery.insertMany([
        { donation: donations[0]._id, ngo: ngos[0]._id, donorDistance: 3.4, deliveryDistance: 1.2, eta: 18, status: 'Delivered', driverName: 'Kiran', vehicleType: 'Bike', deliveredAt: new Date(Date.now() - 1 * 3600000), path: [{ lat: 12.9716, lng: 77.5946 }, { lat: 12.9500, lng: 77.6100 }, { lat: 12.9116, lng: 77.6389 }] },
        { donation: donations[1]._id, ngo: ngos[2]._id, donorDistance: 2.1, deliveryDistance: 1.8, eta: 15, status: 'In Transit', driverName: 'Sanjay', vehicleType: 'Bike', path: [{ lat: 12.9352, lng: 77.6245 }, { lat: 12.9250, lng: 77.6150 }, { lat: 12.9166, lng: 77.6101 }] },
        { donation: donations[3]._id, ngo: ngos[1]._id, donorDistance: 5.2, deliveryDistance: 2.5, eta: 25, status: 'Delivered', driverName: 'Mohan', vehicleType: 'Van', deliveredAt: new Date(Date.now() - 2 * 3600000), path: [{ lat: 12.9698, lng: 77.7500 }, { lat: 12.9800, lng: 77.6500 }, { lat: 12.9907, lng: 77.5519 }] },
        { donation: donations[5]._id, ngo: ngos[4]._id, donorDistance: 4.8, deliveryDistance: 1.5, eta: 20, status: 'Delivered', driverName: 'Deepa', vehicleType: 'Bike', deliveredAt: new Date(Date.now() - 3 * 3600000), path: [{ lat: 12.9716, lng: 77.5946 }, { lat: 12.9400, lng: 77.5900 }, { lat: 12.9250, lng: 77.5938 }] },
        { donation: donations[6]._id, ngo: ngos[3]._id, donorDistance: 3.1, deliveryDistance: 2.2, eta: 22, status: 'Delivered', driverName: 'Anita', vehicleType: 'Van', deliveredAt: new Date(Date.now() - 4 * 3600000), path: [{ lat: 12.9784, lng: 77.6408 }, { lat: 12.9680, lng: 77.6700 }, { lat: 12.9591, lng: 77.6974 }] }
    ]);

    console.log('✅ Seed data inserted successfully!');
    console.log(`   ${donors.length} donors`);
    console.log(`   ${ngos.length} NGOs`);
    console.log(`   ${donations.length} donations`);
    console.log('   5 deliveries');

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seed error:', err);
    process.exit(1);
});
