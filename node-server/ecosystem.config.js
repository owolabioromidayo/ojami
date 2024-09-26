module.exports = {
    apps: [
        {
            name: 'my-market',
            script: 'src/index.ts',
            interpreter: 'tsx', // Use tsx as the interpreter for TypeScript files
            exec_mode: 'cluster', // Optional: use cluster mode for load balancing
            instances: 1, // Number of instances to launch
        },
    ],
};
