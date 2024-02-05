export const parseProcessArgs = () => {
    return process.argv.slice(2).reduce((acc, curr) => {
        if (curr.startsWith('--')) {
            const [key, value] = curr.slice(2).split('=');
            return {
                ...acc,
                [key]: value,
            };
        }

        return acc;
    }, {});
};
