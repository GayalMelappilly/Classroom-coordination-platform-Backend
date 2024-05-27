import axios from 'axios';
import publicIp, { publicIpv4 } from 'public-ip';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';

dotenv.config();

async function addCurrentIPToWhitelist() {
    try {
        const ip = await publicIpv4();
        const publicKey = process.env.MONGODB_PUBLIC_KEY;
        const privateKey = process.env.MONGODB_PRIVATE_KEY;
        const projectId = process.env.MONGODB_PROJECT_ID;

        if (!ip || !publicKey || !privateKey || !projectId) {
            console.error("Missing environment variables.");
            return;
        }

        const whitelistUrl = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${projectId}/accessList`;

        // Create basic auth header
        const auth = Buffer.from(`${publicKey}:${privateKey}`).toString('base64');

        const response = await axios.post(
            whitelistUrl,
            {
                ipAddress: ip,
                comment: 'Added by script'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`
                }
            }
        );

        console.log('IP added to whitelist:', response.data);
    } catch (error:any) {
        console.error('Error adding IP to whitelist:', error.response ? error.response.data : error.message);
    }
}

export default addCurrentIPToWhitelist;
