const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
    try {
        const users = await db.collection("users").get();

        for (const user of users.docs) {
            const tenants = await db.collection("users").doc(user.id).collection("tenants").get();

            const batch = db.batch();
            tenants.forEach((tenantDoc) => {
                batch.update(tenantDoc.ref, {hasPaid: false});
            });

            await batch.commit();
        }

        res.status(200).json({message: "Reset done!"});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({error: err.message});
    }
};
