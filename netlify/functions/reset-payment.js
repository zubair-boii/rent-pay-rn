const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // Uses env variable or local credentials
    });
}

const db = admin.firestore();

exports.handler = async function () {
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

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Reset successful"}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        };
    }
};
