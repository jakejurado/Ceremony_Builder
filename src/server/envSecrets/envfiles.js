const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secretName = "ceremony_builder_env";
const client = new SecretsManagerClient({ region: "us-east-2" });

async function getSecrets() {
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT",
            })
        );

        if (response && response.SecretString) {
            return JSON.parse(response.SecretString);
        } else {
            console.log('No secrets found.');
            return {};
        }
    } catch (error) {
        console.error(`Error retrieving secret: ${error}`);
        return {};
    }
}

// Exporting the function itself
module.exports = {getSecrets};
