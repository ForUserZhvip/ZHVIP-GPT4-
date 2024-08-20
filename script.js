document.getElementById('submit').addEventListener('click', async function() {
    const question = document.getElementById('question').value;
    const responseContainer = document.getElementById('response');
    responseContainer.innerHTML = '<p>Loading...</p>';

    // Prepare the data to be sent in the POST request
    const data = {
        messages: [
            {
                role: 'user',
                content: question,
            },
        ],
        max_tokens: 820,
    };

    try {
        // Send the POST request to the new Groq API endpoint
        const response = await fetch('https://console.groq.com/keys', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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', // Replace with actual API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.choices && result.choices[0] && result.choices[0].message) {
            const content = result.choices[0].message.content;
            responseContainer.innerHTML = `<p>${content}</p>`;
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        responseContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
