import * as ContentstackManagement from '@contentstack/management';

export function initializeManagementStack() {
    try {
        const ManagementClient = ContentstackManagement.client();
          const stack = ManagementClient.stack({
            api_key: process.env.CONTENTSTACK_API_KEY,
            management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
            host: "api.contentstack.io",
          })

        return stack;

    } catch (error) {
        console.error('Error creating entry:', error);
    }
}
