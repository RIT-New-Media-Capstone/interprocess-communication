import fetch from 'node-fetch';

const PORT = process.env.PORT || 8000;

const makeName = async (first_name, last_name) => {
    const data = {
        first_name: 'John',
        last_name: 'Doe'
    };

    const result = await fetch(`http://localhost:${PORT}/make_name`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    return result.text();
};

const getLastLine = async () => {
    const result = await fetch(`http://localhost:${PORT}/last_line`);
    return result.text();
};

console.log('Name:', await makeName('John', 'Doe'));
console.log('Last line:', await getLastLine());